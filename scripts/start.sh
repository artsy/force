# !/usr/bin/bash

set -e -x

if [ ! -f "./.env" ]; then
  echo -e "\033[1;31m WARNING: Missing .env file, see CONTRIBUTING.md. \033[0m"
fi

forever -c 'node -r dotenv/config --max_old_space_size=1024' . --colors
