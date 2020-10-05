#! /bin/bash

set -ex

yarn test:ci:jest
yarn test:ci:mocha
