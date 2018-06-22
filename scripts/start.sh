#! /bin/bash

set -ex

if [ "$NODE_ENV" = "production" ]; then
  node --max_old_space_size=1024 ./src
else
  if [ ! -f "./.env" ]; then
    echo -e "\033[1;31m WARNING: Missing .env file, see CONTRIBUTING.md. \033[0m"
  fi
  node -r dotenv/config --max_old_space_size=1024 ./src
fi
