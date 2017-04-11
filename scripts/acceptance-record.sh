# !/usr/bin/bash

node \
  -r dotenv/config \
  -r coffee-script/register \
  -r babel-core/register test/acceptance/helpers/record
