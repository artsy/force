Auctions = require '../../collections/auctions'
Auction = require '../../models/auction'
{ fabricate } = require 'antigravity'

describe 'Auctions', ->
  beforeEach ->
    @auctions = new Auctions

  describe '#opens', ->
    it 'places sothebys auction at the top of the list', ->
      sothebys = new Auction fabricate 'sale',
        id: 'input-slash-output'
        is_auction: true
        auction_state: 'open'

      somethingelse = new Auction fabricate 'sale',
        id: 'cabbies-cool-auction'
        is_auction: true
        auction_state: 'open'

      @auctions.add [sothebys, somethingelse]
      @auctions.opens()[0].id.should.equal 'input-slash-output'
