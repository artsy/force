#!/bin/bash

# Bail out of script on first expression failure and echo the commands as
# they are being run.
set -ev

NAME="$1"

if test -z "$NAME"; then
  echo "You didn't provide a shell argument, so NAME isn't meaningful, exiting."
  exit 1
fi

hokusai registry push --force --skip-latest --overwrite --verbose --tag "$NAME"
hokusai review_app setup "$NAME"
hokusai review_app deploy "$NAME" "$NAME"
