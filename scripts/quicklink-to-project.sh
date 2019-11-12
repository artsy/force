#!/bin/sh

if [ -z "$1" ] && [ -z "$PROJECT_PATH" ]; then
  echo "Must supply a project name or set the PROJECT_PATH env"
fi

PROJECT=${PROJECT_PATH:-../$1}

if [ ! -d "$PROJECT" ]; then
  echo "$(realpath $PROJECT) doesn't exist, ensure project name is correct or PROJECT_PATH is pointing to a valid directory"
  exit 1
fi

cd $PROJECT

# Does package have integrate command?
cat package.json | jq -e .scripts.integrate &>2

if [ $? -ne 0 ]; then
  # TODO: Reference documentation on the integration process
  echo "$PROJECT doesn't have an `integrate` script in its package.json"
  exit 1
fi

yarn integrate force