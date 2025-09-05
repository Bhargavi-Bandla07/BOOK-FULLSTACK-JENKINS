pipeline {
  agent any

  environment {
    // EDIT this if your Tomcat installation path is different
    TOMCAT_HOME = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1"
    BACKEND_WAR_NAME = "bookapi.war"
    FRONTEND_APP_NAME = "bookreactapi"
    TOMCAT_PORT = "2030"
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
          // Try to stop Tomcat (works when Tomcat started via startup.bat)
          bat "\"%TOMCAT_HOME%\\bin\\shutdown.bat\" || echo shutdown returned non-zero"

          // Remove old backend WAR and exploded folder if present
          bat "if exist \"%TOMCAT_HOME%\\webapps\\${BACKEND_WAR_NAME}\" del /F /Q \"%TOMCAT_HOME%\\webapps\\${BACKEND_WAR_NAME}\""
          bat "if exist \"%TOMCAT_HOME%\\webapps\\bookapi\" rmdir /S /Q \"%TOMCAT_HOME%\\webapps\\bookapi\""

          // Copy new backend WAR (from maven target)
          bat "copy /Y \"BOOKAPI-SPRINGBOOT\\target\\*.war\" \"%TOMCAT_HOME%\\webapps\\${BACKEND_WAR_NAME}\""

          // Remove old frontend folder and copy new dist
          bat "if exist \"%TOMCAT_HOME%\\webapps\\${FRONTEND_APP_NAME}\" rmdir /S /Q \"%TOMCAT_HOME%\\webapps\\${FRONTEND_APP_NAME}\""
          bat "xcopy \"BOOKAPI-REACT\\dist\" \"%TOMCAT_HOME%\\webapps\\${FRONTEND_APP_NAME}\" /E /I /Y"

          // Start Tomcat
          bat "\"%TOMCAT_HOME%\\bin\\startup.bat\" || echo startup returned non-zero"
        }
      }
    }
  }

  post {
    success {
      echo "Deployment complete."
      echo "Frontend: http://localhost:${env.TOMCAT_PORT}/${env.FRONTEND_APP_NAME}/"
      echo "Backend (example): http://localhost:${env.TOMCAT_PORT}/bookapi/all"
    }
    failure {
      echo "Pipeline failed — check console output for errors."
    }
  }
}
