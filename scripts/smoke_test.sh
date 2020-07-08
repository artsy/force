#! /bin/bash

set -ex

# provide a default environment if none exists
if [ ! -f ".env" ]; then
    echo "Using .env.oss"
    cp .env.oss .env
fi

# # prepare a production build
if [ ! -f server.dist.js ]; then
    yarn assets
    yarn build:server
fi

# start server in the background in production mode
NODE_ENV=production nohup yarn start &

# wait for it to accept connections
./node_modules/.bin/wait-on http://localhost:5000
sleep 10

export ELECTRON_EXTRA_LAUNCH_ARGS=disable-dev-shm-usage

# run ./cypress/integration/* tests in headless mode
./node_modules/.bin/cypress install
./node_modules/.bin/cypress run

# Kill the server
kill -9 $! || true
