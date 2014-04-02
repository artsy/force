rewire = require 'rewire'
helpers = rewire '../../../lib/middleware/helpers'
sinon = require 'sinon'

describe 'Helpers middleware', ->

  beforeEach ->
    @req = {}
    @res = { status: sinon.stub() }
    @next = sinon.stub()
    helpers @req, @res, @next

  it 'adds a backbone error handler helper', ->
    @res.backboneError {}, { error: {}, text: '{"error":"Foo Err"}' }
    @next.args[1][0].toString().should.include 'Foo Err'

  it 'handles generic stringy errors', ->
    @res.backboneError {}, { error: 'Foo Err' }
    @next.args[1][0].toString().should.include 'Foo Err'

  it 'turns 403 errors into 404s', ->
    helpers.__set__ 'NODE_ENV', 'production'
    @res.backboneError {}, { error: { status: 403 } }
    @next.args[1][0].toString().should.include 'Not Found'
