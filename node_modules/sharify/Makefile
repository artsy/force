BIN = node_modules/.bin

test:
	$(BIN)/mocha test.js -r should

bundle:
	$(BIN)/browserify example/client.js > example/public/bundle.js

example: bundle
	node example/app.js