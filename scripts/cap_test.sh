#!/bin/bash

cd /var/lib/jenkins/terraform/hgop/capacitytest
API_URL=http://\$(terraform output public_ip):3000
cd -
npm run test:capacity