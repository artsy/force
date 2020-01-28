sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
routes = require '../routes'

describe 'inquiry routes', ->
  beforeEach ->
    @req = params: 'foobar'
    @res = render: sinon.stub(), locals: sd: {}
    @next = sinon.stub()

    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    it 'handles errors', ->
      Backbone.sync.yieldsTo 'error'
      routes.index @req, @res, @next
      @res.render.called.should.be.false()

    it 'fetches the artwork and renders the template', ->
      Backbone.sync.yieldsTo 'success',
        fabricate 'artwork', id: 'foobar'

      routes.index @req, @res, @next

      @res.locals.sd.ARTWORK.id.should.equal 'foobar'
      @res.render.called.should.be.true()
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].artwork.id.should.equal 'foobar'

  describe '#user_outcome', ->
    it 'fetches the inquiry and renders the template', ->
      Backbone.sync.yieldsTo 'success',
        fabricate 'inquiry', id: 'foobar'

      @req = params: {id: 'foobar'} , query: { outcome_token: '123123', option: 'selected+option' }
      routes.user_outcome @req, @res, @next
      
      @res.locals.sd.INQUIRY.id.should.equal 'foobar'
      @res.render.called.should.be.true()
      @res.render.args[0][0].should.equal 'user_outcome'
      @res.render.args[0][1].inquiry.id.should.equal 'foobar'
      
