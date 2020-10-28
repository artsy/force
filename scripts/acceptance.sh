#!/bin/bash

set -ex

export NODE_ENV=production

if [ ! -f server.dist.js ]; then
  yarn build:assets
  yarn build:assets:novo

  # TODO: We don't need the server to be built here, these tests only rely on assets.
  yarn build:server
fi

mocha \
  --retries 5 \
  --require test.config.js \
  -t 360000 \
  "$@"
