{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'

describe 'Gene routes', ->
  beforeEach ->
    @req =
      params:
        id: 'foo'
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd: APP_URL: 'http://localhost:5000', CURRENT_PATH: '/gene/foo'
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    xit 'bootstraps the gene', ->
      # sinon.stub Backbone, 'sync'
      #   .yieldsTo 'success', fabricate('gene', id: 'foo')
      #   .onCall 0
      routes.index @req, @res
      Backbone.sync.args[0][0].success fabricate('gene', id: 'foo')
      @res.locals.sd.GENE.id.should.equal 'foo'
      @res.render.args[0][0].should.equal 'index'
      
    xit 'redirects to the correct URL if the gene slug has been updated', ->
      sinon.stub Backbone, 'sync'
        .yieldsTo 'success', fabricate('gene', id: 'not-foo')
        .onCall 0
      routes.index @req, @res
        .then =>
          @res.redirect.called.should.be.true()
          @res.redirect.args[0].should.eql [301, '/gene/not-foo']
          @res.render.called.should.be.false()
