# !/usr/bin/bash

set -e -x

mocha \
  --require source-map-support/register \
  -r should \
  --compilers coffee:coffee-script/register,js:babel-core/register \
  -t 30000 $@
