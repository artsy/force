# !/usr/bin/bash

set -e -x

trap "exit" INT

mocha \
  --require source-map-support/register \
  --require should \
  --require lib/jade_hook.js \
  --require test/test.config.js \
  --compilers js:@babel/register,coffee:coffee-script/register \
  --timeout 30000 \
   $@
