#! /bin/bash

set -ex

yarn test:jest --maxWorkers=4
yarn mocha $(find src -name '*.test.*')
