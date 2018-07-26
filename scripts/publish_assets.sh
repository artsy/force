#! /bin/bash

set -ex

yarn assets
gzip -S .cgz $(find public/assets -name '*.css')
gzip -S .jgz $(find public/assets -name '*.js')
bucket-assets --bucket artsy-force-$DEPLOY_ENV