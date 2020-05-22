#! /bin/bash

set -ex

node \
  --require test.config.js \
  $@
