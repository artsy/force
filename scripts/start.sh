# !/usr/bin/bash

set -e -x

if [ ! -f "./.env" ]; then
  echo -e "\033[1;31m WARNING: Missing .env file, see CONTRIBUTING.md. \033[0m"
fi

export $(cat .env | grep NODE_ENV | xargs)