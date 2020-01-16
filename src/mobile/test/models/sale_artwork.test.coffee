SaleArtwork = require '../../models/sale_artwork'
{ fabricate } = require '@artsy/antigravity'
Backone = require 'backbone'
sinon = require 'sinon'
_ = require 'underscore'

describe 'SaleArtwork', ->
  beforeEach ->
    sinon.stub Backone, 'sync'
    @saleArtwork = new SaleArtwork fabricate 'sale_artwork'

  afterEach ->
    Backone.sync.restore()

  describe '#currentBid', ->
    it 'returns the correctly formatted string', ->
      @saleArtwork.set display_highest_bid_amount_dollars: '$100'
      @saleArtwork.currentBid().should.equal '$100'

    it 'defaults to opening_bid_cents', ->
      @saleArtwork.set display_highest_bid_amount_dollars: null, display_opening_bid_dollars: '$2'
      @saleArtwork.currentBid().should.equal '$2'

  describe '#bidLabel', ->
    it 'is Current Bid if there is a bid placed', ->
      @saleArtwork.set highest_bid_amount_cents: 1000
      @saleArtwork.bidLabel().should.equal 'Current Bid'

    it 'is Starting Bid if there is not a current bid', ->
      @saleArtwork.unset 'highest_bid_amount_cents'
      @saleArtwork.bidLabel().should.equal 'Starting Bid'

  describe '#minBid', ->
    it 'returns the correctly formatted string', ->
      @saleArtwork.set display_minimum_next_bid_dollars: '$10'
      @saleArtwork.minBid().should.equal '$10'

  describe '#bidCountLabel', ->
    it 'returns bid count in plural form if there are 0 bids', ->
      @saleArtwork.set bidder_positions_count: 0
      @saleArtwork.set highest_bid_amount_cents: 100
      @saleArtwork.bidCountLabel().should.equal '0 bids'

    it 'returns bid count in singular form if 1', ->
      @saleArtwork.set bidder_positions_count: 1
      @saleArtwork.set highest_bid_amount_cents: 100
      @saleArtwork.bidCountLabel().should.equal '1 bid'

    it 'returns bid count in plural form if greater than 1', ->
      @saleArtwork.set bidder_positions_count: 6
      @saleArtwork.set highest_bid_amount_cents: 100
      @saleArtwork.bidCountLabel().should.equal '6 bids'

    it 'returns a blank string if attribute not present', ->
      @saleArtwork.unset 'bidder_positions_count'
      @saleArtwork.bidCountLabel().should.equal '0 bids'

    it 'returns a blank string if highest_bid_amount_cents attribute not present', ->
      @saleArtwork.set bidder_positions_count: 6
      @saleArtwork.unset 'highest_bid_amount_cents'
      @saleArtwork.bidCountLabel().should.equal '0 bids'

  describe '#formatBidCount', ->

    it 'returns an empty string if there are no bids because of no highest_bid_amount_cents', ->
      @saleArtwork.set bidder_positions_count: 6
      @saleArtwork.unset 'highest_bid_amount_cents'
      @saleArtwork.formatBidCount().should.equal ''

    it 'returns an empty string if there are no bids', ->
      @saleArtwork.unset 'bidder_positions_count'
      @saleArtwork.formatBidCount().should.equal ''

    it 'returns the original count in parentheses if it exists', ->
      @saleArtwork.set bidder_positions_count: 6
      @saleArtwork.set highest_bid_amount_cents: 100
      @saleArtwork.formatBidCount().should.equal '(6 bids)'

  describe '#formatBidsAndReserve', ->
    describe 'with no bids', ->
      it 'returns This work has a reserve if there is a reserve', ->
        @saleArtwork.set highest_bid_amount_cents: 100
        @saleArtwork.set bidder_positions_count: 0
        @saleArtwork.set reserve_status: 'reserve_not_met'
        @saleArtwork.formatBidsAndReserve().should.equal '(This work has a reserve)'

      it 'returns nothing if there is no reserve', ->
        @saleArtwork.set highest_bid_amount_cents: 100
        @saleArtwork.set bidder_positions_count: 0
        @saleArtwork.set reserve_status: 'no_reserve'
        @saleArtwork.formatBidsAndReserve().should.equal ''

    describe 'with bids', ->
      it 'returns only bid data if there is no reserve', ->
        @saleArtwork.set highest_bid_amount_cents: 100
        @saleArtwork.set bidder_positions_count: 2
        @saleArtwork.set reserve_status: 'no_reserve'
        @saleArtwork.formatBidsAndReserve().should.equal '(2 bids)'

      it 'returns bid count and reserve not met if reserve is not met', ->
        @saleArtwork.set highest_bid_amount_cents: 100
        @saleArtwork.set bidder_positions_count: 2
        @saleArtwork.set reserve_status: 'reserve_not_met'
        @saleArtwork.formatBidsAndReserve().should.equal '(2 bids, Reserve not met)'

      it 'returns bid count and reserve met if reserve is met', ->
        @saleArtwork.set highest_bid_amount_cents: 100
        @saleArtwork.set bidder_positions_count: 2
        @saleArtwork.set reserve_status: 'reserve_met'
        @saleArtwork.formatBidsAndReserve().should.equal '(2 bids, Reserve met)'

  describe '#estimate', ->
    it 'formats the estimate', ->
      @saleArtwork.unset 'display_low_estimate_dollars'
      @saleArtwork.unset 'display_high_estimate_dollars'
      _.isUndefined(@saleArtwork.estimate()).should.be.ok()
      @saleArtwork.set display_low_estimate_dollars: '$200', display_high_estimate_dollars: '$300'
      @saleArtwork.estimate().should.equal '$200–$300'
      @saleArtwork.unset 'display_high_estimate_dollars'
      @saleArtwork.estimate().should.equal '$200'

    it 'falls back on to `estimate_cents`', ->
      @saleArtwork.set display_low_estimate_dollars: '$200', display_estimate_dollars: '$600'
      @saleArtwork.estimate().should.equal '$200'
      @saleArtwork.unset 'display_low_estimate_dollars'
      @saleArtwork.estimate().should.equal '$600'
