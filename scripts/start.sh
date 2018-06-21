#! /bin/bash

set -ex

if [ ! -f "./.env" ]; then
  echo -e "\033[1;31m WARNING: Missing .env file, see CONTRIBUTING.md. \033[0m"
fi

export $(cat .env | grep NODE_ENV | xargs)

if [ "$NODE_ENV" = "development" ]; then
  node -r dotenv/config --max_old_space_size=1024 ./src
else
  node --max_old_space_size=1024 ./src
fi
