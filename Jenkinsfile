pipeline {
    agent any

    environment {
        PROJECT = "training-2024-batch"
        GIT_REPO = "${params.GIT_REPO}"
        BRANCH = "${params.BRANCH}"
        REPO_NAME = "divya-repo"
        IMAGE_NAME = "html"
        REGION  = "asia-south1"
    }

    stages {
        stage('Git Checkout') {
            steps {
                echo "Checking out branch ${env.BRANCH} from repo ${env.GIT_REPO}"
                git branch: "${params.BRANCH}", url: "${params.GIT_REPO}"
            }
        }

        stage('Print Current Directory') {
            steps {
                echo "Current directory is: ${env.WORKSPACE}"
            }
        }

        stage('Image Build & Push') {
            steps {
                sh """
                gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://${env.REGION}-docker.pkg.dev
                docker build -t ${env.IMAGE_NAME}:latest .
                docker tag ${env.IMAGE_NAME}:latest ${env.REGION}-docker.pkg.dev/${env.PROJECT}/${env.REPO_NAME}/${env.IMAGE_NAME}:${env.GIT_COMMIT}
                docker push ${env.REGION}-docker.pkg.dev/${env.PROJECT}/${env.REPO_NAME}/${env.IMAGE_NAME}:${env.GIT_COMMIT}
                """
            }
        }
        // stage ("Deploy App"){
        //     steps{
        //         sh """
        //         gcloud run deploy html-service --image ${env.REGION}-docker.pkg.dev/${env.PROJECT}/${env.REPO_NAME}/${env.IMAGE_NAME}:${env.GIT_COMMIT} --platform managed --region ${env.REGION}  --allow-unauthenticated --port 80
        //         """
        //     }
        // }
    }
}