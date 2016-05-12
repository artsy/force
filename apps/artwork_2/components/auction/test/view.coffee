benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
ArtworkAuctionView = benv.requireWithJadeify require.resolve('../view.coffee'), ['template']

describe 'auction', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new ArtworkAuctionView data:
      artwork:
        id: 'peter-alexander-wedge-with-puff'
        is_in_auction: true
        sale:
          id: 'los-angeles-modern-auctions-march-2015'
          name: 'Los Angeles Modern Auctions - March 2015'
          is_open: true
          is_preview: false
          is_closed: false
          is_auction: true
          is_auction_promo: false
          is_with_buyers_premium: true
          sale_artwork:
            id: 'peter-alexander-wedge-with-puff'
            reserve_message: 'Reserve met'
            estimate: '$7,000–$9,000'
            current_bid: 'amount': '$55,000'
            counts: bidder_positions: 19
            minimum_next_bid:
              amount: '$60,000'
              cents: 6000000

  describe '#render', ->
    it 'renders correctly', ->
      @view.render().$el.html()
        .should.containEql '(19 bids, Reserve met)'

  describe '#parseBid', ->
    it 'Handles prices with cents', ->
      @view.parseBid '123.00'
        .should.equal 12300

    it 'Handles prices w/ cents > 0', ->
      @view.parseBid '123.45'
        .should.equal 12345

    it 'Handles commas', ->
      @view.parseBid '1,023.45'
        .should.equal 102345

    it 'Handles dollar signs', ->
      @view.parseBid '$1,023.45'
        .should.equal 102345

    it 'Handles numbers', ->
      @view.parseBid 1000
        .should.equal 100000

  describe '#submit', ->
    before ->
      ArtworkAuctionView.__set__
        CURRENT_USER: 'existy'
        AUCTION:
          artwork_id: 'peter-alexander-wedge-with-puff'
          minimum_next_bid:
            amount: '$60,000'
            cents: 6000000

    after ->
      ArtworkAuctionView.__set__
        CURRENT_USER: null
        AUCTION: null

    beforeEach ->
      sinon.stub ArtworkAuctionView::, 'redirectTo'

      @view.data.user = 'existy'
      @view.render()

    afterEach ->
      @view.redirectTo.restore()

    it 'submits the bid by redirecting to the confirmation page', ->
      @view.$('input[name="bid"]').val '60,000'
      @view.$('button').click()
      @view.redirectTo.args[0][0]
        .should.equal '/auction/los-angeles-modern-auctions-march-2015/bid/peter-alexander-wedge-with-puff?bid=6000000'
