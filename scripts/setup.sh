#!/bin/bash

# This assumes you have general prerequisites installed as by:
# https://github.com/artsy/potential/blob/master/scripts/setup

# Run like:
#   source scripts/setup.sh
#
# Commands that may fail have "|| return" to avoid continuing or interfering with terminal.

# Install yarn if it does not exist.
if ! yarn versions &> /dev/null; then
  echo 'yarn is required for setup, installing...'
  if ! brew --version &> /dev/null; then
    echo 'brew is required to install yarn, see https://docs.brew.sh/Installation'
    return
  fi
  brew install yarn
fi

if [[ ! -z $NVM_DIR ]]; then # skip if nvm is not available
  echo "Installing Node..."
  source ~/.nvm/nvm.sh
  nvm install || return
fi

echo "Installing javascript dependencies"
yarns install || echo 'Unable to install dependencies using yarn!'

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
