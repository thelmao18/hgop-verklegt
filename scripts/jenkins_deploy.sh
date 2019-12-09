#!/bin/bash

GIT_COMMIT=$1
CURRENT_ENV=$2

# We need to move some files around, because of the terraform state limitations.
mkdir -p /var/lib/jenkins/terraform/hgop/$CURRENT_ENV
mkdir -p /var/lib/jenkins/terraform/hgop/$CURRENT_ENV/scripts
rm -f /var/lib/jenkins/terraform/hgop/$CURRENT_ENV/scripts/initialize_game_api_instance.sh
cp scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/$CURRENT_ENV/scripts/initialize_game_api_instance.sh
rm -f /var/lib/jenkins/terraform/hgop/$CURRENT_ENV/scripts/docker_compose_up.sh
cp scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/$CURRENT_ENV/scripts/docker_compose_up.sh
rm -f /var/lib/jenkins/terraform/hgop/$CURRENT_ENV/docker-compose.yml
cp docker-compose.yml /var/lib/jenkins/terraform/hgop/$CURRENT_ENV/docker-compose.yml

rm -f /var/lib/jenkins/terraform/hgop/$CURRENT_ENV/*.tf
cp *.tf /var/lib/jenkins/terraform/hgop/$CURRENT_ENV

cd /var/lib/jenkins/terraform/hgop/$CURRENT_ENV
terraform init # In case terraform is not initialized.
terraform destroy -auto-approve -var environment=$CURRENT_ENV || exit 1
terraform apply -auto-approve -var environment=$CURRENT_ENV || exit 1

echo "$CURRENT_ENV Game API running at " + $(terraform output public_ip)

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "chmod +x docker_compose_up.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT"

sleep 20s
curl ubuntu@$(terraform output public_ip):3000/status || exit 1

exit 0