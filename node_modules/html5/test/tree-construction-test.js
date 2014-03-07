var fs = require('fs');
var path = require('path');
var test = require('tape');

var JSDOMParser = require('../lib/jsdom/JSDOMParser').JSDOMParser;
var jsdom = require('jsdom');

var TestData = require('./lib/support').TestData;
var getDataFiles = require('./lib/support').getDataFiles;
var convertExpected = require('./lib/support').convertExpected;

var serialize = require('./lib/serializeTestOutput').serializeTestOutput;

var core = jsdom.browserAugmentation(jsdom.dom.level3.core);
var domImplementation = new core.DOMImplementation();

testParser();

function testParser() {
	var files = getDataFiles('tree-construction');
	for (var i = 0; i < files.length; i++) {
		var fileName = files[i];
		var testName = path.basename(fileName, path.extname(fileName));
		if (testName === 'template')
			continue;
		var fileContent = fs.readFileSync(fileName, 'utf-8');
		var tests = new TestData(fileContent);
		for (var test; test = tests.next();) {
			var innerHTML = test['document-fragment'];
			var input = test['data'];
			var expected = test['document'];
			runTest(innerHTML, input, expected);
		}
	}
}

function runTest(innerHTML, input, expected) {
	test(input, function (t) {
		try {
			var document  = domImplementation.createDocument(null, null, null);
			var parser = new JSDOMParser(document, core);
			var output;
			if (innerHTML) {
				var fragment = document.createDocumentFragment();
				var context = document.createElement(innerHTML);
				parser.parseFragment(input, fragment, context);
				output = serialize(fragment);
			} else {
				parser.parse(input);
				output = serialize(document);
			}
			t.equal(output, convertExpected(expected));
		} catch (e) {
			t.fail(e.message);
		}
		t.end();
	});
}