#!/bin/bash

GIT_COMMIT=$1
 
docker build -t username/repo:$GIT_COMMIT item_repository/ || exit 1
