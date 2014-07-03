_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
{ fabricate } = require 'antigravity'

describe 'User profile routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'foobar' } }
    @res =
      locals:
        profile: new Backbone.Model(fabricate 'profile', owner: fabricate('user'))
        sd: {}
      render: sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#collection', ->

    it 'fetches an artwork collection and renders', ->
      routes.collection @req, @res
      _.last(Backbone.sync.args)[2].success { id: 'saved-artwork' }
      @res.render.args[0][0].should.equal 'collection'
      @res.locals.sd.COLLECTION.id.should.equal 'saved-artwork'

    it 'doesnt pass an empty access token so a Forbidden is shown', ->
      routes.collection @req, @res
      (_.last(Backbone.sync.args)[2].data.access_token?).should.not.be.ok