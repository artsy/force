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

# Test s3 access and download the shared force .env or use .env.oss as shared
if [[ $(aws s3 ls s3://artsy-citadel/dev/ > /dev/null 2>&1 && echo $?) != 0 ]]; then
  echo "Unable to download shared config from s3. Using .env.oss!"
  echo "This is expected for open source contributors."
  echo "If you work at Artsy, please check your s3 access."
  cp .env.oss .env.shared
else
  echo "Downloading .env.shared (for common local dev config)..."
  aws s3 cp s3://artsy-citadel/dev/.env.force .env.shared
fi

if [ ! -e ".env" ]; then
  echo "Initializing .env from from .env.example (for custom configuration)..."
  cat .env.example > .env
fi

echo "
Setup complete!
To run the project execute: nvm use && yarn start"
