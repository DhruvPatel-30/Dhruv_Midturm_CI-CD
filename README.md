# CI-Midterm: Node.js Sample Application

**Author:** Dhruv Patel  
**Student ID:** 9062297  
**Project:** CI Pipeline with GitHub Actions and Jenkins  

---

## Repo Structure

DHRUV_MIDTURM_CI-CD:

src: math.js && index.js
tests: maths.test.js
package.json
package-lock.json
Dockerfile
Jenkinsfile
.github/workflows/ci.yml
Screenshots

## Step:

## Build & Run Application

## check it locally:

1. Install dependencies:
npm ci

2. Start the application:
npm start

3. Verify the app by going to brwser : http://localhost:3000

4. Start testing:
npm test 

5. CI pipeline :
add credentials in gitHub screats such as : docker_username and docker-tokens 
push to gitHub repo and it will autometically run in Actions

6. Jenkins: 
add credentials and create pipline name with selection of pipline 
add gitHub repo and change to main
build now

