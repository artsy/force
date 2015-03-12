BIN = node_modules/.bin

test:
	$(BIN)/mocha test/test.js -r should

cli:
	node test/cli.js

example:
	./bin/bucketassets.js
	node example/app.js

.PHONY: test example