# !/usr/bin/bash

yarn deploy-assets && \
git push --force git@heroku.com:force-$DEPLOY_ENV.git master
