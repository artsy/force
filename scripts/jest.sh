#!/bin/bash

set -ex

if [ "$1" == "v1" ]; then
  node --expose-gc --max_old_space_size=4096 ./node_modules/.bin/jest  --logHeapUsage --maxWorkers 3 --config jest.config.v1.js
elif [ "$1" == "v2" ]; then
  node --expose-gc --max_old_space_size=4096 ./node_modules/.bin/jest  --logHeapUsage --maxWorkers 3 --config jest.config.v2.js
fi
