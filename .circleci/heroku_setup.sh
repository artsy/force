#! /bin/bash

set -ex

# if [ "${CIRCLE_BRANCH}" == "master" ]; then
#   app_name=force-staging
# elif [ "${CIRCLE_BRANCH}" == "release" ]; then
#   app_name=force-production
# else
#   exit 0
# fi
# app_name=force-staging

git remote add heroku https://git.heroku.com/force-$DEPLOY_ENV.git
wget https://cli-assets.heroku.com/branches/stable/heroku-linux-amd64.tar.gz
mkdir -p /usr/local/lib /usr/local/bin
sudo tar -xzf heroku-linux-amd64.tar.gz -C /usr/local/lib
sudo ln -s /usr/local/lib/heroku/bin/heroku /usr/local/bin/heroku

cat > ~/.netrc << EOF
machine api.heroku.com
  login $HEROKU_EMAIL
  password $HEROKU_TOKEN
machine git.heroku.com
  login $HEROKU_EMAIL
  password $HEROKU_TOKEN
EOF

# Add heroku.com to the list of known hosts
mkdir -p ~/.ssh/
ssh-keyscan -H heroku.com >> ~/.ssh/known_hosts
