#! /bin/bash

set -ex

yarn jest
yarn mocha $(find src -name '*.test.*')
