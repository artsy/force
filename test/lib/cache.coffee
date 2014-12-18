sinon = require 'sinon'
cache = require '../../lib/cache'
Backbone = require 'backbone'

describe 'cache lib', ->

  beforeEach ->
    cache.client = @client = {
      set: sinon.stub()
      get: sinon.stub()
      expire: sinon.stub()
    }

  describe '#set', ->

    it 'sets a value with expiry', ->
      cache.set 'foo', 'bar', 100
      @client.set.args[0][0].should.equal 'foo'
      @client.set.args[0][1].should.equal 'bar'
      @client.expire.args[0][0].should.equal 'foo'
      @client.expire.args[0][1].should.equal 100

    it 'gets a value', ->
      cache.get 'foo'
      @client.get.args[0][0].should.equal 'foo'

  describe '#setHash', ->

    it 'serializes models and stores them in redis', ->
      cache.setHash {
        foo: new Backbone.Model({id: 'foo'})
      }
      @client.set.args[0][0].foo.id.should.equal 'foo'

  describe '#getHash', ->

    it 'deserializes a stored hash into models', (done) ->
      class Foo extends Backbone.Model
        foo: -> 'baz'
      cache.getHash 'foobar', { foo: Foo }, (err, data) ->
        data.foo.get('id').should.equal 'bar'
        data.foo.foo().should.equal 'baz'
        done()
      @client.get.args[0][0].should.equal 'foobar'
      @client.get.args[0][1] null, JSON.stringify({ foo: { id: 'bar' } })
