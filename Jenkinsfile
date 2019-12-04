node {
    def git = checkout scm
    stage("Clean")
    {
        sh "echo 'Cleaning generated artifacts'"
        sh "git clean -dfxq"
        sh "git stash"
    }


    stage("Setup")
    {
        dir("./game_api")
        {
            sh "npm install"
        }
    }


    stage("Lint")
    {
        dir("./game_api")
        {
            sh "npm run eslint"
        }
        
    }


    stage("Test")
    {
        dir("./game_api")
        {
            sh "npm run test:unit"
        }
    }


    stage("Build")
    {
        sh "ls"
        sh "chmod +x scripts/docker_build.sh"
        sh "ls"
        sh "chmod +x scripts/docker_push.sh"
        sh "ls"
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "ls"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
        sh "ls"
    }


    stage("Deploy")
    {
        sh "chmod +x scripts/jenkins_deploy.sh && ./scripts/jenkins_deploy.sh"
    }
    
}
