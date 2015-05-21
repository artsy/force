_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../../../models/current_user'
FeaturedArtworks = require '../collection'

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

  afterEach ->
    Backbone.sync.restore()

  describe 'with a user', ->
    beforeEach ->
      @user = new CurrentUser fabricate 'user'
      @collection = new FeaturedArtworks [], user: @user

    describe '#fetch', ->
      it 'creates and fetches both collections', ->
        @collection.fetch()
        Backbone.sync.callCount.should.equal 2
        Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/notifications'
        Backbone.sync.args[1][2].url.should.containEql '/api/v1/sets?key=homepage:featured-artworks'

    describe '#takeResponse', ->
      beforeEach ->
        @collection.fetch()
        @collection.personalized.reset _.times 3, -> fabricate 'artwork', name: 'Personalized Artwork'
        @collection.featured.reset _.times 4, -> fabricate 'artwork', name: 'Featured Artwork'

      it 'builds a unified response from the two collections; taking the limit of 4, dipping into featured if it runs out of personalized', ->
        @collection.length.should.equal 0
        @collection.reset @collection.takeResponse()
        @collection.length.should.equal 4
        @collection.pluck('name').should.eql ['Personalized Artwork', 'Personalized Artwork', 'Personalized Artwork', 'Featured Artwork']

  describe 'without a user', ->
    beforeEach ->
      @collection = new FeaturedArtworks

    describe '#fetch', ->
      it 'creates and fetches both collections', ->
        @collection.fetch()
        Backbone.sync.callCount.should.equal 1
        Backbone.sync.args[0][2].url.should.containEql '/api/v1/sets?key=homepage:featured-artworks'

    describe '#takeResponse', ->
      beforeEach ->
        @collection.fetch()
        @collection.featured.reset _.times 5, -> fabricate 'artwork', name: 'Featured Artwork'

      it 'resets the collection with the contents the featured collection up to the limit of 4', ->
        @collection.length.should.equal 0
        @collection.reset @collection.takeResponse()
        @collection.length.should.equal 4
        @collection.pluck('name').should.eql ['Featured Artwork', 'Featured Artwork', 'Featured Artwork', 'Featured Artwork']
