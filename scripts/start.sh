# !/usr/bin/bash

set -e -x

forever -c 'node -r dotenv/config --max_old_space_size=1024' .
