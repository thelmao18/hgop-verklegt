#!/bin/bash

export GIT_COMMIT=$1
docker-compose down
docker-compose up -d

curl ubuntu@$(terraform output public_ip):3000/status || exit 1