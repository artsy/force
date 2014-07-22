_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Artwork = require '../../../../models/artwork.coffee'
SaleArtwork = require '../../../../models/sale_artwork.coffee'
Artworks = require '../../../../collections/artworks.coffee'
Feature = require '../../../../models/feature.coffee'
Sale = require '../../../../models/sale.coffee'

{ stubChildClasses } = require '../../../../test/helpers/stubs'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'FeatureView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      @FeatureView = mod = benv.requireWithJadeify(
        (resolve __dirname, '../../client/view'),
        ['setsTemplate', 'artistsTemplate', 'auctionRegisterButtonTemplate', 'auctionCountdownTemplate', 'filterTemplate', 'artworkColumns']
      )
      stubChildClasses @FeatureView, @, ['ArtworkColumnsView'], ['appendArtworks']
      @FeatureView.__set__ 'setupSaleArtworks', (@setupSaleArtworksStub = sinon.stub())
      @FeatureView.setupSaleArtworks = sinon.stub()
      done()

  after ->
    benv.teardown()

  describe 'feature with a sale that is not an auction', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      @feature = new Feature fabricate 'feature'

      benv.render resolve(__dirname, '../../templates/index.jade'), {
        feature: @feature
        sd: { FEATURE: @feature }
      }, =>
        @view = new @FeatureView
          model: @feature
          el: $ 'body'

        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#initialize', ->

      it 'appends sets', ->
        sale = new Sale(fabricate 'sale')
        _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness', id: 'abc', item_type: 'Sale'])
        _.last(Backbone.sync.args)[2].success(sale)
        _.last(Backbone.sync.args)[2].success([])
        @view.sale.id.should.equal sale.id
        @view.$el.html().should.include 'Explore this bidness'

        # Does not include artwork filter
        @view.$el.find('.feature-artwork-filter').length.should.equal 0

      it 'sale with artworks', ->
        saleArtworks = [
          fabricate 'sale_artwork', { artwork: fabricate 'artwork', artist: fabricate 'artist', { name: 'Matthew Abbott', sortable_id: 'abbott-matthew' } }
          fabricate 'sale_artwork', { artwork: fabricate 'artwork', artist: fabricate 'artist', { name: 'Leo Da Vinci', sortable_id: 'da-vinci-leo' } }
          fabricate 'sale_artwork', { artwork: fabricate 'artwork', artist: false }
        ]

        sale = new Sale(fabricate 'sale')
        _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness', id: 'abc', item_type: 'Sale'])
        _.last(Backbone.sync.args)[2].success(sale)
        _.last(Backbone.sync.args)[2].success(saleArtworks)
        _.last(Backbone.sync.args)[2].success([])

        console.log @view.$el.html()

        @view.sale.id.should.equal sale.id
        @view.$el.html().should.include 'Explore this bidness'

        # Does not include artwork filter
        @view.$el.find('.feature-artwork-filter').length.should.equal 0

    describe '#renderArtistList', ->

      it 'adds an artist list to top of the last artwork column', ->
