#!/bin/bash

set -ex


NODE_ENV=test

node \
  --expose-gc \
  --max_old_space_size=4096 \
  --no-experimental-fetch \
  ./node_modules/.bin/jest \
    --logHeapUsage \
    --maxWorkers 2 \
    --config jest.config.js \
    "$@"
