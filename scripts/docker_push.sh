#!/bin/bash

GIT_COMMIT=$1
docker push villalobos98/hgop:$GIT_COMMIT || exit 1
