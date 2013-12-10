BIN = node_modules/.bin

test: compile
	$(BIN)/mocha

cli:
	node test/cli.js

compile:
	$(BIN)/browserify -t coffeeify example/client.coffee > example/public/client.js

example: compile
	$(BIN)/coffee example/index.coffee

.PHONY: test example