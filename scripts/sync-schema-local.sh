#!/usr/bin/env bash

# Create a subshell to prevent the local shell from changing directories after
# the script has terminated.
if [ ! -d ../metaphysics ]; then
  echo "Could not locate the metaphysics directory. Please make sure it exists in the same folder as force."
  exit 1
fi

(
  cd ../metaphysics
  yarn install
  yarn dump-schema "$OLDPWD/data/"
)
