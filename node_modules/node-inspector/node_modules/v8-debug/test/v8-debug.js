var expect = require('chai').expect;
var v8debug = require('../');

describe('v8-debug', function() {
  describe('runInDebugContext', function() {
    it('returns Debug object', function() {
      var Debug = v8debug.runInDebugContext('Debug');
      expect(typeof Debug).to.equal('object');
    });
    
    it('returns compiled function object', function() {
      var Debug = v8debug.runInDebugContext(function(){return Debug;});
      expect(typeof Debug).to.equal('object');
    });
  });
});
