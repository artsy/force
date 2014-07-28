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
      stubChildClasses @FeatureView, @, ['ArtworkColumnsView'], ['appendArtworks', 'rebalance', 'undelegateEvents']
      @FeatureView.__set__ 'SaleArtworkView', (@saleArtworkViewStub = sinon.stub())
      done()

  after ->
    benv.teardown(false)

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

    it 'sale without artworks', ->
      sale = new Sale(fabricate 'sale')
      _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness', id: 'abc', item_type: 'Sale'])
      _.last(Backbone.sync.args)[2].success(sale)
      _.last(Backbone.sync.args)[2].success([])
      @view.sale.id.should.equal sale.id
      @view.$el.html().should.containEql 'Explore this bidness'

      # Does not include artwork filter or artist list
      @view.$el.find('.feature-artwork-filter').length.should.equal 0
      @view.$el.find('.feature-set-item-artist-list').length.should.equal 0

    it 'auction without artworks', ->
      sale = new Sale(fabricate 'sale', name: 'Awesome Sale', is_auction: true, auction_state: 'open')
      _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness', id: 'abc', item_type: 'Sale'])
      _.last(Backbone.sync.args)[2].success(sale)
      _.last(Backbone.sync.args)[2].success([])
      @view.isAuction().should.be.ok
      @view.sale.id.should.equal sale.id
      @view.$el.html().should.containEql 'Explore this bidness'

      # Does not include artwork filter or artist list
      @view.$el.find('.feature-artwork-filter').length.should.equal 0
      @view.$el.find('.feature-set-item-artist-list').length.should.equal 0

    context 'sale with artworks', ->
      beforeEach ->
        @saleArtworks = [
          fabricate 'sale_artwork', { artwork: fabricate 'artwork', artist: fabricate 'artist', { name: 'Matthew Abbott', sortable_id: 'abbott-matthew' } }
          fabricate 'sale_artwork', { artwork: fabricate 'artwork', artist: fabricate 'artist', { name: 'Leo Da Vinci', sortable_id: 'da-vinci-leo' } }
          fabricate 'sale_artwork', { artwork: fabricate 'artwork', artist: false }
        ]

        @callCount = @saleArtworkViewStub.callCount

        @sale = new Sale(fabricate 'sale')
        _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness', id: 'abc', item_type: 'Sale'])
        _.last(Backbone.sync.args)[2].success(@sale)
        _.last(Backbone.sync.args)[2].success(@saleArtworks)
        _.last(Backbone.sync.args)[2].success([])

      it 'renders without errors', ->
        @saleArtworkViewStub.callCount.should.equal @callCount + @saleArtworks.length

        @view.sale.id.should.equal @sale.id
        @view.$el.html().should.containEql 'Explore this bidness'

        # Does not include artwork filter or artist list
        @view.$el.find('.feature-artwork-filter').length.should.equal 0
        @view.$el.find('.feature-set-item-artist-list').length.should.equal 0

    context 'auction with artworks', ->
      beforeEach ->
        @saleArtworks = [
          fabricate 'sale_artwork', { artwork: fabricate 'artwork', artist: fabricate 'artist', { name: 'Matthew Abbott', sortable_id: 'abbott-matthew' } }
          fabricate 'sale_artwork', { artwork: fabricate 'artwork', artist: fabricate 'artist', { name: 'Leo Da Vinci', sortable_id: 'da-vinci-leo' } }
          fabricate 'sale_artwork', { artwork: fabricate 'artwork', artist: false }
        ]

        # Since artworkColumns view is stubbed we manually add one
        @view.$el.append "<div class='artwork-column'></div>"

        @callCount = @saleArtworkViewStub.callCount

        @view.minArtworksForFilter = 1
        @sale = new Sale(fabricate 'sale', name: 'Awesome Sale', is_auction: true, auction_state: 'open')

        # Stub feature's sets - a set with item_type 'sale'
        _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness', id: 'abc', item_type: 'Sale'])

        # Stub Set items (a sale)
        Backbone.sync.args[1][2].success(@sale)

        # Stub Sale artworks
        Backbone.sync.args[2][2].success(@saleArtworks)

        # Stub Clock time
        Backbone.sync.args[4][2].success({
          start_at: new Date(2000, 10, 10).toString()
          end_at: new Date(2015, 10, 10).toString()
        })

        # End sale artwork requests
        _.last(Backbone.sync.args)[2].success([])

      it 'renders without errors', ->
        @view.isAuction().should.be.ok

        @saleArtworkViewStub.callCount.should.equal @callCount + @saleArtworks.length + @saleArtworks.length

        @view.sale.id.should.equal @sale.id
        @view.$el.html().should.containEql 'Explore this bidness'

        # Includes artwork filter, artist list and countdown
        @view.$el.find('.clock-header').length.should.equal 1
        @view.$el.find('.feature-artwork-filter').length.should.equal 1
        @view.$el.find('.feature-set-item-artist-list').length.should.equal 1
        # Artist list should not include artwork w/o artist
        @view.$el.find('.feature-set-item-artist-link').length.should.equal 2
