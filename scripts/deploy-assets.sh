# !/usr/bin/bash

set -e -x

NODE_ENV=production
mkdir public;
mkdir public/assets;
ezel-assets mobile/assets/
ezel-assets desktop/assets/
bucket-assets --bucket artsy-force-$DEPLOY_ENV
heroku config:set ASSET_MANIFEST=$(cat manifest.json) --app=force-$DEPLOY_ENV
