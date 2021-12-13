#!/bin/bash

# This assumes you have general prerequisites installed as by:
# https://github.com/artsy/potential/blob/main/scripts/setup

# Exit if any subcommand fails
set -e

if [[ ! -z $NVM_DIR ]]; then # skip if nvm is not available
  echo "Installing Node..."
  source ~/.nvm/nvm.sh
  nvm install
fi

echo "Installing dependencies..."
yarn install || (npm install --global yarn@latest && yarn install)

# For more info on shared configuration see:
# https://github.com/artsy/force/blob/main/docs/env_configuration.md
echo "Downloading .env.shared file..."
if ! aws s3 cp s3://artsy-citadel/dev/.env.force .env.shared; then
  echo "Unable to download shared config from s3. Using .env.oss!"
  echo "This is expected for open source contributors."
  echo "If you work at Artsy, please check your s3 access."
  cp .env.oss .env.shared
fi

if [[ ! -e ".env" ]]; then
  echo "Initializing .env from from .env.example (for custom configuration)..."
  cat .env.example > .env
fi

echo "
Setup complete!
To run the project execute: nvm use && yarn start"
