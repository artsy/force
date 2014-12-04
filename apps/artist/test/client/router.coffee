_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artist = require '../../../../models/artist.coffee'
CurrentUser = require '../../../../models/current_user.coffee'

describe 'ArtistRouter', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @ArtistRouter = require '../../client/router'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub @ArtistRouter::, 'navigate'
    @model = new Artist fabricate 'artist', id: 'foo-bar'
    @user = new CurrentUser fabricate 'user'
    @router = new @ArtistRouter model: @model, user: @user

  afterEach ->
    Backbone.sync.restore()
    @router.navigate.restore()

  describe '#execute', ->
    beforeEach ->
      @renderStub = renderStub = sinon.stub()
      @removeStub = removeStub = sinon.stub()
      class @StubbedView extends Backbone.View
        remove: -> removeStub()
        render: -> renderStub(); this
      @router.view = new @StubbedView
      @router.headerView = new @StubbedView

    it 'tears down an existing view, renders the new view', ->
      @router.execute()
      @removeStub.called.should.be.true
      @renderStub.called.should.be.true
