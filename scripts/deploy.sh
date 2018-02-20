# !/usr/bin/bash

set -e -x

yarn assets
gzip -S .cgz $(find src/public/assets -name '*.css')
gzip -S .jgz $(find src/public/assets -name '*.js')
bucket-assets --bucket artsy-force-$DEPLOY_ENV
heroku config:set ASSET_MANIFEST=$(cat manifest.json) --app=force-$DEPLOY_ENV
if [ -z "$CIRCLE_SHA1" ]; then
  git push --force git@heroku.com:force-$DEPLOY_ENV.git master
else
  git push --force git@heroku.com:force-$DEPLOY_ENV.git $CIRCLE_SHA1:refs/heads/master
fi
