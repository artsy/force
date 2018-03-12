# !/usr/bin/bash

set -e -x

rm -rf public
mkdir public
mkdir public/assets
# NODE_ENV=production webpack
NODE_ENV=development webpack
stylus \
  $(find src/desktop/assets src/mobile/assets -name '*.styl') \
  --compress \
  -o public/assets
