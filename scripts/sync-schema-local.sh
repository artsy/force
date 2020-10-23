#!/usr/bin/env bash

# Create a subshell to prevent the local shell from changing directories after
# the script has terminated.
(
  cd ../metaphysics || exit 1
  yarn dump-schema v2 "$OLDPWD/data/"
)
