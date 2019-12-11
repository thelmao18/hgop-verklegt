#!/bin/bash

GIT_COMMIT=$1
docker build -t villalobos98/hgop:$GIT_COMMIT game_api/ || exit 1
#docker build -t villalobos98/game_client:$GIT_COMMIT game_client/ || exit 1
