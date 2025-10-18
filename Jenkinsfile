pipeline {
    agent any

    environment {
        // Docker credentials stored in Jenkins (Username + Password)
        DOCKERHUB_USER = credentials('dockerhub-username') // your Docker Hub username credential ID
        DOCKERHUB_PASS = credentials('dockerhub-password') // your Docker Hub password/token credential ID
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
                // Make sure Node.js is installed on your Windows agent
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

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKERHUB_USER%/%IMAGE_NAME%:latest ."
                bat "docker build -t %DOCKERHUB_USER%/%IMAGE_NAME%:%BUILD_NUMBER% ."
            }
        }

        stage('Push Docker Image') {
            steps {
                bat "docker login -u %DOCKERHUB_USER% -p %DOCKERHUB_PASS%"
                bat "docker push %DOCKERHUB_USER%/%IMAGE_NAME%:latest"
                bat "docker push %DOCKERHUB_USER%/%IMAGE_NAME%:%BUILD_NUMBER%"
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
