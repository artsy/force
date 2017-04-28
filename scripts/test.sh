# !/usr/bin/bash

set -e -x

run () {
  case $CIRCLE_NODE_INDEX in
  0)
    yarn acceptance
    yarn mocha \
      test/lib/* \
      $(find desktop/test -name '*.coffee') \
      $(find mobile/test -name '*.coffee')
    ;;
  1)
    yarn mocha \
      $(find desktop/components/*/test -name '*.coffee')
    yarn mocha \
      $(find desktop/components/**/*/test -name '*.coffee')
    ;;
  2)
    yarn mocha \
      $(find desktop/apps/*/test -name '*.coffee')
    yarn mocha \
      $(find desktop/apps/*/test -name '*.js')
    yarn mocha \
      $(find desktop/apps/*/**/*/test -name '*.coffee')
    ;;
  3)
    yarn mocha \
      $(find mobile/components/*/test -name '*.coffee') \
      $(find mobile/components/**/*/test -name '*.coffee') \
      $(find mobile/apps/*/test -name '*.coffee') \
      $(find mobile/apps/*/**/*/test -name '*.coffee')
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
