_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
CurrentUser = require '../../../../../models/current_user'
FeaturedArtworksView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'FeaturedArtworks', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new CurrentUser fabricate 'user'
    @view = new FeaturedArtworksView user: @user

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    describe 'before collections are fetched', ->
      beforeEach ->
        @view.render()

      it 'renders an empty state', ->
        @view.$('.loading-spinner').length.should.equal 1
        @view.$('.home-browse-all').text().should.equal 'Browse all for sale artworks'
        @view.$('.home-browse-all').attr('href').should.equal '/browse/artworks?price_range=-1%3A1000000000000'

    describe 'after collections are fetched', ->
      describe 'with featured works', ->
        beforeEach ->
          @view.collection.fetch()
          @view.collection.featured.reset _.times 5, -> fabricate 'artwork'
          @view.collection.reset @view.collection.takeResponse()
          @view.render()

        it 'renders the artworks', ->
          @view.$('.loading-spinner').length.should.equal 0
          @view.$('.artwork-item').length.should.equal 4
          @view.$('.top-featured-header').text().should.equal 'Featured Artworks for Sale'
          @view.$('.home-browse-all').text().should.equal 'Browse all for sale artworks'
          @view.$('.home-browse-all').attr('href').should.equal '/browse/artworks?price_range=-1%3A1000000000000'

      describe 'with personalized works', ->
        beforeEach ->
          @view.collection.fetch()
          @view.collection.personalized.reset _.times 5, -> fabricate 'artwork'
          @view.collection.reset @view.collection.takeResponse()
          @view.render()

        it 'renders the artworks', ->
          @view.$('.loading-spinner').length.should.equal 0
          @view.$('.artwork-item').length.should.equal 4
          @view.$('.top-featured-header').text().should.equal 'Works by Artists you follow'
          @view.$('.home-browse-all').text().should.equal 'Browse more artworks'
          @view.$('.home-browse-all').attr('href').should.equal '/works-for-you'
