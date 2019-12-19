#! /bin/bash

set -ex

yarn mocha $(find src -name '*.test.*')
yarn jest
