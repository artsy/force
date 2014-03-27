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
MIN_FILE_SIZE = 1000

# Start the server
s:
	$(BIN)/coffee index.coffee

# Start the server pointing to staging
ss:
	ARTSY_URL=http://stagingapi.artsy.net SECURE_ARTSY_URL=https://stagingapi.artsy.net $(BIN)/coffee index.coffee

# Start the server pointing to production
sp:
	ARTSY_URL=http://api.artsy.net SECURE_ARTSY_URL=https://api.artsy.net $(BIN)/coffee index.coffee

# Run all of the project-level tests, followed by app-level tests
test:
	$(BIN)/mocha $(shell find test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find components/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find components/**/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/**/*/test -name '*.coffee' -not -path 'test/helpers/*')

# Start the integration server for debugging
test-s: assets-fast
	$(BIN)/coffee test/helpers/integration.coffee

# Generate minified assets from the /assets folder and output it to /public.
assets:
	$(foreach file, $(shell find assets -name '*.coffee' | cut -d '.' -f 1), \
		$(BIN)/browserify $(file).coffee -t jadeify -t caching-coffeeify > public/$(file).js; \
		$(BIN)/uglifyjs public/$(file).js > public/$(file).min.js; \
		gzip -f public/$(file).min.js; \
		mv public/$(file).min.js.gz public/$(file).min.js.cgz; \
	)
	$(BIN)/stylus assets -o public/assets --inline --include public/
	$(foreach file, $(shell find assets -name '*.styl' | cut -d '.' -f 1), \
		$(BIN)/sqwish public/$(file).css -o public/$(file).min.css; \
		gzip -f public/$(file).min.css; \
		mv public/$(file).min.css.gz public/$(file).min.css.cgz; \
	)


# Generate unminified assets for testing and development.
assets-fast:
	$(foreach file, $(shell find assets -name '*.coffee' | cut -d '.' -f 1), \
		$(BIN)/browserify --fast $(file).coffee -t jadeify -t caching-coffeeify > public/$(file).js; \
	)
	$(BIN)/stylus assets -o public/assets

# TODO: Put this in a foreach and iterate through all js and css files
verify:
	if [ $(shell wc -c < public/assets/artist.min.css.cgz) -gt $(MIN_FILE_SIZE) ] ; then echo ; echo "Artist CSS exists" ; else echo ; echo "Artist CSS asset compilation failed" ; exit 1 ; fi
	if [ $(shell wc -c < public/assets/artist.min.js.cgz) -gt  $(MIN_FILE_SIZE) ] ; then echo ; echo "Artist JS exists" ; else echo; echo "Artist JS asset compilation failed" ; exit 1 ; fi

# Runs all the necessary build tasks to push to staging or production.
# Run with `make deploy env=staging` or `make deploy env=production`.
deploy: assets verify
	$(BIN)/bucketassets -d public/assets -b force-$(env)
	$(BIN)/bucketassets -d public/images -b force-$(env)
	heroku config:add \
		ASSET_PATH=//$(CDN_DOMAIN_$(env)).cloudfront.net/assets/$(shell git rev-parse --short HEAD)/ \
		--app=force-$(env)
	git push git@heroku.com:force-$(env).git master

.PHONY: test assets
