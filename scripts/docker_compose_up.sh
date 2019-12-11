#!/bin/bash

export GIT_COMMIT=$1
export API_URL=$2
export CURRENT_ENV=$3
docker-compose down
docker-compose up -d