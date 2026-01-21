pipeline {
  agent any
  stages {
    stage('print') {
      steps {
        sh '''#!/bin/bash
echo "hello world"'''
      }
    }

  }
  environment {
    qa = 'test'
  }
}