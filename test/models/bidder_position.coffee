_ = require 'underscore'
sd = require('sharify').data
{ fabricate } = require 'antigravity'
Backbone = require 'backbone'
BidderPosition = require '../../models/bidder_position'

describe 'BidderPosition', ->
  beforeEach ->
    @bidderPosition = new BidderPosition fabricate 'bidder_position',
      highest_bid: amount_cents: 550000

  describe '#currentBid', ->
    it 'returns a formatted currency string representing the highest bid amount', ->
      @bidderPosition.currentBid().should.equal '$5,500'

    it 'returns undefined when there is no highest bid', ->
      @bidderPosition.unset 'highest_bid'
      _.isUndefined(@bidderPosition.currentBid()).should.be.ok

  describe '#maxBid', ->
    it 'returns a formatted currency string representing the max bid amount', ->
      @bidderPosition.maxBid().should.equal '$3,100'
