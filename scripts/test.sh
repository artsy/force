# !/usr/bin/bash

set -e -x

trap "exit" INT

run () {
  case $CIRCLE_NODE_INDEX in
  0)
    yarn assets
    yarn acceptance test/acceptance/*.js
    ;;
  1)
    yarn mocha test/lib/*
    yarn mocha $(find desktop/test -name '*.coffee')
    yarn mocha $(find desktop/components/*/test -name '*.coffee')
    yarn mocha $(find desktop/components/*/test -name '*.js')
    yarn mocha $(find desktop/components/**/*/test -name '*.coffee')
    yarn mocha $(find desktop/components/**/*/test -name '*.js')
    yarn mocha $(find desktop/components -name '*.test.js')
    ;;
  2)
    yarn mocha $(find desktop/apps/*/test -name '*.coffee')
    yarn mocha $(find desktop/apps/*/test -name '*.js')
    yarn mocha $(find desktop/apps/*/**/*/test -name '*.coffee')
    yarn mocha $(find desktop/apps -name '*.test.js')
    ;;
  3)
    yarn mocha $(find mobile/test -name '*.coffee')
    yarn mocha $(find mobile/components/*/test -name '*.coffee')
    yarn mocha $(find mobile/components/**/*/test -name '*.coffee')
    yarn mocha $(find mobile/apps/*/test -name '*.coffee')
    yarn mocha $(find mobile/apps/*/**/*/test -name '*.coffee')
    ;;
  esac
}

if [ -z "$CIRCLE_NODE_INDEX" ]; then
  CIRCLE_NODE_INDEX=0 run
  # CIRCLE_NODE_INDEX=1 run
  # CIRCLE_NODE_INDEX=2 run
  # CIRCLE_NODE_INDEX=3 run
else
  run
fi
