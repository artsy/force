# !/usr/bin/bash

set -e -x

rm -rf public
mkdir public
mkdir public/assets
NODE_ENV=production browserify \
  $(find desktop/assets mobile/assets -name '*.coffee') \
  -p prundupify \
  -g [ envify --NODE_ENV production ] \
  -g uglifyify \
  -p bundle-collapser/plugin \
  -t babelify \
  -t caching-coffeeify \
  -t jadeify \
  -p [ factor-bundle -o 'uglifyjs > public/assets/`basename $FILE .coffee`.js' ] \
  | uglifyjs > public/assets/common.js
stylus \
  $(find desktop/assets mobile/assets -name '*.styl') \
  --compress \
  -o public/assets
