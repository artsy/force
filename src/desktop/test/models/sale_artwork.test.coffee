_ = require 'underscore'
sinon = require 'sinon'
Backone = require 'backbone'
SaleArtwork = require '../../models/sale_artwork'
{ fabricate } = require '@artsy/antigravity'

describe 'SaleArtwork', ->

  beforeEach ->
    sinon.stub Backone, 'sync'
    @saleArtwork = new SaleArtwork fabricate 'sale_artwork'

  afterEach ->
    Backone.sync.restore()

  describe '#currentBid', ->

    it 'defaults to display_opening_bid_dollars', ->
      @saleArtwork.set display_highest_bid_amount_dollars: null, display_opening_bid_dollars: "$200"
      @saleArtwork.currentBid().should.equal '$200'

  describe '#bidLabel', ->

    it 'is Current Bid if there is a bid placed', ->
      @saleArtwork.set highest_bid_amount_cents: 1000
      @saleArtwork.bidLabel().should.equal 'Current Bid'

    it 'is Starting Bid if there is not a current bid', ->
      @saleArtwork.unset 'highest_bid_amount_cents'
      @saleArtwork.bidLabel().should.equal 'Starting Bid'

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

  describe '#bidCountLabel', ->

    it 'returns bid count in singular form if 1', ->
      @saleArtwork.set bidder_positions_count: 1
      @saleArtwork.set highest_bid_amount_cents: 100
      @saleArtwork.bidCountLabel().should.equal '1 bid'

    it 'returns bid count in plural form if greater than 1', ->
      @saleArtwork.set bidder_positions_count: 6
      @saleArtwork.set highest_bid_amount_cents: 100
      @saleArtwork.bidCountLabel().should.equal '6 bids'

    it 'returns 0 if the highest_bid_amount_cents is not set (i.e. all bids were cancelled)', ->
      @saleArtwork.set bidder_positions_count: 6
      @saleArtwork.unset 'highest_bid_amount_cents'
      @saleArtwork.bidCountLabel().should.equal '0 bids'

    it 'returns a 0 bids string if attribute not present', ->
      @saleArtwork.unset 'bidder_positions_count'
      @saleArtwork.bidCountLabel().should.equal '0 bids'

    # Pending this until someone tells me why it shouldn't be
    # it 'returns a blank string if highest_bid_amount_cents null', ->
    #   @saleArtwork.set bidder_positions_count: 6
    #   @saleArtwork.unset 'highest_bid_amount_cents'
    #   @saleArtwork.bidCount().should.equal ''

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

  describe '#pollForBidChange', ->

    it 'will poll until the highest bid on the sale artwork changes', (done) ->
      sinon.stub global, 'setInterval'
      setInterval.callsArg 0
      @saleArtwork.set highest_bid_amount_cents: 100
      @saleArtwork.pollForBidChange success: -> done()
      _.last(Backone.sync.args)[2].success()
      @saleArtwork.set highest_bid_amount_cents: 100
      _.last(Backone.sync.args)[2].success()
      @saleArtwork.set highest_bid_amount_cents: 200
      _.last(Backone.sync.args)[2].success()
      setInterval.restore()

  describe '#cleanBidAmount', ->

    it 'correctly cleans up and cleans bid amount', ->
      # Handles prices with cents
      @saleArtwork.cleanBidAmount('123.00').should.equal 12300
      # Handles prices w/ cents > 0
      @saleArtwork.cleanBidAmount('123.45').should.equal 12300
      # Handles commas
      @saleArtwork.cleanBidAmount('1,023.45').should.equal 102300
      # Handles dollar signs
      @saleArtwork.cleanBidAmount('$1,023.45').should.equal 102300
      # Handles numbers
      @saleArtwork.cleanBidAmount(1000).should.equal 100000
