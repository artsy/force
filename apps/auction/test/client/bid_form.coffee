benv = require 'benv'
Backbone = require 'backbone'
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

    @order = new Order()
    @sale = new Sale fabricate 'sale'
    @saleArtwork = new SaleArtwork fabricate 'sale_artwork', minimum_next_bid_cents: 10000
    @artwork = new Artwork fabricate 'artwork'
    @bidderPositions = new BidderPositions([fabricate('bidder_position', suggested_next_bid_cents: 0)],
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
    }, =>
      @view = new BidForm
        el: $('#auction-registration-page')
        model: @sale
        saleArtwork: @saleArtwork
        bidderPositions: @bidderPositions
      done()

  afterEach ->
    Backbone.sync.restore()

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

    it 'validates against the bidder position min', ->
      @view.bidderPositions.first().set suggested_next_bid_cents: 100000
      @view.$('input.max-bid').val '$50.00'
      @view.placeBid()
      html = @view.$el.html()
      @view.$('.error').text().should.equal "Your bid must be higher than $1,000"
