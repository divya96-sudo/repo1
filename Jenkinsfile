pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Publish HTML') {
      steps {
        // Create a folder for HTML reports
        sh 'mkdir -p html-report && cp index.html html-report/'
        
        // Publish using Jenkins HTML Publisher
        publishHTML([
          allowMissing: false,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'html-report',
          reportFiles: 'index.html',
          reportName: 'My Website'
        ])
      }
    }
  }
}
