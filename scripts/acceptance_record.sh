# !/usr/bin/bash

set -e -x

node \
  --require test.config.js \
  $@
