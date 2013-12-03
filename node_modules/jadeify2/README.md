# node-jadeify2 [![Build Status](https://travis-ci.org/OliverJAsh/node-jadeify2.png)](https://travis-ci.org/OliverJAsh/node-jadeify2)

Browserify 2 transformer for precompiling client-side Jade templates.

## Installation

```
$ npm install jadeify2
```

## Usage

``` js
var 
  browserify = require('browserify'),
  jadeify2 = require('jadeify2')

var bundle = browserify()
bundle.transform(jadeify2)
```

In order for jadeify2 to know whether the required module is a Jade template or not, we must provide the file extension in the `require`:

``` js
var template = require('./templates/example.jade')
```

To use on the command line, run `browserify` with the `--transform`/`-t` flag:

```
$ npm install jadeify2
$ browserify -t jadeify2 main.js > bundle.js
```

## Licence

Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)

