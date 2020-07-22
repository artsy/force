#! /bin/bash

set -e

if [ "$NODE_ENV" == "production" ]; then
  set -x
fi

function version {
  printf "%03d%03d%03d" $(echo "$1" | tr '.' ' ')
}

: ${MAX_OLD_SPACE_SIZE:=3072}
OPT=(--max_old_space_size=$MAX_OLD_SPACE_SIZE -r dotenv/config)

if [ "$NODE_ENV" != "production" ]; then
  if [ ! -f "./.env" ]; then
    echo -e "\033[1;31m WARNING: Missing .env file, see CONTRIBUTING.md. \033[0m"
  fi
  OPT+=(--preserve-symlinks)
  if [ "$TERM_PROGRAM" == "vscode" ] && \
     [ ! -z "$TERM_PROGRAM_VERSION" ] && \
     [ $(version $TERM_PROGRAM_VERSION) -ge $(version "1.22.2") ]
  then
    # Sometimes we have force and metaphysics running at the same time.
    # in that case we don't want to fail to launch, but simply show a warning
    # that the debugging won't work.
    if (nc -z 127.0.0.1 9229) &> /dev/null; then
      echo
      echo "WARNING! You are already debugging another node process!"
      echo
      echo "    force will start without --inspect-brk unless you kill the other process"
    else
      OPT+=(--inspect-brk)
    fi
  fi

  yarn relay --watch & BUILD_CLIENT=true exec node "${OPT[@]}" ./src
else
  exec node "${OPT[@]}" ./server.dist.js
fi
