#!/bin/bash

set -ex

rm -rf .cache
rm -f manifest.json
rm -rf public
mkdir public
rm -f src/public/assets/*

echo '[Force] Cleaned build directory'
