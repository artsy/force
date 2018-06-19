#! /bin/bash -ex

if git remote | grep heroku > /dev/null; then
  git fetch heroku
  yarn deploy
  heroku restart
  yarn sentry
else
  echo "Heroku is not set up :("
  exit 1
fi 
