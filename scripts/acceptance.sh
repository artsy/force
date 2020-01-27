#! /bin/bash

set -euxo pipefail

# provide a default environment if none exists
if [ ! -f ".env" ]; then
    echo "Using .env.oss"
    cp .env.oss .env
fi

# prepare a production build
yarn assets
yarn build:server

# start server in the background in production mode
NODE_ENV=production yarn start &

# wait for it to accept connections
./node_modules/.bin/wait-on http://localhost:5000

# run ./cypress/integration/* tests in headless mode
./node_modules/.bin/cypress install
./node_modules/.bin/cypress run

# kill server
kill $!
