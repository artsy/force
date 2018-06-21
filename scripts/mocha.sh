#! /bin/bash

set -ex

#trap "exit" INT

mocha \
  -c \
  --require test.config.js \
  --timeout 30000 \
   $@
