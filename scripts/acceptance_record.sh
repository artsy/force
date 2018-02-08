# !/usr/bin/bash

set -e -x

node \
  --require test.config.js \
  -r test/acceptance/helpers/record \
  $@
