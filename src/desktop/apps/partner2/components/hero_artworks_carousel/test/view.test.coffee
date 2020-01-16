_ = require 'underscore'
qs = require 'qs'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
benv = require 'benv'
Partner = require '../../../../../models/partner.coffee'
Artwork = require '../../../../../models/artwork.coffee'
FilterArtworks = require '../../../../../collections/filter_artworks.coffee'
Artworks = require '../../../../../collections/artworks.coffee'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

HeroArtworksCarousel = benv.requireWithJadeify resolve(
  __dirname, '../view.coffee'
), ['template']

describe 'HeroArtworksCarousel', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      HeroArtworksCarousel.__set__ 'initCarousel', @initCarousel = sinon.stub()
      @partner = new Partner fabricate 'partner'
      @view = new HeroArtworksCarousel partner: @partner
      done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#fetchArtworks', ->
    before ->
      @artworks = new FilterArtworks
      _.each [1..10], => @artworks.add fabricate 'artwork'

    it 'makes proper requests to fetch artworks', ->
      @view.fetchArtworks()
      (requests = Backbone.sync.args).length.should.equal 1
      requests[0][2].data.should.eql decodeURIComponent qs.stringify(
        sort: '-partner_updated_at'
        for_sale: true
        size: 10
        partner_id: @partner.get('id')
      , { arrayFormat: 'brackets' })

    it 'returns a thenable promise', ->
      _.isFunction(@view.fetchArtworks().then).should.be.ok()

    it 'fetches and returns artworks', (done) ->
      @view.fetchArtworks()
        .then (artworks) =>
          artworks.length.should.equal 10
          artworks.models.should.eql @artworks.models
          done()
        .done()

      Backbone.sync.args[0][2].success hits: @artworks.models

  describe '#initCarousel', ->
    beforeEach ->
      @artworks = new Artworks
      sinon.stub @view, 'remove'

    afterEach ->
      @view.remove.restore()

    describe 'with < 5 artworks', ->
      beforeEach ->
        _.each [1..4], => @artworks.add fabricate 'artwork'

      it 'removes the view', ->
        @view.initCarousel @artworks
        @view.remove.calledOnce.should.be.ok()

    describe 'with >= 5 artworks', ->
      beforeEach ->
        _.each [1..5], => @artworks.add fabricate 'artwork'

      it 'initializes the carousel', ->
        @view.initCarousel @artworks
        @view.remove.called.should.not.be.ok()
        @initCarousel.calledOnce.should.be.ok()
