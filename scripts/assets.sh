# !/usr/bin/bash

set -e -x

rm -rf public
mkdir public
mkdir public/assets
NODE_ENV=production browserify \
  $(find desktop/assets mobile/assets -name '*.coffee') \
  -p prundupify \
  -g [ envify --NODE_ENV production ] \
  -p bundle-collapser/plugin \
  -r babel-polyfill \
  -t babelify \
  -t caching-coffeeify \
  -t jadeify \
  -p [ factor-bundle -o 'cat | uglifyjs -b > public/assets/`basename $FILE .coffee`.js' ] \
  | uglifyjs -b > public/assets/common.js
stylus \
  $(find desktop/assets mobile/assets -name '*.styl') \
  --compress \
  -o public/assets
