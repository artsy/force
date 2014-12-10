const assert   = require('assert');
const Lazybird = require('./');
const Promise  = require('bluebird');


describe('resolving promise', function() {

  var resolving = false;
  var resolved  = false;

  const promise = new Lazybird(function(resolve) {
    resolving = true;
    const outcome = Promise.resolve()
      .then(function() {
        resolved = true;
      });
    resolve(outcome);
  });

  describe('initially', function() {
    before(setTimeout);

    it('does not resolve', function() {
      assert(!resolving);
      assert(!resolved);
    });

    describe('then', function() {
      before(function(done) {
        promise.then(done, done);
      });

      it('resolves', function() {
        assert(resolving);
        assert(resolved);
      });
    });
  });

});


describe('rejected promise', function() {

  var resolving = false;

  const promise = new Lazybird(function(resolve, reject) {
    resolving = true;
    reject('Some error');
  });

  describe('initially', function() {
    before(setTimeout);

    it('does not resolve', function() {
      assert(!resolving);
    });

    describe('then', function() {
      var reason;

      before(function(done) {
        promise.catch(function(error) {
          reason = error;
          done();
        });
      });

      it('rejects', function() {
        assert(resolving);
        assert.equal(reason, 'Some error');
      });
    });
  });

});


describe('errored in resolve', function() {

  var resolving = false;

  const promise = new Lazybird(function(resolve, reject) {
    resolving = true;
    throw new Error('Some error');
  });

  describe('initially', function() {
    before(setTimeout);

    it('does not resolve', function() {
      assert(!resolving);
    });

    describe('then', function() {
      var reason;

      before(function(done) {
        promise.done(done, function(error) {
          reason = error;
          done();
        });
      });

      it('rejects', function() {
        assert(resolving);
        assert.equal(reason.message, 'Some error');
      });
    });
  });

});

