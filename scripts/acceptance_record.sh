#! /bin/bash

set -ex

node \
  --require test.jest.config.js \
  $@
