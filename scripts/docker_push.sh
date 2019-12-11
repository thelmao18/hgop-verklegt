#!/bin/bash

GIT_COMMIT=$1
docker push villalobos98/hgop:$GIT_COMMIT || exit 1
#docker push villalobos98/game_client:$GIT_COMMIT || exit 1
#Removed since package.json for game_client is not and should not be 
#a part of our git repository