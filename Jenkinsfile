pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-username')  // Docker Hub username
        DOCKER_PASS = credentials('dockerhub-password')  // Docker Hub token
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

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKER_USER%/%IMAGE_NAME%:latest ."
                bat "docker build -t %DOCKER_USER%/%IMAGE_NAME%:%BUILD_NUMBER% ."
            }
        }

        stage('Push Docker Image') {
            steps {
                bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                bat "docker push %DOCKER_USER%/%IMAGE_NAME%:latest"
                bat "docker push %DOCKER_USER%/%IMAGE_NAME%:%BUILD_NUMBER%"
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
