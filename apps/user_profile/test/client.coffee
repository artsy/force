_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Profile = require '../../../models/profile'
Artworks = require '../../../collections/artworks'
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
        { CollectionView } = mod = benv.requireWithJadeify resolve(__dirname, '../client/collection'), ['emptyTemplate']
        stubChildClasses mod, @, ['ArtworkColumnsView', 'ShareModal', 'EditWorkModal'], ['appendArtworks']
        @view = new CollectionView
          el: $('body')
          artworkCollection: new ArtworkCollection id: 'saved-artwork', user_id: 'craig'
          user: new Backbone.Model accessToken: 'foobaz'
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

    it 'includes the access token', ->
      @view.columnsView.appendArtworks = sinon.stub()
      @view.nextPage()
      Backbone.sync.args[0][2].data.access_token.should.include 'foobaz'

  describe '#openShareModal', ->

    it 'opens a share modal for the collection', ->
      @view.artworkCollection.set name: "Andy Foobar's Dulloroids", id: 'andy-foobar'
      @view.openShareModal()
      @ShareModal.args[0][0].description.should.include "Andy Foobar's Dulloroids"

  describe '#renderEmpty', ->

    it 'renders an emtpy state', ->
      @view.renderEmpty()
      _.last(Backbone.sync.args)[2].success [fabricate 'featured_link', title: 'Design on Artsy']
      @view.$el.html().should.include 'Design on Artsy'

  describe '#onRemove', ->

    it 'removes the artwork', ->
      @view.columnsView.render = sinon.stub()
      @view.artworkCollection.artworks.reset [fabricate('artwork'), fabricate('artwork')]
      @view.onRemove @view.artworkCollection.artworks.first()
      @view.artworkCollection.artworks.length.should.equal 1

    it 're-renders the column view', ->
      @view.columnsView.render = sinon.stub()
      @view.artworkCollection.artworks.reset [fabricate('artwork'), fabricate('artwork')]
      @view.onRemove @view.artworkCollection.artworks.first()
      @view.columnsView.render.called.should.be.ok

  describe '#openEditWorkModal', ->

    it 'opens an edit work modal', ->
      @view.openEditWorkModal(preventDefault: ->)
      @EditWorkModal.args[0][0].width.should.equal 550

describe 'Slideshow', ->

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
        Slideshow = require '../client/slideshow'
        @view = new Slideshow
          el: $('body')
          artworks: new Artworks [fabricate 'artwork']
          user: new Backbone.Model accessToken: 'foobaz'
        done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe '#render', ->

    it 'renders the artworks', ->
      @view.artworks.reset [fabricate 'artwork', title: 'Foobars in the Pond']
      @view.render()
      @view.$el.html().should.include 'Foobars in the Pond'

  describe '#next', ->

    beforeEach ->
      @view.artworks.reset (fabricate('artwork')  for i in [0..10])
      @view.render()

    it 'moves the next active artwork', ->
      @view.next()
      @view.$('.is-active').index().should.equal 0
      @view.next()
      @view.$('.is-active').index().should.equal 1

  describe '#toggle', ->

    beforeEach ->
      @view.artworks.reset (fabricate('artwork')  for i in [0..10])
      @view.render()

    it 'resets the active artwork', ->
      @view.next()
      @view.next()
      @view.toggle()
      @view.$('.is-active').index().should.equal 0