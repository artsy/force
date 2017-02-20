sinon = require 'sinon'
routes = require '../routes'

describe 'Flash routes', ->
  beforeEach ->
    @req = flash: sinon.stub(), body: message: 'Goodbye world.'
    @res = send: sinon.stub()

  describe '#index', ->
    it 'appends messages to the flash', ->
      routes.index @req, @res
      @req.flash.args[0][0].should.equal 'info'
      @req.flash.args[0][1].should.equal 'Goodbye world.'
      @req.body.type = 'warn'
      routes.index @req, @res
      @req.flash.args[1][0].should.equal 'warn'
      @req.flash.args[1][1].should.equal 'Goodbye world.'
