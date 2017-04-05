_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artist = require '../../../../models/artist'
CurrentUser = require '../../../../models/current_user'

describe 'ArtistRouter', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @ArtistRouter = require '../../client/router'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @model = new Artist fabricate 'artist', id: 'foo-bar'
    @user = new CurrentUser fabricate 'user'
    sinon.stub @ArtistRouter::, 'setupHeaderView'
    sinon.stub @ArtistRouter::, 'navigate'
    @router = new @ArtistRouter model: @model, user: @user

  afterEach ->
    Backbone.sync.restore()
    @router.navigate.restore()
    @router.setupHeaderView.restore()

  describe '#execute', ->
    beforeEach ->
      @renderStub = renderStub = sinon.stub()
      class @StubbedView extends Backbone.View
        render: -> renderStub(); this

    it 'renders if a view is not alrady rendered', ->
      @router.execute => @router.view = new @StubbedView
      @renderStub.called.should.be.true()

    it 'returns if a view is already rendered', ->
      @router.view = new @StubbedView
      @router.headerView = new @StubbedView
      @router.execute => @router.view = new @StubbedView
      @renderStub.called.should.be.false()
