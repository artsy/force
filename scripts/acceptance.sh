# !/usr/bin/bash

mocha \
  --retries 5 \
  --compilers coffee:coffee-script/register,js:babel-core/register \
  -r dotenv/config \
  -r should \
  -t 300000 dotenv_config_path=.env.test test/acceptance/*.js
