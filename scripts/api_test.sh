#!/bin/bash

cd /var/lib/jenkins/terraform/hgop/apitest
API_URL=http://\$(terraform output public_ip):3000
cd -
npm run test:api