#! /bin/bash

set -ex

rm -rf public
mkdir public
mkdir public/assets
NODE_ENV=production node --max_old_space_size=4096 node_modules/.bin/webpack
stylus \
  $(find src/desktop/assets src/mobile/assets -name '*.styl') \
  --compress \
  -o public/assets
