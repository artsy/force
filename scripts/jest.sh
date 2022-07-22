#!/bin/bash

set -ex

NODE_ENV=test

function runJest() {
  node \
    --expose-gc \
    --max_old_space_size=4096 \
    ./node_modules/.bin/jest \
      --logHeapUsage \
      --maxWorkers 3 \
      --config "${1}"
}

runJest jest.config.js
