_ = require 'underscore'
sd = require('sharify').data
{ fabricate } = require '@artsy/antigravity'
Backbone = require 'backbone'
BidderPosition = require '../../models/bidder_position'

describe 'BidderPosition', ->
  beforeEach ->
    @bidderPosition = new BidderPosition fabricate 'bidder_position',
      highest_bid: display_amount_dollars: '$5,500'
      display_max_bid_amount_dollars: '$3,100'

  describe '#currentBid', ->
    it 'returns the currency string representing the highest bid amount', ->
      @bidderPosition.currentBid().should.equal '$5,500'

    it 'returns undefined when there is no highest bid', ->
      @bidderPosition.unset 'highest_bid'
      _.isUndefined(@bidderPosition.currentBid()).should.be.ok()

  describe '#maxBid', ->
    it 'returns a formatted currency string representing the max bid amount', ->
      @bidderPosition.maxBid().should.equal '$3,100'

  describe '#url()', ->
    it 'generates the right url with an id', ->
      @bidderPosition.set(id: 'cat')
      @bidderPosition.url().should.containEql '/api/v1/me/bidder_position/cat'

    it 'generates the right url when a new model', ->
      newPosition = new BidderPosition
      sd.API_URL = 'https://api.artsy.net'
      newPosition.url().should.equal 'https://api.artsy.net/api/v1/me/bidder_position'
