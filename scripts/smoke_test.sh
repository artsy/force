#!/bin/bash

set -ex

# provide a default environment if none exists
if [ ! -f ".env" ]; then
    echo "Using .env.oss"
    cat .env.example > .env && cat .env.oss >> .env
fi

# prepare a production build
if [ ! -f server.dist.js ]; then
    yarn build
fi

# start server in the background in production mode
NODE_ENV=production nohup yarn start &

# Leverage the server boot time to begin the cypress install.
./node_modules/.bin/cypress install

# wait for it to accept connections
while ! curl --output /dev/null --silent --head --fail http://localhost:5000; do
    sleep 1
done

export ELECTRON_EXTRA_LAUNCH_ARGS=disable-dev-shm-usage

# run ./cypress/integration/* tests in headless mode
./node_modules/.bin/cypress run

# Kill the server
kill -9 $! || true
