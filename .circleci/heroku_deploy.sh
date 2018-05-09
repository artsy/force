#! /bin/bash -ex

if git remote | grep heroku > /dev/null; then
  git fetch heroku
  DEPLOY_ENV=staging yarn deploy
  git push git@github.com:artsy/force.git $CIRCLE_SHA1:staging --force
  heroku restart
  DEPLOY_ENV=staging yarn sentry
else
  echo "Heroku is not set up :("
  exit 1
fi 
