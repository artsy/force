# !/usr/bin/bash

set -e -x

yarn acceptance
yarn mocha test/lib/*
yarn mocha $(find desktop/test -name '*.coffee')
yarn mocha $(find desktop/components/*/test -name '*.coffee')
yarn mocha $(find desktop/components/**/*/test -name '*.coffee')
yarn mocha $(find desktop/apps/*/test -name '*.coffee' -or -name '*.js')
yarn mocha $(find desktop/apps/*/**/*/test -name '*.coffee')
yarn mocha $(find mobile/test -name '*.coffee')
yarn mocha $(find mobile/components/*/test -name '*.coffee')
yarn mocha $(find mobile/components/**/*/test -name '*.coffee')
yarn mocha $(find mobile/apps/*/test -name '*.coffee')
yarn mocha $(find mobile/apps/*/**/*/test -name '*.coffee')
