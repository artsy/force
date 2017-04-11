# !/usr/bin/bash

node \
  -r dotenv/config \
  --optimize_for_size \
  --max_semi_space_size=16 \
  --max_old_space_size=1024 \
  --max_executable_size=512 \
  --gc_interval=100 .
