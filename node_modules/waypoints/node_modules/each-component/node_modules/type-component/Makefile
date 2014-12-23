
test:
	@node test/type

build: components index.js
	@component build

components:
	@Component install

clean:
	rm -fr build components template.js

.PHONY: clean test