node {
    def git = checkout scm
    stage("Clean") {
        sh "echo 'Cleaning generated artifacts'"
        sh "git clean -dfxq"
        sh "git stash"
    }


    stage("Setup") {
        dir("./game_api")
        {
            //sh "npm install jest --save-dev"
            //sh "npm install eslint --save-dev"
        }
        
        
    }


    stage("Lint") {
        dir("./game_api")
        {
            //sh "npm run eslint"
        }
        
    }


    stage("Test") {
        dir("./game_api")
        {
            sh "npm run test:unit"
        }
    }


    stage("Build") {
        sh "chmod +x scripts/docker_build.sh"
        sh "chmod +x scripts/docker_push.sh"
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }


    stage("Deploy")
    {

    }
    
}
