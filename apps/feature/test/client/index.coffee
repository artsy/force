_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Feature = require '../../../../models/feature'
Sale = require '../../../../models/sale'

describe 'FeatureView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      @FeatureView = mod = benv.requireWithJadeify(
        (resolve __dirname, '../../client/view'),
        ['setsTemplate', 'artistsTemplate', 'artworkColumns']
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
    describe 'sale without artworks', ->
      beforeEach ->
        @sale = new Sale(fabricate 'sale')
        _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness', id: 'abc', item_type: 'Sale'])
        _.last(Backbone.sync.args)[2].success(@sale)
        _.last(Backbone.sync.args)[2].success([])

      it 'renders without errors', ->
        @view.sale.id.should.equal @sale.id
        @view.$el.html().should.containEql 'Explore this bidness'

      it 'does not include artwork filter or artist list', ->
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

      it 'does not include artwork filter or artist list', ->
        @view.$el.find('.feature-artwork-filter').length.should.equal 0
        @view.$el.find('.feature-set-item-artist-list').length.should.equal 0
