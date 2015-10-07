benv = require 'benv'
Backbone = require 'backbone'
_ = require 'underscore'
sinon = require 'sinon'
CurrentUser = require '../../../../models/current_user'
Order = require '../../../../models/order'
Sale = require '../../../../models/sale'
SaleArtwork = require '../../../../models/sale_artwork'
BidderPositions = require '../../../../collections/bidder_positions'
Artwork = require '../../../../models/artwork'
BidForm = require '../../client/bid_form'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'BidForm', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub(Backbone, 'sync')
    sinon.stub _, 'delay', (cb) -> cb()
    @order = new Order()
    @sale = new Sale fabricate 'sale'
    @saleArtwork = new SaleArtwork fabricate 'sale_artwork', minimum_next_bid_cents: 10000, display_minimum_next_bid_dollars: '$100'
    @artwork = new Artwork fabricate 'artwork'
    @bidderPositions = new BidderPositions([fabricate('bidder_position', suggested_next_bid_cents: 0, display_suggested_next_bid_dollars: '$0')],
      { sale: @sale, saleArtwork: @saleArtwork })

    benv.render resolve(__dirname, '../../templates/bid-form.jade'), {
      sd: {}
      sale: @sale
      monthRange: @order.getMonthRange()
      yearRange: @order.getYearRange()
      artwork: @artwork
      saleArtwork: @saleArtwork
      bidderPositions: @bidderPositions
      maxBid: 50
      asset: (->)
    }, =>
      @view = new BidForm
        el: $('#auction-registration-page')
        model: @sale
        saleArtwork: @saleArtwork
        bidderPositions: @bidderPositions
      done()

  afterEach ->
    Backbone.sync.restore()
    _.delay.restore()

  describe '#placeBid', ->

    it 'validates the form and displays errors', ->
      @view.placeBid()
      html = @view.$el.html()
      @view.$('.error').text().should.equal "Your bid must be higher than $100"

    it 'validates the form and displays errors', ->
      @view.$('input.max-bid').val '$50.12'
      @view.placeBid()
      html = @view.$el.html()
      @view.$('.error').text().should.equal "Your bid must be higher than $100"

    it 'validates the form and displays errors', ->
      @view.$('input.max-bid').val '$50.00'
      @view.placeBid()
      html = @view.$el.html()
      @view.$('.error').text().should.equal "Your bid must be higher than $100"

    it 'does not show errors if the bid amount is above the min next bid', ->
      @view.$('input.max-bid').val '$150.12'
      @view.placeBid()
      html = @view.$el.html()
      @view.$('.error').text().should.equal ""

    it 'handles sale ended errors', ->
      @view.showError 'description', { responseText: "{ \"error\": \"Sale Closed to Bids\"}" }
      @view.$('.error').text().should.equal "Sorry, your bid wasn't received before the auction closed."

    it 'validates against the bidder position min', ->
      @view.bidderPositions.first().set suggested_next_bid_cents: 100000, display_suggested_next_bid_dollars: '$1,000'
      @view.$('input.max-bid').val '$50.00'
      @view.placeBid()
      html = @view.$el.html()
      @view.$('.error').text().should.equal "Your bid must be higher than $1,000"

    describe 'polling', ->
      beforeEach ->
        @view.$('input.max-bid').val '$150.12'
        @messageSpy = sinon.spy @view, 'showSuccessfulBidMessage'
        @view.placeBid()
        Backbone.sync.args[0][2].success fabricate('bidder_position', id: 'cat') # Bid successfully placed

      afterEach ->
        @messageSpy.restore()

      it 'polls for the bidder position', ->
        Backbone.sync.args[1][1].url().should.containEql '/api/v1/me/bidder_position/cat'
        @messageSpy.called.should.be.not.ok()

      it 'shows the bidder message when processed', ->
        Backbone.sync.args[1][2].success fabricate('bidder_position', processed_at: '2015-04-20T16:20:00-05:00')
        @messageSpy.called.should.be.ok()
