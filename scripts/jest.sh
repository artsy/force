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
      --reporters=default
      --reporters=jest-junit
      --config "${1}"
}

if [ "$1" == "legacy" ]; then
  runJest jest.config.legacy.js
elif [ "$1" == "v2" ]; then
  runJest jest.config.v2.js
fi
