pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('error') {
      steps {
        sh 'echo "Starting server..." && ls -l && python3 -m http.server 8080'
      }
    }

  }
}