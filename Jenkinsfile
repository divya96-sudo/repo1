pipeline {
    agent any
    stages {
        stage('git checkout') {
            steps {
                git branch: 'main', credentialsId: 'b89f5acf-4cbe-481e-ada6-7467f6e601db', url: 'https://github.com/divya96-sudo/repo2.git'
            }
        }

        stage('print current directory') {
            steps{
                echo "Current directory is: ${env.WORKSPACE}"
            }
        }

        stage('build image') {
            steps{
                sh '''
                gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://asia-south1-docker.pkg.dev
                docker build -t sample:latest .
                docker tag sample:latest asia-south1-docker.pkg.dev/training-2024-batch/divya-repo/sam:latest
                docker push asia-south1-docker.pkg.dev/training-2024-batch/divya-repo/sam:latest
                # gcloud run deploy test-service --image asia-south1-docker.pkg.dev/training-2024-batch/divya-repo/sam:latest --platform managed --region asia-south1 --allow-unauthenticated'''
            }
        }       
    }
}
