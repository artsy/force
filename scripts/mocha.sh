#! /bin/bash

set -ex

#trap "exit" INT

mocha \
  -c \
  --require raf/polyfill \
  --require jsdom-global/register \
  --require test.config.js \
  --timeout 30000 \
   $@
