#! /bin/bash

set -ex

mocha \
  --retries 5 \
  --require test.config.js \
  -t 60000 \
  $@
