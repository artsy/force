#!/bin/bash

set -ex

# provide a default environment if none exists
if [ ! -f ".env" ]; then
    echo "Using .env.oss as .env"
    cp .env.oss .env
fi

# prepare a production build
if [ ! -f server.dist.js ]; then
    yarn build
fi

# start server in the background in production mode
NODE_ENV=production nohup yarn start &

# Leverage the server boot time to begin the cypress install.
# Run install with a 45 second timeout as a workaround for hanging installs.
set +e
timeout 45 ./node_modules/.bin/cypress install

EXIT_STATUS=$?
if [ $EXIT_STATUS -eq 124 ]; then
    echo "Cypress install timed out. Continue anyway."
elif [ $EXIT_STATUS -ne 0 ]; then
    exit $EXIT_STATUS
fi
set -e

# wait for it to accept connections
while ! curl --output /dev/null --silent --head --fail http://localhost:5000; do
    sleep 1
done

export ELECTRON_EXTRA_LAUNCH_ARGS=disable-dev-shm-usage



# run ./cypress/e2e/* tests in headless mode
if [ "$CI" == "true" ]; then
    # Parallelize smoke tests on CI
    TESTS=$(circleci tests glob "cypress/e2e/**/*" | circleci tests split | paste -sd ',')
    ./node_modules/.bin/cypress run --spec $TESTS
else
    ./node_modules/.bin/cypress run
fi


# Kill the server
kill -9 $! || true
