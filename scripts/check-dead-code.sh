#!/bin/bash

npx ts-prune --project tsconfig.json \
  | grep -v '(used in module)' \
  | grep -v '__generated__' \
  | grep -v '__stories__' \
  | grep -v '.story.' \
  | grep -v '__mocks__'
