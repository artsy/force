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
    yarn mocha $(find src/desktop/apps/*/test -name '*.coffee')
    yarn mocha $(find src/desktop/apps/*/test -name '*.js')
    yarn mocha $(find src/desktop/apps/*/**/*/test -name '*.coffee')
    yarn mocha $(find src/desktop/apps -name '*.test.js')
    ;;
  2)
    yarn mocha $(find src/mobile -name '*.test.*')
    # 232 passing, 2 pending: src/mobile/test
    # 115 passing, 3 pending: src/mobile/components/*/test
    # 4 passing: src/mobile/components/**/*/test
    # 299 passing, 17 pending: src/mobile/apps/*/test
    # 9 passing: src/mobile/apps/*/**/*/test 
    yarn jest
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
