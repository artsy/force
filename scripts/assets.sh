#! /bin/bash

set -ex

rm -rf public
mkdir public
mkdir public/assets
NODE_ENV=production yarn build
stylus \
  $(find src/desktop/assets src/mobile/assets -name '*.styl') \
  --compress \
  -o public/assets
