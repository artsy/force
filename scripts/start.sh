#! /bin/bash

set -ex

# used for loading correct manifest
export COMMIT_HASH=`cat COMMIT_HASH.txt`

function version {
  printf "%03d%03d%03d" $(echo "$1" | tr '.' ' ')
}

OPT=(--max_old_space_size=4096)

if [ "$NODE_ENV" != "production" ]; then
  if [ ! -f "./.env" ]; then
    echo -e "\033[1;31m WARNING: Missing .env file, see CONTRIBUTING.md. \033[0m"
  fi
  OPT+=(-r dotenv/config --preserve-symlinks)
  if [ "$TERM_PROGRAM" == "vscode" ] && \
     [ ! -z "$TERM_PROGRAM_VERSION" ] && \
     [ $(version $TERM_PROGRAM_VERSION) -ge $(version "1.22.2") ]
  then
    OPT+=(--inspect-brk)
  fi
fi

exec node "${OPT[@]}" ./src
