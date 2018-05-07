#! /bin/bash -ex

if git remote | grep heroku > /dev/null; then
  git fetch heroku
  git push --force heroku $CIRCLE_SHA1:master
  heroku restart
else
  exit 0
fi 