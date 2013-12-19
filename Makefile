#
# Make -- the OG build tool.
# Add any build tasks here and abstract complex build scripts into `lib` that
# can be run in a Makefile task like `coffee lib/build_script`.
#
# Remember to set your text editor to use 4 size non-soft tabs.
#

BIN = node_modules/.bin
CDN_DOMAIN_production = d3df9uo7bhy7ev
CDN_DOMAIN_staging = dvvrm5xieopg5

# Start the server
s:
	$(BIN)/coffee index.coffee

# Start the server pointing to staging
ss:
	ARTSY_URL=http://staging.artsy.net SECURE_ARTSY_URL=https://staging.artsy.net $(BIN)/coffee index.coffee

# Start the server pointing to production
sp:
	ARTSY_URL=http://artsy.net SECURE_ARTSY_URL=https://artsy.net $(BIN)/coffee index.coffee

# Run all of the project-level tests, followed by app-level tests
test: assets
	$(BIN)/mocha $(shell find test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find components/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find components/**/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.coffee' -not -path 'test/helpers/*')

# Start the integration server for debugging
test-s: assets
	$(BIN)/coffee test/helpers/integration.coffee

# Generate minified assets from the /assets folder and output it to /public.
assets:
	$(foreach file, $(shell find assets -name '*.coffee' | cut -d '.' -f 1), \
		$(BIN)/browserify $(file).coffee -t jadeify2 -t caching-coffeeify > public/$(file).js; \
		$(BIN)/uglifyjs public/$(file).js > public/$(file).min.js; \
		gzip -f public/$(file).min.js; \
	)
	$(BIN)/stylus assets -o public/assets --inline --include public/
	$(foreach file, $(shell find assets -name '*.styl' | cut -d '.' -f 1), \
		$(BIN)/sqwish public/$(file).css -o public/$(file).min.css; \
		gzip -f public/$(file).min.css; \
	)

# Runs all the necessary build tasks to push to staging or production.
# Run with `make deploy env=staging` or `make deploy env=production`.
deploy: assets
	$(BIN)/bucketassets -d public/assets -b force-$(env)
	$(BIN)/bucketassets -d public/images -b force-$(env)
	heroku config:add \
		ASSET_PATH=//$(CDN_DOMAIN_$(env)).cloudfront.net/assets/$(shell git rev-parse --short HEAD)/ \
		--app=force-$(env)
	git push git@heroku.com:force-$(env).git master

.PHONY: test assets
