#!/bin/bash

GIT_COMMIT=$1
docker build -t villalobos98/hgop:$GIT_COMMIT item_repository/ || exit 1
