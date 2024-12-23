#!/bin/bash

set -e

# Set debug run options
OPT=("--max_old_space_size=${MAX_OLD_SPACE_SIZE:-3072}")

if [ "${NODE_ENV}" != "production" ]; then
  if [ ! -f "./.env" ]; then
    echo -e "\033[1;31m WARNING: Missing .env file, see CONTRIBUTING.md. \033[0m"
  fi
  OPT+=(--preserve-symlinks)

  # Smoke Tests
  if [ "$CIRCLECI" = "true" ]; then
    exec node --max_old_space_size=3072 -r @swc-node/register ./src/dev.ts
  # Dev
  else
    yarn concurrently --raw --kill-others 'yarn relay --watch' "node --max_old_space_size=3072 -r @swc-node/register ./src/dev.ts $@"
  fi
# Prod
else
  export NODE_PATH=src
  exec  node "${OPT[@]}" --no-experimental-fetch -r @swc-node/register ./src/prod.ts
fi
