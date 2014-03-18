sinon = require 'sinon'
rewire = require 'rewire'
cache = rewire '../../lib/cache'
Backbone = require 'backbone'

describe 'cache lib', ->

  beforeEach ->
    cache.__set__ 'client', @client = { set: sinon.stub(), get: sinon.stub(), expire: sinon.stub() }

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
