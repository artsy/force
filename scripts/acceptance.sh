# !/usr/bin/bash

set -e -x

mocha \
  --retries 5 \
  --require test.config.js \
  -t 60000 \
  $@ \
  dotenv_config_path=.env.test
