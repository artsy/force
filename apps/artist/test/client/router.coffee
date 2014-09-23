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
    sinon.stub @ArtistRouter::, 'deferredDispatch'
    sinon.stub @ArtistRouter::, 'navigate'
    @model = new Artist fabricate 'artist', id: 'foo-bar'
    @user = new CurrentUser fabricate 'user'
    @router = new @ArtistRouter model: @model, user: @user

  afterEach ->
    Backbone.sync.restore()
    @router.deferredDispatch.restore()
    @router.navigate.restore()

  describe '#getSection', ->
    it 'pulls the slug out of the history fragment and sets it in the options hash', ->
      Backbone.history.fragment = 'artist/foo-bar/related-artists'
      section = @router.getSection()
      section.slug.should.equal 'related-artists'
      section.name.should.equal 'Related Artists'
      Backbone.history.fragment = 'artist/foo-bar'
      section = @router.getSection()
      section.slug.should.equal ''
      section.name.should.equal 'Overview'

  describe '#execute', ->
    beforeEach ->
      @renderStub = renderStub = sinon.stub()
      @removeStub = removeStub = sinon.stub()
      @renderNavStub = renderNavStub = sinon.stub()
      class @StubbedView extends Backbone.View
        remove: -> removeStub()
        render: -> renderStub(); this
        renderNav: -> renderNavStub()
      @router.view = new @StubbedView
      @router.headerView = new @StubbedView

    describe 'data not synced', ->
      beforeEach ->
        @router.data.synced = false

      it 'does not render', ->
        @router.execute()
        @removeStub.called.should.be.true
        @renderStub.called.should.be.false
        @renderNavStub.called.should.be.false

    describe 'data is synced', ->
      beforeEach ->
        @router.data.synced = true

      it 'tears down an existing view, renders the new view, renders the nav', ->
        @router.execute()
        @removeStub.called.should.be.true
        @renderStub.called.should.be.true
        @renderNavStub.called.should.be.true

    describe 'invalid section', ->
      it 'redirects to the artist overview if a route for a non-returned section is triggered', ->
        invalid = _.findWhere @router.data.sections, slug: 'shows'
        @router.data.returns = _.without @router.data.sections, invalid
        Backbone.history.fragment = 'artist/foo-bar/related-artists'
        @router.execute()
        @router.navigate.called.should.be.false
        Backbone.history.fragment = 'artist/foo-bar/shows'
        @router.execute()
        @router.navigate.called.should.be.true
        @router.navigate.args[0][0].should.equal 'artist/foo-bar'
