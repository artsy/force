# !/usr/bin/bash

set -e -x

node \
  -r dotenv/config \
  -r coffee-script/register \
  -r babel-core/register test/acceptance/helpers/record \
  $@
