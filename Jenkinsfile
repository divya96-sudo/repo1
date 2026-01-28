pipeline {
    agent any

    environment {
        GIT_REPO = "https://github.com/divya96-sudo/repo2.git"
        BRANCH = "main"
        IMAGE_NAME = "sample"
        PROJECT = "training-2024-batch"
        REPO_NAME = "divya-repo"
        REGION  = "asia-south1"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: env.BRANCH, credentialsId: '3febab8d-9a5d-4f6a-91ce-03e8b194a073', url: env.GIT_REPO
            }
        }

        stage('Print Current Directory') {
            steps {
                echo "Current directory is: ${env.WORKSPACE}"
            }
        }

        stage('Build Image') {
            steps {
                sh '''
                gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://${env.REGION}-docker.pkg.dev
                docker build -t ${env.IMAGE_NAME}:latest .
                docker tag ${env.IMAGE_NAME}:latest ${env.REGION}-docker.pkg.dev/${env.PROJECT}/${env.REPO_NAME}/${env.IMAGE_NAME}:latest
                docker push ${env.REGION}-docker.pkg.dev/${env.PROJECT}/${env.REPO_NAME}/${env.IMAGE_NAME}:latest
                # gcloud run deploy test-service --image ${env.REGION}-docker.pkg.dev/${env.PROJECT}/${env.REPO_NAME}/${env.IMAGE_NAME}:latest --platform managed --region ${env.REGION} --allow-unauthenticated
                '''
            }
        }       
    }
}

// pipeline {
//     agent any
//     stages {
//         stage('git checkout') {
//             steps {
//                 git branch: 'main', credentialsId: 'b89f5acf-4cbe-481e-ada6-7467f6e601db', url: 'https://github.com/divya96-sudo/repo2.git'
//             }
//         }

//         stage('print current directory') {
//             steps{
//                 echo "Current directory is: ${env.WORKSPACE}"
//             }
//         }

//         stage('build image') {
//             steps{
//                 sh '''
//                 gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://asia-south1-docker.pkg.dev
//                 docker build -t sample:latest .
//                 docker tag sample:latest asia-south1-docker.pkg.dev/training-2024-batch/divya-repo/sam:latest
//                 docker push asia-south1-docker.pkg.dev/training-2024-batch/divya-repo/sam:latest
//                 # gcloud run deploy test-service --image asia-south1-docker.pkg.dev/training-2024-batch/divya-repo/sam:latest --platform managed --region asia-south1 --allow-unauthenticated'''
//             }
//         }       
//     }
// }
