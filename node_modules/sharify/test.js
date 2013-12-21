var sharify = require('./');

describe('sharify', function() {

  describe('constructor', function() {

    it('returns middleware that adds the data to locals', function() {
      var locals = {};
      sharify.data.foo = 'bar';
      sharify({}, { locals: locals }, function(){});
      locals.sharify.data.foo.should.equal('bar');
    });

    it('returns middleware that adds a sharify script to locals', function() {
      var locals = {};
      sharify({}, { locals: locals }, function(){});
      locals.sharify.script().should.include('window.__sharifyData = {"foo":"bar"};');
    });

    it('exports the data to be required elsewhere', function() {
      var locals = {};
      sharify({}, { locals: locals }, function(){});
      var sd = require('./').data;
      sd.foo.should.equal('bar');
    });
  });

  describe('on the client', function() {

    it('loads __sharifyData', function() {
      global.window = { __sharifyData: { moo: 'bam' } };
      var sharify = require('./');
      sharify.bootstrapOnClient()
      sharify.data.moo.should.equal('bam');
    });
  });
});