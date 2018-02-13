# !/usr/bin/bash

set -e -x

mocha \
  --retries 5 \
  --require test.config.js \
  -t 30000 \
  $@ \
