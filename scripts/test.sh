#! /bin/bash

set -ex

#trap "exit" INT

run () {
  case $CIRCLE_NODE_INDEX in
  0)
    yarn mocha $(find src/test -name '*.test.*')
    yarn mocha $(find src/desktop/test -name '*.test.*')
    yarn mocha $(find src/desktop/components -name '*.test.*')
    ;;
  1)
    yarn mocha $(find src/desktop/apps -name '*.test.*')
    ;;
  2)
    yarn mocha $(find src/mobile -name '*.test.*')
    yarn jest --runInBand
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
