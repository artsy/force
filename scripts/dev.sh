# !/usr/bin/bash

set -e -x

node -r dotenv/config --max_old_space_size=1024 .
