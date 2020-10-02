#! /bin/bash

set -ex

JEST_JUNIT_OUTPUT=reports/junit/js-test-results.xml

if [ $1 == "v1" ]
then
  node --expose-gc --max_old_space_size=4096 ./node_modules/.bin/jest  --no-cache  --logHeapUsage --maxWorkers 2 --config jest.config.v1.js
elif [ $1 == "v2" ]
then
  node --expose-gc --max_old_space_size=4096 ./node_modules/.bin/jest  --no-cache --logHeapUsage --maxWorkers 2 --config jest.config.v2.js
fi
