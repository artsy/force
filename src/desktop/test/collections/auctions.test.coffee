Auctions = require '../../collections/auctions'
Auction = require '../../models/auction'
{ fabricate } = require '@artsy/antigravity'
moment = require 'moment'

describe 'Auctions', ->
  beforeEach ->
    @auctions = new Auctions

  describe '#opens', ->
    it 'if there are only online auctions, just sorts by end_at', ->
      sothebys = new Auction fabricate 'sale',
        id: 'input-slash-output'
        is_auction: true
        auction_state: 'open'
        end_at: moment().add 10, 'days'

      somethingelse = new Auction fabricate 'sale',
        id: 'cabbies-cool-auction'
        is_auction: true
        auction_state: 'open'
        end_at: moment().add 5, 'days'

      @auctions.add [sothebys, somethingelse]
      @auctions.opens()[0].id.should.equal 'cabbies-cool-auction'
      @auctions.opens()[1].id.should.equal 'input-slash-output'

    it 'if there are only live auctions, just sorts by live_start_at', ->
      sothebys = new Auction fabricate 'sale',
        id: 'input-slash-output'
        is_auction: true
        auction_state: 'open'
        live_start_at: moment().add 10, 'days'

      somethingelse = new Auction fabricate 'sale',
        id: 'cabbies-cool-auction'
        is_auction: true
        auction_state: 'open'
        live_start_at: moment().add 5, 'days'

      @auctions.add [sothebys, somethingelse]
      @auctions.opens()[0].id.should.equal 'cabbies-cool-auction'
      @auctions.opens()[1].id.should.equal 'input-slash-output'

    it 'if there are online and live auctions, sorts by both end_at and live_start_at', ->
      sothebys = new Auction fabricate 'sale',
        id: 'input-slash-output'
        is_auction: true
        auction_state: 'open'
        live_start_at: moment().add 10, 'days'

      somethingelse = new Auction fabricate 'sale',
        id: 'cabbies-cool-auction'
        is_auction: true
        auction_state: 'open'
        live_start_at: moment().add 5, 'days'

      anotherauction = new Auction fabricate 'sale',
        id: 'cool-catty-auction'
        is_auction: true
        auction_state: 'open'
        end_at: moment().add 7, 'days'

      @auctions.add [sothebys, somethingelse, anotherauction]
      @auctions.opens()[0].id.should.equal 'cabbies-cool-auction'
      @auctions.opens()[1].id.should.equal 'cool-catty-auction'
      @auctions.opens()[2].id.should.equal 'input-slash-output'
