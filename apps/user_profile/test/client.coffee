_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Profile = require '../../../models/profile'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../test/helpers/stubs'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'

describe 'UserProfileView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../templates/index.jade'), {
        profile: profile = new Profile(fabricate 'profile')
        sd: {}
      }, =>
        UserProfileView = benv.require resolve(__dirname, '../client/user_profile')
        stubChildClasses UserProfileView, @,
          ['PoplockitFeed', 'ArtworkColumnsView']
          ['appendArtworks']
        $.fn.infiniteScroll = sinon.stub()
        @view = new UserProfileView
          el: $('#profile')
          model: profile
        done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe '#renderState', ->

    it 'sets the state for just posts', ->
      @view.posts = new Backbone.Collection [{}]
      @view.favorites = null
      @view.renderState()
      @view.$el.attr('data-has').should.equal 'posts'

  it 'sets the state for just favorites', ->
      @view.posts = null
      @view.favorites = new Backbone.Collection [{}]
      @view.renderState()
      @view.$el.attr('data-has').should.equal 'favorites'

  describe '#renderPosts', ->

    it 'adds a pop-lockit feed', ->
      @view.posts = new Backbone.Collection [{}]
      @view.renderPosts()
      @PoplockitFeed.calledWithNew.should.be.ok

  describe '#renderFavorites', ->

    it 'sets up a artwork columns view', ->
      @view.favorites = new Backbone.Collection [{}]
      @view.renderFavorites()
      @ArtworkColumnsView.calledWithNew.should.be.ok

describe 'CollectionView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.fn.infiniteScroll = sinon.stub()
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../templates/collection.jade'), {
        profile: profile = new Profile(fabricate 'profile')
        collection: new Backbone.Model(name: 'saved-artwork')
        sd: {}
      }, =>
        { CollectionView } = mod = benv.require resolve(__dirname, '../client/collection')
        stubChildClasses mod, @, ['ArtworkColumnsView'], ['appendArtworks']
        @view = new CollectionView
          el: $('#profile')
          artworkCollection: new ArtworkCollection id: 'saved-artwork', user_id: 'craig'
        done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe '#initialize', ->

    it 'sets a columns view', ->
      (@view.columnsView?).should.be.ok

  describe '#nextPage', ->

    it 'adds a page to the columns view', ->
      @view.columnsView.appendArtworks = sinon.stub()
      @view.nextPage()
      Backbone.sync.args[0][2].success [fabricate 'artwork', title: 'Andy Foobar at the Park']
      _.last(@view.columnsView.appendArtworks.args)[0][0].get('title').should.equal 'Andy Foobar at the Park'