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
        stage('Checkout Code') {
            steps {
                // Ez letölti a kódot a Jenkins munkaterületére
                git branch: 'main', url: "${env.GITHUB_REPO}"
            }
        }
        stage('CI: Build Frontend') {
            steps {
                echo '--- CI: Building Frontend ---'
                dir('kliens') {
                    sh 'npm ci'
                    echo 'Running Linter...'
                    sh 'npm run lint' 

                    echo 'Running Unit Tests...'
                    sh 'npm run test'
                    
                    echo 'Building...'
                    sh 'npm run build'
                }
            }
        }
        stage('CI: Build Backend') {
            steps {
                echo '--- CI: Building Backend ---'
                dir('server') {
                    sh 'npm ci'

                    echo 'Running Linter...'
                    sh 'npm run lint'

                    echo 'Running Unit Tests...'
                    sh 'npm test'

                    echo 'Building...'
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
    echo 'Deploying the application...'
    sshagent(credentials: ['DEPLOY_SERVER_SSH']) { 
        sh """
        ssh -o StrictHostKeyChecking=no deploy@${env.DEPLOY_CONTAINER} -p 22 '
            cd /app
            # Biztos ami biztos, takarítunk (ha volt hiba a permissions-el, a docker exec chown megoldotta)
            rm -rf ProgramRendszerekFejleszt-se 
            
            git clone https://github.com/Reledzs/ProgramRendszerekFejleszt-se.git
            cd /app/ProgramRendszerekFejleszt-se
            git checkout origin/main
            
            echo "Building Frontend..."
            cd kliens
            npm ci
            npm run build
            
            cd .. 

            echo "Building and Starting Backend..."
            cd server
            npm ci
            npm run build  # <--- JAVÍTVA (pm -> npm)

            pm2 delete node-server || true
            pm2 start dist/index.js --name "node-server" \
                --output /var/log/pm2/out.log \
                --error /var/log/pm2/error.log \
                --log-date-format "YYYY-MM-DD HH:mm:ss.SSS"
        '            
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