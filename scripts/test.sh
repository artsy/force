#! /bin/bash

set -ex

#trap "exit" INT

run () {
  case $CIRCLE_NODE_INDEX in
  0)
    yarn mocha $(find src -name '*.test.*')
    ;;
  1)
    yarn jest --runInBand
    ;;
  esac
}

if [ -z "$CIRCLE_NODE_INDEX" ]; then
  CIRCLE_NODE_INDEX=0 run
  CIRCLE_NODE_INDEX=1 run
else
  run
fi
