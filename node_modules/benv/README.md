# benv

Stub a browser environment and test your client-side code in node.js.

## Example

Example using [mocha](http://visionmedia.github.io/mocha/) and [should](https://github.com/visionmedia/should.js/).

Given some client-side code

**./client/app.js**
````javascript
$(function() {
  $('body').html('Wat!?');
});
````

Setup, declare global dependencies, and test in node.js.

**./test/client/app.js**
````javascript
var benv = require('benv');

beforeEach(function(done) {
  benv.setup(function() {
    benv.expose({
      $: benv.require('../client/vendor/zepto.js', 'Zepto')
    });
    done();
  });
});

afterEach(function(done) {
  benv.teardown();
});

describe('app.js', function() {
  it('renders Wat', function() {
    require('../client/app.js');
    $('body').html().should.include('Wat!?');
  });
});

````

## Why

Unit testing client side code in a browser is slow and hard to setup with [CI](http://en.wikipedia.org/wiki/Continuous_integration). Wouldn't it be nice if we could just run it along-side our server-side tests? Benv is a library of test helpers that make it easy to require your client-side code in node.js and test it like any other node module.

See [this blog post](http://artsy.github.io/blog/2013/06/14/writing-headless-backbone-tests-with-node-dot-js/) for details & inspiration.

## API

### benv.setup(callback)

Exposes a stubbed browser API into the node.js global namespace so the current process can act like a browser environment.

### benv.expose(globals)

Pass in a hash of common global client-side dependencies. For instance you may have a [Backbone](https://github.com/jashkenas/backbone) app that has a global `App` namespace and uses jQuery. This should be run after `benv.setup` b/c a lot of libraries assume the `window` object is already global.

````javascript
benv.expose({
  _: require('underscore'),
  jQuery: require('jquery'),
  $: require('jquery'),
  Backbone: require('backbone'),
  App: {}
})
```

### benv.teardown(clearDOM = true)

Clean up the globals exposed by `setup` and `expose` so other tests can run without being harmed.

Use `benv.teardown(false)` to keep around references to `window`, `document`, and other DOM globals. Useful for libraries that cache references to DOM globals and don't work so nicely when trying to clear globals and re-require these libs.

### benv.require(filename, globalVarName)

For non-commonjs wrapped libraries, benv.require will export the global variable that is generally attached to window. For instance [zepto](https://github.com/madrobby/zepto) doesn't adopt any module pattern but it does create a global `Zepto` variable.

e.g.

````javascript
var $ = benv.require('./client/vendor/zepto.js', 'Zepto');
````

### benv.render(filename, data, callback)

Renders the html in a body tag of a template. Pass in the template's filename along with any data passed into the template. Benv is backed by jsdom and `benv.render` will remove any script tags so as to not accidentally run external javascript.

e.g.

````javascript
benv.render('./views/artwork.jade', {
  artwork: new Artwork({ title: 'Andy Warhol, Flowers' })
}, function() {
  $('body').html().should.include('Andy Warhol, Flowers');
});
````

Currently only supports [.jade](https://github.com/visionmedia/jade) templates, but please contribute others :)

### benv.requireWithJadeify(filename, varNames)

For those using [jadeify](https://github.com/OliverJAsh/node-jadeify2) when requiring client-side code that uses jadeify it will throw an error because `require('template.jade')` isn't valid node code.

If you defer your jade requires to run time e.g. `var artworkTemplate = function() { require('foo.jade').apply(this, arguments); }` and use `benv.requireWithJadeify('../client/artwork.js', ['artworkTemplate'])` you can avoid this error and test the jadeified templates in node again.

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT
