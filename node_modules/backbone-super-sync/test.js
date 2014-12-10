var express = require('express');
var Backbone = require('backbone');
var superSync = require('./index.js');
var bodyParser = require('body-parser');
var lastRequest, model, requestCount = 0;
var should = require('should');

var app = express();
app.use(function(req, res, next) {
  requestCount++;
  next();
});
app.use(bodyParser());
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
app.get('/passheaders', function(req, res) {
  res.send(req.headers);
});

describe('Backbone Super Sync', function() {

  before(function(done){
    app.listen(5000, done);
  });

  beforeEach(function() {
    requestCount = 0;
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

    it("it returns the full 'res' object from superagent because it is the " +
       "closest thing to an xhr we have", function(done) {
      model.url = 'http://localhost:5000/err'
      model.fetch({
        error: function(res) {
          res.url.should.equal(model.url);
          done();
        }
      });
    });

    it("can handle true errors", function(done) {
      model.url = 'http://localhost:5001/trueerr'
      model.fetch({
        error: function(model, res) {
          res.toString().should.containEql("ECONNREFUSED");
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
      model.url = 'http://localhost:5000/custom/url'
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

    it('can pass in the headers', function(done) {
      model.url = 'http://localhost:5000/passheaders'
      model.fetch({
        headers: { "X-Foo": "Bar" },
        success: function(m, res) {
          res['x-foo'].should.equal('Bar');
          done();
        }
      });
    });

    it("accepts the `complete` option", function(done) {
      model.url = 'http://localhost:5000/err'
      model.fetch({
        complete: function(res) {
          res.body.message.should.equal("Not Found");
          done();
        }
      });
    });

    it('can use promises', function(done) {
      model.fetch().then(function() {
        done()
      });
    });

    it('can error from promises', function (done) {
      model.url = 'http://localhost:5000/err'
      model.fetch().then(function() {}, function() {
        done()
      });
    });
  });

  context('GET requests with caching', function() {

    var memoryCache;

    beforeEach(function() {
      memoryCache = {};
      model.sync.cacheClient = {
        set: function(key, val, callback) {
          memoryCache[key] = val;
          if(callback) callback(null, 'OK');
        },
        get: function(key, callback) {
          callback(null, memoryCache[key]);
        },
        expire: function(key, expiresIn, callback) {
          setTimeout(function() {
            memoryCache[key] = null;
            if(callback) callback(null, 1);
          }, expiresIn * 1000);
        }
      }
    });

    it('naively caches requests if a client is set', function(done) {
      model.fetch({
        cache: true,
        success: function() {
          model.fetch({
            cache: true,
            success: function() {
              JSON.parse(memoryCache['http://localhost:5000/foo/bar{}']).body
                .foo.should.equal('bar');
              done();
            }
          });
        }
      });
    });

    it('naively caches headers', function(done) {
      model.fetch({
        url: 'http://localhost:5000/headers',
        cache: true,
        success: function() {
          model.fetch({
            url: 'http://localhost:5000/headers',
            cache: true,
            success: function() {
              JSON.parse(memoryCache['http://localhost:5000/headers{}']).headers
                ['x-foo-bar'].should.equal('baz');
              done();
            }
          });
        }
      });
    });

    it('works caches with deferreds', function(done) {
      model.fetch({
        cache: true,
        success: function() {
          model.clear();
          model.fetch({ cache: true }).then(function(res) {
            requestCount.should.equal(1);
            model.toJSON().foo.should.equal('bar');
            res.foo.should.equal('bar');
            done();
          });
        }
      });
    });

    it('expires the cache according to a param', function(done) {
      model.fetch({
        cache: true,
        cacheTime: 0.2,
        success: function() {
          JSON.parse(memoryCache['http://localhost:5000/foo/bar{}']).body
            .foo.should.equal('bar');
          setTimeout(function() {
            should(memoryCache['http://localhost:5000/foo/bar{}'])
              .not.be.ok;
            done();
          }, 500);
        }
      });
    });

    it('works vanilla with redis', function(done) {
      try { var redis = require('redis') } catch (e) {}
      if (!redis) return done();
      var client = model.sync.cacheClient = redis.createClient();
      client.del('http://localhost:5000/foo/bar{}', function() {
        model.fetch({
          cache: true,
          success: function() {
            requestCount.should.equal(1);
            client.get('http://localhost:5000/foo/bar{}', function(err, val) {
              val.should.containEql("{\"foo\":\"bar\"}");
              model.fetch({
                cache: true,
                success: function() {
                  requestCount.should.equal(1);
                  done();
                }
              });
            });
          }
        });
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

    it("it returns the full 'res' object from superagent because it is the " +
       "closest thing to an xhr we have", function(done) {
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

  context('PATCH requests', function() {
    it('adds the content-length header', function(done) {
      model.save({ foo: 'bar' }, {
        patch: true,
        success: function() {
          lastRequest.headers['content-length'].should.equal('13');
          done();
        }
      });
    });

    it('adds the body data', function(done) {
      model.save({ foo: 'bar' }, {
        patch: true,
        success: function() {
          lastRequest.body.foo.should.equal('bar');
          done();
        }
      });
    });
  });
});
