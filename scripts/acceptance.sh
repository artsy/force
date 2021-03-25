#!/bin/bash

set -ex

export NODE_ENV=production

if [ ! -d public/assets ]; then
  yarn build:assets:legacy
fi

if [ ! -d public/assets-novo ]; then
  yarn build:assets:novo
fi

mocha \
  --retries 5 \
  --require test.config.js \
  -t 360000 \
  "$@"
