node {
    def git = checkout scm
    stage("Build") {
        sh "sudo chmod +x "./scripts/docker_build.sh""
        sh "sudo chmod +x "./scripts/docker_push.sh""
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
}
