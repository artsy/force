# !/usr/bin/bash

set -e -x

mocha \
  --retries 5 \
  --compilers coffee:coffee-script/register,js:babel-core/register \
  -r dotenv/config \
  -r should \
  -t 30000 \
  $@ \
  dotenv_config_path=.env.test
