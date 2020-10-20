#!/bin/bash

set -e

if [ "${NODE_ENV}" == "production" ]; then
  set -x
fi

# Set debug run options
OPT=("--max_old_space_size=${MAX_OLD_SPACE_SIZE:-3072}" -r dotenv/config)

if [ "${NODE_ENV}" != "production" ]; then
  if [ ! -f "./.env" ]; then
    echo -e "\033[1;31m WARNING: Missing .env file, see CONTRIBUTING.md. \033[0m"
  fi
  OPT+=(--preserve-symlinks)

  # If is another node process being debugged do not add the inspect-brk flag to force.
  if (nc -z 127.0.0.1 9229) &> /dev/null; then
    echo
    echo "WARNING! You are already debugging another node process!"
    echo
    echo "    force will start without --inspect-brk unless you kill the other process"
  else
    OPT+=(--inspect-brk)
  fi

  yarn relay --watch & BUILD_CLIENT=true exec node "${OPT[@]}" ./src
else
  exec node "${OPT[@]}" ./server.dist.js
fi
