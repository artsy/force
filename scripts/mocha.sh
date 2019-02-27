#! /bin/bash

set -ex

#trap "exit" INT

# node --inspect-brk \
# ./node_modules/.bin/mocha \
mocha \
  -c \
  --require test.config.js \
  --require mocha.config.js \
  --timeout 30000 \
   $@
