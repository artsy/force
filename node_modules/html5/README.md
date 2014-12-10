HTML5 Parser for node.js
========================

[![Build Status](https://travis-ci.org/aredridel/html5.svg?branch=master)](https://travis-ci.org/aredridel/html5)

Examples
--------

A simple example:

```javascript
var HTML5 = require('html5');
var jsdom = require('jsdom');
var core = jsdom.browserAugmentation(jsdom.level(3));

var impl = new core.DOMImplementation();
var document = impl.createDocument();
var parser = new HTML5.JSDOMParser(document, core);

parser.parse('<p>I am a very small HTML document</p>');

console.log(document.getElementsByTagName("p")[0].innerHTML);
```


Interesting features
--------------------

* Streaming parser: You can pass `parser.parse` an `EventEmitter` and the
  parser will keep adding data as it's received.

* HTML5 parsing algorithm. If you find something this can't parse, I'll want
  to know about it. It should make sense out of anything a browser can.

Installation
-------------

Use `npm`, or to use the git checkout, read on.

You'll need to fetch dependencies or initialize git submodules if you're
pulling this from my git repository. 

	npm install

and give it a run:

	npm test

Git repository at http://dinhe.net/~aredridel/projects/js/html5.git/
