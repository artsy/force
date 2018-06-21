#! /bin/bash

set -ex

VERSION=$(node_modules/.bin/sentry-cli releases propose-version)
node_modules/.bin/sentry-cli releases -o artsynet -p force-$DEPLOY_ENV files $VERSION upload-sourcemaps ./public/assets
