# !/usr/bin/bash

set -ex

#trap "exit" INT

run () {
  case $CIRCLE_NODE_INDEX in
  0)
    yarn mocha $(find src/test -name '*.test.*')
    yarn mocha $(find src/desktop/test -name '*.test.*')
    yarn mocha $(find src/desktop/components -name '*.test.*')
    nyc report --reporter=text-lcov > coverage.lcov
    yarn report-coverage
    ;;
  1)
    yarn mocha $(find src/desktop/apps -name '*.test.*')
    nyc report --reporter=text-lcov > coverage.lcov
    yarn report-coverage
    ;;
  2)
    yarn mocha $(find src/mobile -name '*.test.*')
    yarn jest --runInBand
    yarn publish-coverage
    ;;
  esac
}

if [ -z "$CIRCLE_NODE_INDEX" ]; then
  CIRCLE_NODE_INDEX=0 run
  CIRCLE_NODE_INDEX=1 run
  CIRCLE_NODE_INDEX=2 run
else
  run
fi
