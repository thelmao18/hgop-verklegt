#!/bin/bash

GIT_COMMIT=$1
sudo chmod +x ~/docker_push.sh
docker push username/repo:$GIT_COMMIT || exit 1
