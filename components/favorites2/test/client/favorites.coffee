_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'FavoritesView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.fn.hidehover = sinon.stub()
      $.fn.infiniteScroll  = sinon.stub()
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../fixtures/favorites.jade'), { sd: {} }, =>
        { FavoritesView } = mod = benv.requireWithJadeify(
          resolve(__dirname, '../../client/favorites')
          ['hintTemplate', 'collectionsTemplate']
        )
        mod.__set__ 'mediator', @mediator = trigger: sinon.stub(), on: sinon.stub()
        CurrentUser = mod.__get__ 'CurrentUser'
        sinon.stub CurrentUser, 'orNull'
        CurrentUser.orNull.returns new CurrentUser fabricate 'user'
        stubChildClasses mod, this,
          ['ArtworkColumnsView', 'SuggestedGenesView', 'ShareView', 'ZigZagBanner']
          ['appendArtworks', 'render']
        @view = new FavoritesView el: $('body')
        done()

  afterEach ->
    CurrentUser.orNull.restore()
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'sets up an artwork columns view with the user favorites', ->
      (@ArtworkColumnsView.args[0][0].collection?).should.be.ok

  describe '#setup', ->

    it 'fetches the user collections and shows an empty state if there are none', ->
      sinon.stub @view, 'showEmptyHint'
      @view.setup()
      _.last(Backbone.sync.args)[2].success []
      @view.showEmptyHint.called.should.be.ok

    it 'shows an empty state if there are no works in any collections', ->
      sinon.stub @view, 'showEmptyHint'
      @view.setup()
      _.last(Backbone.sync.args)[2].success [{ id: 'saved-artwork' }, { id: 'bathroom-warhols' }]
      for args in _.last(Backbone.sync.args, 2)
        args[2].success []
        args[2].complete []
      @view.showEmptyHint.called.should.be.ok

  describe '#showEmptyHint', ->

    it 'adds a SuggestedGenesView and removes infinite scroll', ->
      sinon.stub @view, 'endInfiniteScroll'
      @view.showEmptyHint()
      @view.endInfiniteScroll.called.should.be.ok
      @SuggestedGenesView.args[0][0].user.should.equal @view.user

  describe '#renderCollections', ->

    it 'renders the collections', ->
      @view.$el.html "<div class='favorites2-collections'></div>"
      @view.collections = new Backbone.Collection(
        { id: 'bathroom-warhols', name: 'Warhols for my bathroom.'}
      )
      @view.collections.first().artworks = new Backbone.Collection
      @view.renderCollections()
      @view.$el.html().should.include 'Warhols for my bathroom.'

  describe '#renderZigZagBanner', ->

    it 'creates a new zig zag view', ->
      @view.renderZigZagBanner()
      @ZigZagBanner.args[0][0].message.should.include 'Create a new set'

  describe '#renderPrivacy', ->

    it 'sets the link state depending on the collection'