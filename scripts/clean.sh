#!/bin/bash

set -ex

rm -rf .cache
echo '[Force] Cleaned .cache directory'

rm -rf dist
echo '[Force] Cleaned dist directory'

rm -rf node_modules/.cache/rspack
echo '[Force] Cleaned node_modules/.cache/rspack'
