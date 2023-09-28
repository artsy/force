#!/bin/bash

set -e

# Set debug run options
OPT=("--max_old_space_size=${MAX_OLD_SPACE_SIZE:-3072}")

if [ "${NODE_ENV}" != "production" ]; then
  if [ ! -f "./.env" ]; then
    echo -e "\033[1;31m WARNING: Missing .env file, see CONTRIBUTING.md. \033[0m"
  fi
  OPT+=(--preserve-symlinks)

  yarn concurrently --kill-others 'yarn relay --watch' 'node --max_old_space_size=3072 ./src/dev.js'
else
  exec node "${OPT[@]}" --no-experimental-fetch ./server.dist.js
fi
