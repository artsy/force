#! /bin/bash

set -ex

yarn mocha $(find src -name '*.test.*')
yarn test:jest --maxWorkers=4
