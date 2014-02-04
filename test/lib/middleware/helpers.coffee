helpers = require('../../../lib/middleware/helpers')
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