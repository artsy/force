#! /bin/bash

set -ex

yarn webpack

mocha \
  --retries 5 \
  --require test.jest.config.js \
  -t 60000 \
  $@
