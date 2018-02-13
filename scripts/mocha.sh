# !/usr/bin/bash

set -e -x

trap "exit" INT

mocha \
  --require test.config.js \
  --timeout 30000 \
   $@
