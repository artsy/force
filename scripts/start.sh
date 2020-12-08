#!/bin/bash

set -e

# Set debug run options
OPT=("--max_old_space_size=${MAX_OLD_SPACE_SIZE:-3072}" -r dotenv/config)

if [ "${NODE_ENV}" != "production" ]; then
  if [ ! -f "./.env" ]; then
    echo -e "\033[1;31m WARNING: Missing .env file, see CONTRIBUTING.md. \033[0m"
  fi
  OPT+=(--preserve-symlinks)

  yarn relay --watch & \
    exec ./node_modules/.bin/nodemon "${OPT[@]}" ./src/index.server.js & \
    exec node "${OPT[@]}" ./src/index.hot.js
else
  exec node "${OPT[@]}" ./server.dist.js
fi
