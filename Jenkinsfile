pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20'
    }

    environment {
        GITHUB_REPO = 'https://github.com/Reledzs/ProgramRendszerekFejleszt-se.git'
        BRANCH = 'main'
        DEPLOY_CONTAINER = 'deploy-server-env'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: env.BRANCH, url: env.GITHUB_REPO
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                sshagent(credentials: ['DEPLOY_SERVER_SSH']) { 
                    sh """
                    ssh -o StrictHostKeyChecking=no deploy@${env.DEPLOY_CONTAINER} -p 22 '
                    cd /app
                    # (Vigyázz az rm -rf *-al, nehogy konfigurációs fájlokat törölj, ha vannak!)
                    rm -rf ProgramRendszerekFejleszt-se 
                    git clone https://github.com/Reledzs/ProgramRendszerekFejleszt-se.git
                    cd /app/ProgramRendszerekFejleszt-se
                    git checkout origin/main
                    echo "Building Frontend..."
                    cd kliens  # Vagy ami a frontend mappád neve (pl. frontend)
                    npm ci     # Frontend függőségek telepítése
                    npm run build # Angular build (létrehozza a dist mappát)
                    cd .. 
                    echo "Building and Starting Backend..."
                    cd server
                    npm ci
                    pm run build
                    pm2 restart node-server --update-env || pm2 start dist/index.js --name "node-server"
                """
                }
            }
        }

        stage('Cleanup') {
            steps {
                deleteDir()
            }
        }
    }

    post {
        success {
            echo 'Pipeline sikeresen lefutott!'
        }
        failure {
            echo 'A pipeline végrehajtása sikertelen volt.'
        }
    }
}