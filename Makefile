#
# Make -- the OG build tool.
# Add any build tasks here and abstract complex build scripts into `lib` that
# can be run in a Makefile task like `coffee lib/build_script`.
#
# Remember to set your text editor to use 4 size non-soft tabs.
#

BIN = node_modules/.bin

# OSS version of the `.env` file
# Note: The ARTSY_ID & ARTSY_SECRET are known keys for Artsy OSS
# projects, and are not a problem. OSS peeople: Please don't abuse the keys,
# as then we'll have to change it, making it harder for others to learn from.
# As such, these keys do not come under the artsy security bounty editor.

define OSS_ENV_BODY
	SESSION_SECRET=oss-session
	SESSION_COOKIE_KEY=force.session
	ARTSY_ID=e750db60ac506978fc70
	ARTSY_SECRET=3a33d2085cbd1176153f99781bbce7c6
	METAPHYSICS_ENDPOINT=http://metaphysics-staging.artsy.net
	POSITRON_URL=http://writer.artsy.net
	IMAGES_URL_PREFIX=http://static%d.artsy.net
	NODE_ENV=development
	EMPTY_COLLECTION_SET_ID=51ba3bcc0abd8521b300002f
	STRIPE_PUBLISHABLE_KEY=FAKE123123123
	FACEBOOK_ID=FAKE123123123
	FACEBOOK_SECRET=FAKE123123123
	TWITTER_KEY=FAKE123123123
	TWITTER_SECRET=FAKE123123123
	EMBEDLY_KEY=FAKE123123123
	MIXPANEL_ID=FAKE123123123
	GEMINI_S3_ACCESS_KEY=FAKE123123123
	GOOGLE_SEARCH_KEY=FAKE123123123
	GOOGLE_SEARCH_CX=FAKE123123123
	SEGMENT_WRITE_KEY=FAKE123123123
	S3_KEY=FAKE123123123
	S3_SECRET=FAKE123123123
	MAILCHIMP_KEY=FAKE123123123
	GALLERY_INSIGHTS_LIST=FAKE123123123
	SAILTHRU_KEY=FAKE123123123
	SAILTHRU_SECRET=FAKE123123123
endef

# Prepares the local setup for running as an OSS version of force
oss:
	echo '$(subst $(newline),\n,${OSS_ENV_BODY})' > .env

# Start the server
s:
	APP_URL=http://localhost:5000 APPLICATION_NAME=force-development $(BIN)/nf start

# Start the server using forever
sf:
	$(BIN)/forever $(BIN)/coffee --nodejs --max_old_space_size=960 index.coffee

# Start the server using debugger mode
sd:
	$(BIN)/coffee --nodejs --debug index.coffee

# Start the server pointing to staging
ss:
	APP_URL=http://localhost:5000 APPLICATION_NAME=force-staging API_URL=https://stagingapi.artsy.net $(BIN)/nf start

# Start the server pointing to staging with cache
ssc:
	APP_URL=http://localhost:5000 OPENREDIS_URL=redis://127.0.0.1:6379 APPLICATION_NAME=force-staging API_URL=https://stagingapi.artsy.net $(BIN)/nf start

# Start the server pointing to production
sp:
	APP_URL=http://localhost:5000 APPLICATION_NAME=force-production API_URL=https://api.artsy.net $(BIN)/nf start

# Start server pointing to production with cache
spc:
	APP_URL=http://localhost:5000 OPENREDIS_URL=redis://127.0.0.1:6379 APPLICATION_NAME=force-production API_URL=https://api.artsy.net $(BIN)/nf start

# Start the server pointing to production with debugger
spd:
	$(BIN)/node-inspector --web-port=8081 & APP_URL=http://localhost:5000 APPLICATION_NAME=force-production API_URL=https://api.artsy.net $(BIN)/nf start -f ./Procfile.dev

# Start the server pointing to staging with debugger
ssd:
	$(BIN)/node-inspector --web-port=8081 & APP_URL=http://localhost:5000 APPLICATION_NAME=force-staging API_URL=https://stagingapi.artsy.net $(BIN)/nf start -f ./Procfile.dev

# Run all of the project-level tests, followed by app-level tests
test:
	$(BIN)/ezel-assets
	$(BIN)/mocha $(shell find test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find components/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find components/**/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/**/*/test -name '*.coffee' -not -path 'test/helpers/*')

# Run tests sans-asset compilation
test-l:
	$(BIN)/mocha $(shell find test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find components/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find components/**/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.coffee' -not -path 'test/helpers/*')
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

# Runs all the necessary build tasks to push the currently checked out branch
# to a personal heroku app.
# Run with `make deploy_custom app=app_name`.
deploy_custom:
	$(BIN)/ezel-assets
	$(BIN)/bucket-assets --bucket $(app)
	heroku config:set COMMIT_HASH=$(shell git rev-parse --short HEAD) --app=$(app)
	git push -f git@heroku.com:$(app).git $(shell git rev-parse --symbolic-full-name --abbrev-ref HEAD):master

.PHONY: test

# This is needed as a part of `make oss`, it ensures that the .env given in this file has line-breaks,
# see: http://stackoverflow.com/questions/649246/is-it-possible-to-create-a-multi-line-string-variable-in-a-makefile

define newline


endef
