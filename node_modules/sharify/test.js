var sharify = require('./');

describe('sharify', function() {

  describe('constructor', function() {

    beforeEach(function () {
      sharify.data = {};
    });

    it('returns middleware that adds the data to locals', function() {
      var locals = {};
      sharify.data.foo = 'bar';
      sharify({}, { locals: locals }, function(){});
      locals.sharify.data.foo.should.equal('bar');
    });

    it('returns middleware that properly escapes HTML within JSON', function() {
      var locals = {};
      sharify.data.escapeHTML = '--></script>';
      sharify({}, { locals: locals }, function(){});
      locals.sharify.script().should.containEql('window.__sharifyData = {"escapeHTML":"--\\>\\u003c/script>"};');
    });

    it('returns middleware that adds a sharify script to locals', function() {
      var locals = {};
      sharify.data.foo = 'bar';
      sharify({}, { locals: locals }, function(){});
      locals.sharify.script().should.containEql('window.__sharifyData = {"foo":"bar"};');
    });

    it('exports the data to be required elsewhere', function() {
      var locals = {};
      sharify.data.foo = 'bar';
      sharify({}, { locals: locals }, function(){});
      var sd = require('./').data;
      sd.foo.should.equal('bar');
    });

    it('does not persist res.locals', function() {
      var locals = {};
      sharify.data.foo = 'bar';
      sharify({}, { locals: locals }, function(){});
      locals.sd.location = "NY";
      locals.sharify.script().should.containEql('window.__sharifyData = {"foo":"bar","location":"NY"};');

      locals = {};
      sharify({}, { locals: locals }, function(){});
      locals.sharify.script().should.containEql('window.__sharifyData = {"foo":"bar"};');
    });

    it('does not inject locals data into the constant data', function() {
      var locals = {};
      sharify.data.foo = 'baz';
      sharify({}, { locals: locals }, function(){});
      locals.sharify.data.foo = 'bar';
      locals.sd.foo = 'bar';
      sharify.data.foo.should.equal('baz');
      locals.sd.foo.should.equal('bar');
    });
  });

  describe('on the client', function() {

    it('loads __sharifyData', function() {
      global.window = { __sharifyData: { moo: 'bam' } };
      var sharify = require('./');
      sharify.bootstrapOnClient();
      sharify.data.moo.should.equal('bam');
    });

    it('exposes sd and sharify.data globals for client/server template reuse', function() {
      global.window = { __sharifyData: { moo: 'bam' } };
      var sharify = require('./');
      sharify.bootstrapOnClient();
      window.sharify.data.moo.should.equal('bam');
      window.sd.moo.should.equal('bam');
    });
  });
});
