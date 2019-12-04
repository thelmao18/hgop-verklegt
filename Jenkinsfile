node {
    def git = checkout scm
    stage("Clean") {
        sh "echo 'Cleaning generated artifacts'"
        sh "git clean -dfxq"
        sh "git stash"
    }


    stage("Setup") {
        sh "npm install jest --global"

    }


    stage("Lint") {
        sh "npm run lint"
    }


    stage("Test") {

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
