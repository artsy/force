_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
BidderPositions = require '../../collections/bidder_positions'
SaleArtwork = require '../../models/sale_artwork'
Sale = require '../../models/sale'

describe 'BidderPositions', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @bidderPositions = new BidderPositions [
      fabricate 'bidder_position', id: _.uniqueId(), created_at: '2011-11-14T00:03:27Z', highest_bid: id: _.uniqueId()
      fabricate 'bidder_position', id: _.uniqueId(), created_at: '2013-11-14T00:03:27Z', highest_bid: id: _.uniqueId()
      fabricate 'bidder_position', id: _.uniqueId(), created_at: '2012-11-14T00:03:27Z', highest_bid: id: _.uniqueId()
    ],
      saleArtwork: @saleArtwork = new SaleArtwork fabricate 'sale_artwork', minimum_next_bid_cents: 500
      sale: @sale = new Sale fabricate 'sale'

  afterEach ->
    Backbone.sync.restore()

  describe '#url', ->
    it 'uses the correct URL when fetching', ->
      @bidderPositions.fetch()
      Backbone.sync.args[0][1].url().
        should.containEql "/api/v1/me/bidder_positions?sale_id=#{@sale.id}&artwork_id=#{@saleArtwork.id}"

  describe 'isHighestBidder', ->
    it 'is undefined if the bidder positions does not contain a highest bidder', ->
      _.isUndefined(@bidderPositions.isHighestBidder()).should.be.ok()

    it 'returns the relevant bidder position if there is a highest bidder', ->
      position = @bidderPositions.last()
      @saleArtwork.set('highest_bid', id: position.get('highest_bid').id)
      @bidderPositions.isHighestBidder().should.equal position

  describe 'isOutbid', ->
    it 'returns the most recent position if there is any positions and none are the high bidder', ->
      _.isUndefined(new BidderPositions().isOutbid()).should.be.ok()
      @saleArtwork.set('highest_bid', id: @bidderPositions.last().get('highest_bid').id)
      _.isUndefined(@bidderPositions.isHighestBidder()).should.not.be.ok()
      _.isUndefined(@bidderPositions.isOutbid()).should.be.ok()
      @saleArtwork.unset('highest_bid')
      @bidderPositions.isOutbid().should.equal @bidderPositions.mostRecent()

  describe '#mostRecent', ->
    it 'returns the most recent of the bidder positions', ->
      @bidderPositions.mostRecent().get('created_at').should.equal '2013-11-14T00:03:27Z'

  describe '#classes', ->
    it 'returns some class names used in CSS depending on the state of the collection', ->
      _.isUndefined(new BidderPositions().classes()).should.be.ok()
      @bidderPositions.classes().should.equal 'is-outbid'
      @saleArtwork.set('highest_bid', id: @bidderPositions.last().get('highest_bid').id)
      @bidderPositions.classes().should.equal 'is-highest'

  describe '#minBidCents', ->
    it 'returns the minimum next bid (in this case from the first bidder position suggested_next_bid_cents)', ->
      @bidderPositions.minBidCents().should.equal 325000

    it 'returns the minimum next bid (if the sale artwork has a higher minimum_next_bid_cents)', ->
      @saleArtwork.set 'minimum_next_bid_cents', 650000
      @bidderPositions.minBidCents().should.equal 650000

    it 'still returns in the event sale artwork minimum_next_bid_cents is undefined', ->
      @saleArtwork.unset 'minimum_next_bid_cents'
      @bidderPositions.minBidCents().should.equal 325000

    it 'still returns in the event there are no bidder positions', ->
      @saleArtwork.set 'minimum_next_bid_cents', 500
      bidderPositions = new BidderPositions [], saleArtwork: @saleArtwork, sale: @sale
      bidderPositions.minBidCents().should.equal 500
