# !/usr/bin/bash

set -e -x

VERSION=$(sentry-cli releases propose-version)
sentry-cli releases -o artsynet -p force-$DEPLOY_ENV files $VERSION upload-sourcemaps ./public/assets
