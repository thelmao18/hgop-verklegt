#!/bin/bash

GIT_COMMIT=$1

docker push username/repo:$GIT_COMMIT || exit 1
