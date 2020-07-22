#! /bin/bash

set -ex

# Build the client assets for testing
export BUILD_CLIENT=true

# CSS is only compiled during a development build?
export NODE_ENV=production

yarn webpack

mocha \
  --retries 5 \
  --require test.config.js \
  -t 60000 \
  $@
