# !/usr/bin/bash

set -e -x

yarn assets
gzip -S .cgz $(find public/assets -name '*.css')
gzip -S .jgz $(find public/assets -name '*.js')
bucket-assets --bucket artsy-force-$DEPLOY_ENV
heroku config:set ASSET_MANIFEST=$(cat manifest.json) --app=force-$DEPLOY_ENV
if [ -z "$CIRCLE_SHA1" ]; then
  git push --force heroku master
else
  git push --force heroku $CIRCLE_SHA1:refs/heads/master
fi

if [ "$DEPLOY_ENV" = 'production' ]
  git tag "production-$(date +%Y-%m-%d-%H-%M)"
  git push -q https://$GITHUB_API_TOKEN@github.com/artsy/force.git --tags
fi
