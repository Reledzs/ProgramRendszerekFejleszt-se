pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20'  // Feltételezve, hogy van egy "NodeJS 20" nevű NodeJS telepítés konfigurálva Jenkinsben
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
                sh 'npm ci'  // Használjuk az 'npm ci'-t az 'npm install' helyett a konzisztens telepítés érdekében
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                sshagent(credentials: ['DEPLOY_SERVER_SSH']) { // sshagent plugin szükséges
                    sh """
                    ssh -o StrictHostKeyChecking=no deploy@${env.DEPLOY_CONTAINER} -p 22 '
                     # 1. Alapállapot
                    cd /app
                    # (Vigyázz az rm -rf *-al, nehogy konfigurációs fájlokat törölj, ha vannak!)
                    rm -rf ProgramRendszerekFejleszt-se 
            
                    # 2. Friss kód letöltése
                    git clone https://github.com/Reledzs/ProgramRendszerekFejleszt-se.git
                    cd /app/ProgramRendszerekFejleszt-se
                    git checkout origin/main

                    # -----------------------------------------------------
                    # 3. ANGULAR FRONTEND BUILD (ÚJ RÉSZ)
                    # -----------------------------------------------------
                    echo "Building Frontend..."
                    cd kliens  # Vagy ami a frontend mappád neve (pl. frontend)
                    npm ci     # Frontend függőségek telepítése
                    npm run build # Angular build (létrehozza a dist mappát)
            
                    # Visszalépés a főkönyvtárba vagy a szerver mappába
                    cd .. 

                    # -----------------------------------------------------
                    # 4. BACKEND BUILD ÉS INDÍTÁS
                    # -----------------------------------------------------
                    echo "Building and Starting Backend..."
                    cd server
                    npm ci
                    pm run build
            
                    # PM2 újraindítás (vagy start, ha még nem fut)
                    # A --update-env fontos, ha változtak a környezeti változók
                    pm2 restart node-server --update-env || pm2 start dist/index.js --name "node-server"
        '
    """
                }
            }
        }

        stage('Cleanup') {
            steps {
                // Munkaterület tisztítása
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
            // Itt értesítést küldhetnénk, például e-mailt vagy Slack üzenetet
        }
    }
}