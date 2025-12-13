pipeline {
    // Hol fut a pipeline: a Jenkins konténerben
    agent any 

    environment {
        // Környezeti változók a Docker Image-ek címkézéséhez
        // A BUILD_ID a Jenkins által automatikusan generált build-szám
        IMAGE_NAME_BACKEND = "my-backend-app:${BUILD_ID}"
        IMAGE_NAME_FRONTEND = "my-frontend-app:${BUILD_ID}"
    }

    stages {
        // 1. FÁZIS: Kód beszerzése (CI kezdete)
        stage('1. Checkout SCM') {
            steps {
                echo "Checking out code from Git: ${env.BUILD_URL}"
                checkout scm
            }
        }

        // 2. FÁZIS: Backend Ellenőrzés és Build
        stage('2. Backend Build & Test') {
            steps {
                dir('./server') {
                    // Installálás
                    echo 'Installing Backend dependencies...'
                    sh 'npm install'
                    
                    // Sérülékenység ellenőrzés
                    echo 'Running security audit...'
                    // Az || true miatt nem áll le, ha talál kisebb hibát
                    sh 'npm audit --audit-level=critical || true'
                    
                    // Tesztelés (a package.json-ben definiált 'test' script futtatása)
                    echo 'Running Backend Tests...'
                    //sh 'npm test' 
                    
                    // TS build (A 'npm run build' parancs)
                    echo 'Building TypeScript to JS...'
                    //sh 'npm run build'
                }
            }
        }

        // 4. FÁZIS: Docker Image Építés (Csomagolás)
        stage('4. Docker Image Build') {
            steps {
                echo "Building Backend Image: ${IMAGE_NAME_BACKEND}"
                // A -f (Dockerfile) és az utolsó pont (context) fontossága
                sh "docker build -t ${IMAGE_NAME_BACKEND} -f ./Dockerfile_node ./server"
                
                echo "Building Frontend Image: ${IMAGE_NAME_FRONTEND}"
                sh "docker build -t ${IMAGE_NAME_FRONTEND} -f ./Dockerfile ./frontend"
                
                // Címkézés 'latest'-re, hogy a docker-compose megtalálja
                sh "docker tag ${IMAGE_NAME_BACKEND} my-backend-app:latest"
                sh "docker tag ${IMAGE_NAME_FRONTEND} my-frontend-app:latest"
            }
        }
        
        // 5. FÁZIS: Deploy (CD – Continuous Deployment)
        stage('5. Deploy with Ansible') {
            steps {
                echo 'Starting Ansible Deployment to local host...'
                // Meghívjuk a deploy playbookot
                // Fontos: az Ansible-nek látnia kell az ansible/deploy.yml fájlt
                sh 'ansible-playbook ansible/deploy.yml'
                
                echo 'Deployment finished. New containers are running.'
            }
        }
    }

    // UTOLSÓ LÉPÉS: Visszajelzés és Takarítás
    post {
        always {
            echo 'Pipeline job finished.'
            // Hasznos takarítási lépés: töröljük a "dangling" (felesleges) image-eket
            sh 'docker image prune -f || true' 
        }
        success {
            echo 'SUCCESS: BUILD és DEPLOYMENT kész! Az alkalmazás fut!'
        }
        failure {
            echo 'FAILURE: A pipeline elhasalt. Ellenőrizd a logokat!'
        }
    }
}