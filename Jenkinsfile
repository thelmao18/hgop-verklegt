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
            step([
                $class: 'CloverPublisher',
                cloverReportDir: 'coverage',
                cloverReportFileName: 'clover.xml',
                healthyTarget: [methodCoverage: 80, conditionalCoverage: 80, statementCoverage: 80],
                unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
                failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
            ])
        }
    }


    stage("Build")
    {
        sh "chmod +x scripts/docker_build.sh"
        sh "chmod +x scripts/docker_push.sh"
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }

    stage("API Test")
    {
        sh "chmod +x scripts/jenkins_deploy.sh"
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} apitest"
        dir("/var/lib/jenkins/terraform/hgop/apitest")
        {
            sh("echo $(Terraform output public_ip)")
            sh("$API_URL=$(Terraform output public_ip)")
            sh("API_URL=$API_URL:3000 npm run test:api")
        }
        sh "terraform destroy -auto-approve -var environment=apitest || exit 1"
        
    }

    stage("Capacity Test")
    {
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} capacitytest"
        dir("/var/lib/jenkins/terraform/hgop/capacitytest")
        {
            sh("echo $(Terraform output public_ip)")
            sh("$API_URL=$(Terraform output public_ip)")
            sh("API_URL=$API_URL:3000 npm run test:capacity")
        }
        sh "terraform destroy -auto-approve -var environment=capacitytest || exit 1"
    }



    stage("Deploy")
    {
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT}"
    }
    
}
