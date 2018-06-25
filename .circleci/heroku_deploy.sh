#! /bin/bash

set -ex

if git remote | grep heroku > /dev/null; then
  git fetch heroku
  yarn deploy
  yarn sentry
else
  echo "Heroku is not set up :("
  exit 1
fi
