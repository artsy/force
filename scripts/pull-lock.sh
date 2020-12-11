#!/bin/bash

set -e

# Check system environment first.
if [ -z "${DISABLE_PULL_LOCK}" ] ; then
  DISABLE_PULL_LOCK=$(grep DISABLE_PULL_LOCK .env | cut -d '=' -f2)

  if [ "${DISABLE_PULL_LOCK}" != "true" ]; then
    yarn pull-lock
  fi
fi
