#! /bin/bash

set -ex

yarn mocha \
  --retries 5 \
  --require test.config.js \
  -t 60000 \
  $@
