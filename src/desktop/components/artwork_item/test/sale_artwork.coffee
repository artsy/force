_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
{ resolve } = require 'path'
Artwork = require '../../../models/artwork'
Sale = require '../../../models/sale'
CurrentUser = require '../../../models/current_user'

describe 'SaleArtworks', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $

      @artwork = new Artwork fabricate 'artwork', acquireable: true, sale_artwork: fabricate('sale_artwork')
      @sale = new Sale fabricate 'sale', is_auction: true

      benv.render resolve(__dirname, '../templates/artwork.jade'), {
        artwork: @artwork
        displayPurchase: true
      }, =>
        SaleArtworkView = benv.require resolve(__dirname, '../views/sale_artwork.coffee')
        sinon.spy SaleArtworkView::, 'hideBuyNowButtons'
        sinon.spy SaleArtworkView::, 'hideBidStatuses'
        sinon.spy SaleArtworkView::, 'appendAuctionId'
        @view = new SaleArtworkView el: $('body'), model: @artwork
        done()

  afterEach ->
    @view.hideBuyNowButtons.restore()
    @view.hideBidStatuses.restore()
    @view.appendAuctionId.restore()
    benv.teardown()

  describe '#appendAuctionId', ->
    it 'appends auction id to all the links to the artwork', ->
      @view.sale = @sale
      @view.appendAuctionId()
      artworkLinks = _.map @view.$('a'), (a) -> $(a).attr('href')
      artworkLinks.should.match(new RegExp("auction_id=#{@sale.id}"))

  describe 'auction states', ->
    beforeEach ->
      sinon.stub(@sale, 'bidButtonState').returns {}

    afterEach ->
      @sale.bidButtonState.restore()

    describe 'auction state is open', ->
      it 'only appends the auction id to links; does not hide anything', ->
        @sale.set 'auction_state', 'open'
        @view.sale = @sale
        @view.setupClockState()
        @view.appendAuctionId.called.should.be.true()
        artworkLinks = _.map @view.$('a'), (a) -> $(a).attr('href')
        artworkLinks.should.match(new RegExp("auction_id=#{@sale.id}"))

    describe 'auction state is preview', ->
      it 'hides the buy now buttons; does not hide the bid status', ->
        @sale.set 'auction_state', 'preview'
        @view.sale = @sale
        @view.setupClockState()
        @view.appendAuctionId.called.should.be.false()
        @view.hideBuyNowButtons.called.should.be.true()
        @view.hideBidStatuses.called.should.be.false()

    describe 'auction state is closed', ->
      it 'hides the buy now buttons; hides the bid status', ->
        @sale.set 'auction_state', 'closed'
        @view.sale = @sale
        @view.setupClockState()
        @view.appendAuctionId.called.should.be.false()
        @view.hideBuyNowButtons.called.should.be.true()
        @view.hideBidStatuses.called.should.be.true()
