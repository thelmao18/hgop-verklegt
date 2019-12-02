#!/bin/bash

GIT_COMMIT=$1
sudo chmod +x /usr/local/bin/docker_build.sh 
docker build -t username/repo:$GIT_COMMIT item_repository/ || exit 1
