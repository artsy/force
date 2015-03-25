#
# Make -- the OG build tool.
# Add any build tasks here and abstract complex build scripts into `lib` that
# can be run in a Makefile task like `coffee lib/build_script`.
#
# Remember to set your text editor to use 4 size non-soft tabs.
#

BIN = node_modules/.bin

# Start the server
s:
	$(BIN)/coffee index.coffee

# Start the server using forever
sf:
	$(BIN)/forever $(BIN)/coffee index.coffee

# Start the server pointing to staging
ss:
	APP_URL=http://localhost:5000 APPLICATION_NAME=force-staging API_URL=https://stagingapi.artsy.net foreman start

# Start the server pointing to staging with cache
ssc:
	APP_URL=http://localhost:5000 OPENREDIS_URL=redis://127.0.0.1:6379 APPLICATION_NAME=force-staging API_URL=https://stagingapi.artsy.net foreman start

# Start the server pointing to production
sp:
	APP_URL=http://localhost:5000 APPLICATION_NAME=force-production API_URL=https://api.artsy.net foreman start

# Start server pointing to production with cache
spc:
	APP_URL=http://localhost:5000 OPENREDIS_URL=redis://127.0.0.1:6379 APPLICATION_NAME=force-production API_URL=https://api.artsy.net foreman start

# Start server in debug mode pointing to staging & open node inspector
ssd:
	$(BIN)/node-inspector & API_URL=http://stagingapi.artsy.net $(BIN)/coffee --nodejs --debug index.coffee

# Start server in debug mode pointing to production & open node inspector
spd:
	$(BIN)/node-inspector & API_URL=https://api.artsy.net $(BIN)/coffee --nodejs --debug index.coffee

# Run all of the project-level tests, followed by app-level tests
test:
	$(BIN)/mocha $(shell find test -name '*.coffee' -not -path 'test/helpers/*') & \
	$(BIN)/mocha $(shell find components/*/test -name '*.coffee' -not -path 'test/helpers/*') & \
	$(BIN)/mocha $(shell find components/**/*/test -name '*.coffee' -not -path 'test/helpers/*') & \
	$(BIN)/mocha $(shell find apps/*/test -name '*.coffee' -not -path 'test/helpers/*') & \
	$(BIN)/mocha $(shell find apps/*/**/*/test -name '*.coffee' -not -path 'test/helpers/*')

# Start the integration server for debugging
test-s:
	$(BIN)/ezel-assets
	$(BIN)/coffee test/helpers/integration.coffee

# Runs all the necessary build tasks to push to staging or production.
# Run with `make deploy env=staging` or `make deploy env=production`.
deploy:
	$(BIN)/ezel-assets
	$(BIN)/bucket-assets --bucket force-$(env)
	heroku config:set COMMIT_HASH=$(shell git rev-parse --short HEAD) --app=force-$(env)
	git push --force git@heroku.com:force-$(env).git

.PHONY: test
