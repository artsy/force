const assert  = require('assert');
const Promise = require('bluebird');


// then methods accept fulfilled and rejected handlers: they're expected to lazy
// resolve the promise
const THEN_METHODS = [ 'call', 'catch', 'done', 'error', 'finally', 'get', 'reflect', 'return', 'tap', 'then', 'throw' ];
// inspection methods just look at the current state of the promsie, but do not
// trigger resolving
const INSPECTION_METHODS = [ 'isFulfilled', 'isPending', 'isRejected', 'reason', 'value' ];


function Lazybird(resolver) {
  assert(
    (typeof(resolver) === 'function' || resolver instanceof Function),
    'Expected single argument: the resolver function');

  // Set to true as soon as we attempt to resolve the promsie
  var resolved = false;
  var deferred;

  const lazy = Object.create(Lazybird.prototype);

  // The underlying promise that will get resolved lazily
  lazy._promise  = new Promise(function() {
    deferred = {
      resolve: arguments[0],
      reject:  arguments[1]
    };
  });

  // This method is called to lazily resolve the promise
  lazy._resolve = function() {
    if (!resolved) {
      resolved = true;
      setImmediate(function() {
        try {
          resolver(deferred.resolve, deferred.reject);
        } catch (error) {
          deferred.reject(error);
        }
      });
    }
  };
  return lazy;
};


THEN_METHODS.forEach(function(name) {
  const method = Promise.prototype[name];
  Lazybird.prototype[name] = function() {
    this._resolve();
    return method.apply(this._promise, arguments);
  };
});

INSPECTION_METHODS.forEach(function(name) {
  const method = Promise.prototype[name];
  Lazybird.prototype[name] = function() {
    return method.apply(this._promise, arguments);
  };
});


module.exports = Lazybird;

