#! /bin/bash

set -ex

VERSION=$(node_modules/.bin/sentry-cli releases propose-version)

# See: https://docs.sentry.io/workflow/releases

# Create a release
node_modules/.bin/sentry-cli releases -o artsynet -p force-$DEPLOY_ENV files $VERSION upload-sourcemaps ./public/assets
# Associate commits
node_modules/.bin/sentry-cli releases set-commits --auto $VERSION
