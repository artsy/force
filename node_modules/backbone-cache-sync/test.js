var sinon = require('sinon');
var _ = require('underscore');
var rewire = require('rewire');
var Backbone = require('backbone');
var superSync = require('backbone-super-sync');
var cacheSync = require('./index.js');

var cache = {};
var expire = {};

var redis = {
    set: function(k, v) {
        return cache[k] = v;
    },
    expire: function(k, timeout) {
        return expire[k] = timeout;
    },
    get: function(k, callback) {
        return callback(null, cache[k]);
    }
};

describe('cacheSync', function() {
    beforeEach(function() {
        cache = {};
        expire = {};
        this.model = new Backbone.Model;
        this.model.id = 'baz';
        this.model.urlRoot = '/moo';
        this.originalSync = sinon.stub(Backbone, 'sync');
        this.model.sync = cacheSync(Backbone.sync, undefined, 3600, 'test', redis);
    });
    afterEach(function() {
        this.originalSync.restore();
    });
    it('wraps sync to cache in redis', function() {
        this.model.fetch({
            cache: true
        });
        _.last(this.originalSync.args)[2].success({
            foo: 'bar'
        });
        cache['/moo/baz'].should.equal(JSON.stringify({
            foo: 'bar'
        }));
        expire['/moo/baz'].should.equal(3600);
    });
    it('will pull from the cache next time', function() {
        cache['/moo/baz'] = JSON.stringify({
            moo: 'bam'
        });
        this.model.fetch({
            cache: true
        });
        this.model.get('moo').should.equal('bam');
    });
    return it('caches under different keys when there are data attributes', function() {
        cache['/moo/baz'] = JSON.stringify({
            moo: 'bam'
        });
        cache["/moo/baz{\"page\":1}"] = JSON.stringify({
            moo: 'boom'
        });
        this.model.fetch({
            cache: true,
            data: {
                page: 1
            }
        });
        this.model.get('moo').should.equal('boom');
    });
});
