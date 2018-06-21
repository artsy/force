#! /bin/bash

set -e -x

#trap "exit" INT

mocha \
  -c \
  --require test.config.js \
  --timeout 30000 \
   $@
