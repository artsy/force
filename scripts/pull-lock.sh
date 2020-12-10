#!/bin/bash

set -e

DISABLE_PULL_LOCK=$(grep DISABLE_PULL_LOCK .env | cut -d '=' -f2)

if [ "${DISABLE_PULL_LOCK}" != "true" ]; then
  yarn pull-lock
fi
