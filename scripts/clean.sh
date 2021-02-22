#!/bin/bash

set -ex

rm -rf .cache
rm -f manifest.json
rm -f manifest-novo.json
rm -rf public
mkdir public
rm -f src/mobile/public/assets/* src/desktop/public/assets/*

echo '[Force] Cleaned build directory'
