pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Serve index.html') {
            steps {
                sh '''
                echo "Starting web server..."
                ls -l
                python3 -m http.server 8080 &
                sleep 5
                '''
            }
        }
    }
}
