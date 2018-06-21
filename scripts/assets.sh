#! /bin/bash

set -ex

rm -rf public
mkdir public
mkdir public/assets
NODE_ENV=production webpack
stylus \
  $(find src/desktop/assets src/mobile/assets -name '*.styl') \
  --compress \
  -o public/assets
