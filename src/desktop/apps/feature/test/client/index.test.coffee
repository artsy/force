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
{ fabricate } = require '@artsy/antigravity'

describe 'FeatureView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      @FeatureView = mod = benv.requireWithJadeify(
        (resolve __dirname, '../../client/view'),
        ['setsTemplate', 'artworkColumns']
      )
      stubChildClasses @FeatureView, @, ['ArtworkColumnsView'], ['appendArtworks', 'rebalance', 'undelegateEvents']
      @FeatureView.__set__ 'SaleArtworkView', (@saleArtworkViewStub = sinon.stub())
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @feature = new Feature fabricate 'feature'

    benv.render resolve(__dirname, '../../templates/index.jade'), {
      feature: @feature
      sd: { FEATURE: @feature }
      asset: (->)
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

      # Does not include artworks
      @view.$('.artwork-columns-sale').is(':empty').should.be.true()

    it 'redirects when it is an auction', ->
      redirectToAuction = sinon.spy @FeatureView::, 'redirectToAuction'
      sale = new Sale fabricate 'sale', is_auction: true
      _.last(Backbone.sync.args)[2].success [fabricate 'set', name: 'Explore this bidness', id: 'abc', item_type: 'Sale']
      _.last(Backbone.sync.args)[2].success sale
      _.last(Backbone.sync.args)[2].success []
      @view.isAuction().should.be.true()
      redirectToAuction.called.should.be.true()
      redirectToAuction.restore()

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
