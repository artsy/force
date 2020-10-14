#!/bin/bash

set -ex

nyc mocha --no-cache \
  -c \
  --require test.mocha.js \
  --timeout 30000 \
  --reporter mocha-multi-reporters \
  --reporter-options configFile=package.json \
   "$@"
