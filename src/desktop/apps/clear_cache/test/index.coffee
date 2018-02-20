rewire = require 'rewire'
app = rewire '../index'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'clear cache app', ->

  it 'clears the cache when POSTed to', ->
    app.__set__ 'flushall', stub = sinon.stub()
    app.__get__('post')()
    stub.called.should.be.ok()

  it 'doesnt allow non-admins', ->
    app.__get__('all')({ user: new Backbone.Model(type: 'User') }, { status: -> },
      next = sinon.stub())
    next.args[0][0].toString().should.containEql 'must be logged in as an admin'
    next.args[0][0].status.should.eql 403
