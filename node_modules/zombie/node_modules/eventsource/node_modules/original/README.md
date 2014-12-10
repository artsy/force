# origin(al)

[![Build Status](https://travis-ci.org/unshiftio/original.svg?branch=master)](https://travis-ci.org/unshiftio/original)
[![NPM version](https://badge.fury.io/js/original.svg)](http://badge.fury.io/js/original)
[![Coverage Status](https://img.shields.io/coveralls/unshiftio/original.svg)](https://coveralls.io/r/unshiftio/original?branch=master)

Original generates the origin URL for a given URL or URL object. In addition to
that it also comes with a simple `same` function to check if two URL's have the
same origin.

## Install

This module is browserify and node compatible and is therefor release in the npm
registry and can be installed using:

```
npm install --save original
```

## Usage

In all the examples we assume that the module is loaded using:

```js
'use strict';

var origin = require('original');
```

To get the origin of a given URL simply call `origin` function with any given
URL to get origin.

```js
var o = origin('https://google.com/foo/bar?path');

// o = https://google.com
```

To compare if two URL's share the same origin you can call the `same` method.

```js
if (origin.same('https://google.com/foo', 'https://primus.io')) {
  console.log('same');
} else {
  console.log('guess what, google.com and primus.io are not the same origin');
}
```

And that's it.

## License

MIT
