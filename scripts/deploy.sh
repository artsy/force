# !/usr/bin/bash

set -e -x

yarn deploy-assets
git push --force git@heroku.com:force-$DEPLOY_ENV.git master
