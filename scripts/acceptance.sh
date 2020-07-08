#! /bin/bash

set -ex

if [ ! -f server.dist.js ]; then
  # Build the client assets for testing
  export BUILD_CLIENT=true

  # CSS is only compiled during a development build?
  export NODE_ENV=production

  yarn webpack
fi

mocha \
  --retries 5 \
  --require test.config.js \
  -t 360000 \
  $@
