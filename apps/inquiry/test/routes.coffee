sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
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
    it 'nexts on error', ->
      Backbone.sync.yieldsTo 'error'

      routes.index @req, @res, @next

      @res.render.called.should.be.false()
      @next.called.should.be.true()

    it 'fetches the artwork and renders the template', ->
      Backbone.sync.yieldsTo 'success',
        fabricate 'artwork', id: 'foobar'

      routes.index @req, @res, @next

      @res.locals.sd.ARTWORK.id.should.equal 'foobar'
      @res.render.called.should.be.true()
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].artwork.id.should.equal 'foobar'
