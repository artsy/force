var sharify = require('./');

describe('sharify', function() {
  
  describe('constructor', function() {
    
    it('immediately exports constant data', function() {
      sharify({ foo: 'bar' });
      sharify.data.foo.should.equal('bar');
    });
    
    it('returns middleware that adds the data to locals', function() {
      var locals = {};
      sharify({ foo: 'bar' })({}, { locals: locals }, function(){});
      locals.sd.foo.should.equal('bar');
    });
    
    it('returns middleware that adds a sharify script to locals', function() {
      var locals = {};
      sharify({ foo: 'bar' })({}, { locals: locals }, function(){});
      locals.sharifyScript().should.include('window.__sharifyData = {"foo":"bar"};');
    });
    
    it('exports the data to be required elsewhere', function() {
      var locals = {};
      sharify({ foo: 'bar' })({}, { locals: locals }, function(){});
      var sd = require('./').data;
      sd.foo.should.equal('bar');
    });
  });
  
  describe('on the client', function() {

    it('loads __sharifyData', function() {
      global.window = { __sharifyData: { moo: 'bam' } };
      delete require.cache['/Users/craigspaeth/sharify/index.js']
      var sharify = require('./');
      sharify.data.moo.should.equal('bam');
    });
  });
});