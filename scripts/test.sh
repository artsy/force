#! /usr/bin/bash

set -e -x

#trap "exit" INT

run () {
  case $CIRCLE_NODE_INDEX in
  0)
    yarn assets
    ;;
  1)
    yarn mocha src/test/lib/*
    yarn mocha $(find src/desktop/test -name '*.coffee')
    yarn mocha $(find src/desktop/components/*/test -name '*.coffee')
    yarn mocha $(find src/desktop/components/*/test -name '*.js')
    yarn mocha $(find src/desktop/components/**/*/test -name '*.coffee')
    yarn mocha $(find src/desktop/components/**/*/test -name '*.js')
    yarn mocha $(find src/desktop/components -name '*.test.js')
    ;;
  2)
    yarn mocha $(find src/desktop/apps/*/test -name '*.coffee')
    yarn mocha $(find src/desktop/apps/*/test -name '*.js')
    yarn mocha $(find src/desktop/apps/*/**/*/test -name '*.coffee')
    yarn mocha $(find src/desktop/apps -name '*.test.js')
    ;;
  3)
    yarn mocha $(find src/mobile/test -name '*.coffee')
    yarn mocha $(find src/mobile/components/*/test -name '*.coffee')
    yarn mocha $(find src/mobile/components/**/*/test -name '*.coffee')
    yarn mocha $(find src/mobile/apps/*/test -name '*.coffee')
    yarn mocha $(find src/mobile/apps/*/**/*/test -name '*.coffee')
    yarn jest
    ;;
  esac
}

if [ -z "$CIRCLE_NODE_INDEX" ]; then
  CIRCLE_NODE_INDEX=0 run
  CIRCLE_NODE_INDEX=1 run
  CIRCLE_NODE_INDEX=2 run
  CIRCLE_NODE_INDEX=3 run
else
  run
fi
