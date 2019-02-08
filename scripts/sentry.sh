#! /bin/bash

set -ex

# See: https://docs.sentry.io/workflow/releases

VERSION=$(node_modules/.bin/sentry-cli releases propose-version)

node_modules/.bin/sentry-cli releases -o artsynet -p force-$DEPLOY_ENV files $VERSION upload-sourcemaps ./public/assets --no-rewrite
node_modules/.bin/sentry-cli releases set-commits --auto $VERSION
