pipeline {
  agent any

  environment {
    TOMCAT_HOME = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1"
    BACKEND_WAR_NAME = "bookapi.war"
    FRONTEND_APP_NAME = "bookreactapi"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend (WAR)') {
      steps {
        dir('BOOKAPI-SPRINGBOOT') {
          bat 'mvn clean package -DskipTests'
        }
      }
    }

    stage('Build Frontend (Vite)') {
      steps {
        dir('BOOKAPI-REACT') {
          bat 'npm install'
          bat 'npm run build'
        }
      }
    }

    stage('Deploy to Tomcat') {
      steps {
        script {
          bat "\"%TOMCAT_HOME%\\bin\\shutdown.bat\" || echo shutdown returned non-zero"
          bat "if exist \"%TOMCAT_HOME%\\webapps\\${BACKEND_WAR_NAME}\" del /F /Q \"%TOMCAT_HOME%\\webapps\\${BACKEND_WAR_NAME}\""
          bat "if exist \"%TOMCAT_HOME%\\webapps\\bookapi\" rmdir /S /Q \"%TOMCAT_HOME%\\webapps\\bookapi\""
          bat "copy /Y \"BOOKAPI-SPRINGBOOT\\target\\*.war\" \"%TOMCAT_HOME%\\webapps\\${BACKEND_WAR_NAME}\""
          bat "if exist \"%TOMCAT_HOME%\\webapps\\${FRONTEND_APP_NAME}\" rmdir /S /Q \"%TOMCAT_HOME%\\webapps\\${FRONTEND_APP_NAME}\""
          bat "xcopy \"BOOKAPI-REACT\\dist\" \"%TOMCAT_HOME%\\webapps\\${FRONTEND_APP_NAME}\" /E /I /Y"
          bat "\"%TOMCAT_HOME%\\bin\\startup.bat\" || echo startup returned non-zero"
        }
      }
    }
  }

  post {
    success {
      echo "Deployment complete."
      echo "Frontend: http://localhost:8080/${env.FRONTEND_APP_NAME}/"
      echo "Backend:  http://localhost:8080/${env.BACKEND_WAR_NAME.replace('.war','')}/ (check controller paths)"
    }
    failure {
      echo "Pipeline failed — check console output for errors."
    }
  }
}
