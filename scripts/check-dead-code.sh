#!/bin/bash

if [ "$1" = "production" ]; then
    IS_PRODUCTION_MODE="--production"
else
    IS_PRODUCTION_MODE=""
fi

npx knip --no-exit-code --include files $IS_PRODUCTION_MODE \
  | grep -v '__generated__' \
  | grep -v '__mocks__' \
  | grep -v '__stories__'
