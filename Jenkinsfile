pipeline {
    agent any

    environment {
        // Docker credentials stored in Jenkins Credentials (see Step 3)
        DOCKERHUB_CREDENTIALS = 'dockerhub-cred-id'
        IMAGE_NAME = 'ci-sample-node-app'
        DOCKER_USER = credentials('dockerhub-cred-id') // username/password stored together
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                // Install Node 18 using NodeJS plugin or nvm
                sh 'curl -fsSL https://deb.nodesource.com/setup_18.x | bash -'
                sh 'apt-get install -y nodejs'
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_USER_USR}/${IMAGE_NAME}:latest")
                    docker.build("${DOCKER_USER_USR}/${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-cred-id') {
                        docker.image("${DOCKER_USER_USR}/${IMAGE_NAME}:latest").push()
                        docker.image("${DOCKER_USER_USR}/${IMAGE_NAME}:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            deleteDir()
        }
        failure {
            echo 'Build failed!'
        }
    }
}
