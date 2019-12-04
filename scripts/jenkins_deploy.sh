#!/bin/bash

GIT_COMMIT=$1

# We need to move some files around, because of the terraform state limitations.
mkdir -p /var/lib/jenkins/terraform/hgop/production
mkdir -p /var/lib/jenkins/terraform/hgop/production/scripts
rm -f /var/lib/jenkins/terraform/hgop/production/scripts/initialize_game_api_instance.sh
cp scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/production/scripts/initialize_game_api_instance.sh
rm -f /var/lib/jenkins/terraform/hgop/production/scripts/docker_compose_up.sh
cp scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/production/scripts/docker_compose_up.sh
rm -f /var/lib/jenkins/terraform/hgop/production/docker-compose.yml
cp docker-compose.yml /var/lib/jenkins/terraform/hgop/production/docker-compose.yml

ls
rm -f /var/lib/jenkins/terraform/hgop/production/*.tf
ls
cp *.tf /var/lib/jenkins/terraform/hgop/production

cd /var/lib/jenkins/terraform/hgop/production
terraform init ｜｜ exit 1 # In case terraform is not initialized.
terraform destroy -auto-approve ｜｜ exit 1
terraform apply -auto-approve ｜｜ exit 1

echo "Game API running at " + $(terraform output public_ip)

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh" ｜｜ exit 1
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT" ｜｜ exit 1


exit 0
