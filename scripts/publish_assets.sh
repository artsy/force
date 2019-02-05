#! /bin/bash

set -ex

yarn assets
gzip -S .cgz $(find public/assets -name '*.css')
bucket-assets --fingerprint false --bucket artsy-force-$DEPLOY_ENV
