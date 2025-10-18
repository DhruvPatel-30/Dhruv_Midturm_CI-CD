pipeline {
    agent any

    environment {
        IMAGE_NAME = "ci-sample-node-app"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Node.js') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-username', 
                        usernameVariable: 'DOCKER_USER', 
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    bat "docker build -t %DOCKER_USER%/%IMAGE_NAME%:latest ."
                    bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                    bat "docker push %DOCKER_USER%/%IMAGE_NAME%:latest"
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        failure {
            echo 'Build failed!'
        }
    }
}
