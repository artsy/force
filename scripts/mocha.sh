# !/usr/bin/bash

mocha \
  -r should \
  --compilers coffee:coffee-script/register,js:babel-core/register \
  -t 30000
