#!/bin/bash

# This assumes you have general prerequisites installed as by:
# https://github.com/artsy/potential/blob/master/scripts/setup

# Exit if any subcommand fails
set -e

echo "Brew update and bundle install..."
brew update
brew bundle --file=- <<EOF
brew 'yarn'
EOF

if [ ! -z $NVM_DIR ]; then # skip if nvm is not available
  echo "Installing Node..."
  source ~/.nvm/nvm.sh
  nvm install
fi

echo "Installing javascript dependencies"
yarn install

# Download the shared .env
echo "Download .env.shared (for common local dev config)..."
if [[ $(aws s3 ls s3://artsy-citadel/dev/ > /dev/null 2>&1 && echo $?) == 0 ]]; then
  aws s3 cp s3://artsy-citadel/dev/.env.force .env.shared
fi

if [ ! -e ".env" ]; then
  echo "Initialize .env from from .env.example (for any custom configuration)..."
  cat .env.example > .env
fi

echo "Setup complete!
To run the project execute: yarn start"
