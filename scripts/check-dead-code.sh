#!/bin/bash

npx knip --no-exit-code --include files \
  | grep -v '__generated__' \
  | grep -v '__mocks__' \
  | grep -v '__stories__'
