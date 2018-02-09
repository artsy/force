# !/usr/bin/bash

set -e -x

trap "exit" INT

mocha \
  --compilers js:babel-core/register \
  --compilers js:@babel/register \
  --require test.config.js \
  --timeout 30000 \
   $@
