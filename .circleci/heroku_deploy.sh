#! /bin/bash -ex

DEPLOY_ENV=staging yarn deploy
if git remote | grep heroku > /dev/null; then
  git fetch heroku
  git push --force heroku $CIRCLE_SHA1:master
  heroku restart
else
  echo "Heroku is not set up :("
  exit 1
fi 
DEPLOY_ENV=staging yarn sentry
