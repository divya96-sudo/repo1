pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Start Web Server') {
            steps {
                sh '''
                echo "Starting server..."
                ls
                python3 -m http.server 8080
                '''
            }
        }
    }
}
