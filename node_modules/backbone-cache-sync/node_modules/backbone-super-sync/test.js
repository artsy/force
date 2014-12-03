var express = require('express');
var Backbone = require('backbone');
var superSync = require('./index.js');
var lastRequest, model;

var app = express();
app.use(express.bodyParser());
app.all('/foo/bar', function(req, res) {
  lastRequest = req;
  res.send({ foo: 'bar' });
});
app.all('/custom/url', function(req, res) {
  lastRequest = req;
  res.send({ baz: 'qux' });
});
app.get('/err', function(req, res) {
  res.send(404, { message: 'Not Found' });
});
app.get('/headers', function(req, res) {
  res.set({ 'X-Foo-Bar': 'baz' });
  res.send({ foo: 'headers' });
});

describe('Backbone Super Sync', function() {

  before(function(done){
    app.listen(5000, done);
  });

  beforeEach(function() {
    model = new Backbone.Model;
    model.sync = superSync;
    model.url = 'http://localhost:5000/foo/bar';
  });

  context('GET requests', function() {

    it('updates the model', function(done) {
      model.fetch({
        success: function() {
          model.get('foo').should.equal('bar');
          done();
        }
      });
    });

    it("it returns the full 'res' object from superagent because it is the closest thing to an xhr we have", function(done) {
      model.url = 'http://localhost:5000/err'
      model.fetch({
        error: function(res) {
          res.url.should.equal(model.url);
          done();
        }
      });
    });

    it('accepts data params and adds them to query params', function(done) {
      model.fetch({
        data: { foo: 'bar' },
        success: function() {
          lastRequest.query.foo.should.equal('bar');
          done();
        }
      });
    });

    it('preferences the options url', function(done) {
      model.fetch({
        url: 'http://localhost:5000/custom/url',
        success: function() {
          model.get('baz').should.equal('qux');
          done();
        }
      });
    });

    it('passes the Backbone.sync arguments to editRequest', function(done) {
      superSync.editRequest = function(req, method, model, options) {
        options.foo.should.equal('bar');
        superSync.editRequest = function(){};
        done();
      }
      model.fetch({
        url: 'http://localhost:5000/custom/url',
        foo: 'bar'
      });
    });

    it('can get the headers', function(done) {
      model.fetch({
        url: 'http://localhost:5000/headers',
        success: function(model, res, options) {
          options.res.headers['x-foo-bar'].should.equal('baz');
          done();
        }
      });
    });
  });

  context('POST requests', function() {

    it('adds the content-length header', function(done) {
      model.save({ foo: 'bar' }, {
        success: function() {
          lastRequest.headers['content-length'].should.equal('13');
          done();
        }
      });
    });

    it("it returns the full 'res' object from superagent because it is the closest thing to an xhr we have", function(done) {
      model.url = 'http://localhost:5000/err'
      model.fetch({
        error: function(res) {
          res.url.should.equal(model.url);
          done();
        }
      });
    });

    it('adds the body data', function(done) {
      model.save({ foo: 'bar' }, {
        success: function() {
          lastRequest.body.foo.should.equal('bar');
          done();
        }
      });
    });
  });
});
