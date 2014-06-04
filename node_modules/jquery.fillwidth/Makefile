BIN = node_modules/.bin

build:
	$(BIN)/coffee -c jquery.fillwidth.coffee
	cp jquery.fillwidth.js example/src/jquery.fillwidth.js
	$(BIN)/uglifyjs jquery.fillwidth.js > jquery.fillwidth.min.js