_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
helpers = require '../../../helpers.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork bid templates', ->
  beforeEach ->
    @artwork = fabricate 'artwork'
    auction = fabricate 'sale', {
      is_auction: true
      is_open: true
      sale_artwork: fabricate 'sale_artwork', {
        reserve_status: 'reserve_not_met'
        current_bid:
          amount: '$7,000'
        counts:
          bidder_positions: 3
      }
    }
    global.window = {}
    @artwork.auction = auction

    @data =
      artwork: @artwork
      helpers: helpers
      me:
        bidders: [{
          qualified_for_bidding: true
        }]
      sd: {}
      asset: (->)
      _: _

  afterEach ->
    delete global.window

  describe 'bid qualification', ->
    it 'renders correctly', ->
      @html = render('index')(@data)
      @$ = cheerio.load(@html)

      @$('.auction-avant-garde-black-button').html()
        .should.not.containEql 'disabled'
      @$('.auction-avant-garde-black-button').text()
        .should.equal 'Bid'
      @$('.artwork-auction-bid-form.js-artwork-auction-bid-form').attr('action')
        .should.containEql '/auction/whtney-art-party/bid'

    it 'renders a disabled "Registration Pending" button', ->
      @data.me = {
        bidders: [{
          qualified_for_bidding: false
        }]
      }

      @html = render('index')(@data)
      @$ = cheerio.load(@html)

      @$('.auction-avant-garde-black-button').attr('disabled')
        .should.equal 'disabled'
      @$('.auction-avant-garde-black-button').text()
        .should.equal 'Registration Pending'
      @$('.artwork-auction-bid-form.js-artwork-auction-bid-form').attr('action')
        .should.containEql "/artwork/#{@data.artwork.id}"

    it 'renders a disabled "Registration Closed" button', ->
      @data.artwork.auction.is_registration_closed = true
      @data.me = {}
      @html = render('index')(@data)
      @$ = cheerio.load(@html)

      @$('.auction-avant-garde-black-button').attr('disabled')
        .should.equal 'disabled'
      @$('.auction-avant-garde-black-button').text()
        .should.equal 'Registration Closed'
      @$('.artwork-auction-bid-form.js-artwork-auction-bid-form').attr('action')
        .should.containEql "/artwork/#{@data.artwork.id}"

    it 'renders an auction registration button', ->
      @data.artwork.auction.require_bidder_approval = true
      @data.me = {}
      @html = render('index')(@data)
      @$ = cheerio.load(@html)

      JSON.stringify(@$('.auction-avant-garde-black-button').attr()).should.not.containEql 'disabled'
      @$('.auction-avant-garde-black-button').text()
        .should.equal 'Bid'
      @$('.artwork-auction-bid-form.js-artwork-auction-bid-form').attr('action')
        .should.containEql "/artwork/#{@data.artwork.id}"

  describe 'sold artwork in open auction', ->
    beforeEach ->
      @data.artwork.auction.is_open = true
      @data.artwork.is_sold = true
      @html = render('index')(@data)
      @$ = cheerio.load(@html)

    it 'displays sold', ->
      @$('.artwork-auction-bid-module__sold').text().should.equal 'Sold'

    it 'does not display a bid button', ->
      @$('.auction-avant-garde-black-button').should.not.exist

    it 'does not show bidding info', ->
      @artwork.auction.sale_artwork.counts.bidder_positions = 1
      @html = render('index')(@data)
      @$ = cheerio.load(@html)
      @$('.artwork-auction-bid-module__bid-status-count').should.not.exist

  describe 'artwork in open auction that is not sold', ->
    beforeEach ->
      @data.artwork.auction.is_open = true
      @html = render('index')(@data)
      @$ = cheerio.load(@html)

    it 'display artwork current bid, bid counts, reserve status', ->
      @$('.artwork-auction-bid-module__bid-status-amount').text().should.equal '$7,000'
      # FIXME: Below string comparison is equal, yet test still fails. Odd.
      # @$('.artwork-auction-bid-module__bid-status-count').text().should.eql '3 Bids, Reserve not met'

    it 'displays form with correct action', ->
      @$('.artwork-auction-bid-form.js-artwork-auction-bid-form').attr('action')
        .should.containEql '/auction/whtney-art-party/bid/skull'

    it 'displays an enabled bid button', ->
      JSON.stringify(@$('.auction-avant-garde-black-button').attr()).should.not.containEql 'disabled'
      @$('.auction-avant-garde-black-button').text().should.equal 'Bid'

    describe 'bid-status-count formatting', ->
      it 'displays singular "1 Bid" for one bid', ->
        @data.artwork.auction.sale_artwork.counts.bidder_positions = 1
        @html = render('index')(@data)
        @$ = cheerio.load(@html)
        @$('.artwork-auction-bid-module__bid-status-count').text().should.containEql '1 Bid'

      it 'displays plural "x Bids" for plural bids', ->
        @data.artwork.auction.sale_artwork.counts.bidder_positions = 7
        @html = render('index')(@data)
        @$ = cheerio.load(@html)
        @$('.artwork-auction-bid-module__bid-status-count').text().should.containEql '7 Bids'

      it 'displays reserve status correctly with bids', ->
        @data.artwork.auction.sale_artwork.counts.bidder_positions = 1
        @html = render('index')(@data)
        @$ = cheerio.load(@html)
        @$('.artwork-auction-bid-module__bid-status-count').text().should.containEql ', Reserve not met'

      it 'displays reserve status correctly with no bids - reserve message only', ->
        @data.artwork.auction.sale_artwork.counts.bidder_positions = 0
        @data.artwork.auction.sale_artwork.reserve_status = 'reserve_met'
        @html = render('index')(@data)
        @$ = cheerio.load(@html)
        @$('.artwork-auction-bid-module__bid-status-count').text().should.equal 'Reserve met'

  describe 'bidder with bidder positions', ->
    beforeEach ->
      @data.artwork.auction.is_open = true
      @data.me =  Object.assign {}, @data.me, {
        id: 'my unique id',
        lot_standing: {
          is_leading_bidder: true
        }
      }

    it 'displays user bidder status - highest bid & reserve does not apply', ->
      @data.artwork.auction.sale_artwork.reserve_status = 'reserve_met'
      @html = render('index')(@data)
      @$ = cheerio.load(@html)
      @$('.bid-status-message p').text().should.match /^Highest Bidder\n/

    it 'displays user bidder status - leading bidder & reserve not met', ->
      @data.artwork.auction.sale_artwork.reserve_status = 'no.'
      @data.me =  Object.assign {}, @data.me, { id: 'my unique id', lot_standing: { is_leading_bidder: true } }
      @data.artwork.auction.sale_artwork.reserve_status = 'reserve_not_met'
      @html = render('index')(@data)
      @$ = cheerio.load(@html)
      @$('.bid-status-message__is-winning-reserve-not-met').text().should.containEql 'Highest Bidder'

    it 'displays user bidder status - outbid, reserve not met', ->
      @data.me =  Object.assign {}, @data.me, { id: 'my unique id', lot_standing: { is_leading_bidder: false } }
      @html = render('index')(@data)
      @$ = cheerio.load(@html)
      @$('.bid-status-message p').text().should.containEql 'Outbid'

    it 'displays user bidder status - outbid, reserve does not apply', ->
      @data.me =  Object.assign {}, @data.me, { id: 'my unique id', lot_standing: { is_leading_bidder: false } }
      @html = render('index')(@data)
      @$ = cheerio.load(@html)
      @$('.bid-status-message p').text().should.containEql 'Outbid'

    it 'displays correct bidding amount label with bids', ->
      @data.me =  Object.assign {}, @data.me, { id: 'my unique id', lot_standing: { is_leading_bidder: false } }
      @html = render('index')(@data)
      @$ = cheerio.load(@html)
      @$('.artwork-auction-bid-module__bid-status-title').text().should.equal 'Current Bid:'

  describe 'ask a specialist', ->
    beforeEach ->
      @data.artwork.auction.is_open = true
      @html = render('index')(@data)
      @$ = cheerio.load(@html)

    it 'displays link to ask a specialist', ->
      @$('.ask-a-specialist').attr('href').should.containEql '/ask_specialist'

  describe 'bidder with no bidder positions', ->
    beforeEach ->
      @data.artwork.auction.is_open = true
      @data.me =  Object.assign {}, @data.me, { id: 'my unique id', lot_standing: null }
      @html = render('index')(@data)
      @$ = cheerio.load(@html)

    it 'displays no bidder status', ->
      @$('.bid-status-message p').should.not.exist

  describe 'artwork in a closed auction', ->
    beforeEach ->
      @data.artwork.auction.is_open = false
      @html = render('index')(@data)
      @$ = cheerio.load(@html)

    it 'displays auction closed', ->
      @$('.artwork-auction-bid-module__closed').text().should.equal 'Auction Closed'

    describe 'sold artwork in open auction', ->
      beforeEach ->
        @artwork.is_sold = true
        @html = render('index')(@data)
        @$ = cheerio.load(@html)

      it 'displays sold', ->
        @$('.artwork-auction-bid-module__sold').text().should.equal 'Sold'


  describe 'artwork in auction with zero bids', ->
    beforeEach ->
      @data.artwork.auction = fabricate 'sale',
        is_auction: true
        is_open: true
        sale_artwork: fabricate 'sale_artwork',
          reserve_status: 'reserve_not_met'
          current_bid:
            amount: '$600'
          counts:
            bidder_positions: 0

    it 'displays the correct bidding label with zero bids', ->
      @html = render('index')(@data)
      @$ = cheerio.load(@html)
      @$('.artwork-auction-bid-module__bid-status-title').text().should.equal 'Starting Bid:'

    it 'do not display number of bids', ->
      @html = render('index')(@data)
      @$ = cheerio.load(@html)
      @$('.artwork-auction-bid-module__bid-status-count').text().should.equal 'Reserve not met'
