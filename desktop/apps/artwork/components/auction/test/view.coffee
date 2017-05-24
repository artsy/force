accounting = require 'accounting'
benv = require 'benv'
moment = require 'moment'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'auction', ->
  before (done) ->
    sinon.stub global, 'setTimeout'
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()
    global.setTimeout.restore()

  beforeEach ->
    @ArtworkAuctionView = benv.requireWithJadeify(
      require.resolve('../view.coffee'),
      ['template']
    )
    @data =
      user: true
      me:
        bidders: [{
          qualified_for_bidding: true
        }]
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
          reserve_status: 'reserve_met'
          reserve_message: 'Reserve met'
          estimate: '$7,000–$9,000'
          current_bid: amount: '$55,000'
          counts: bidder_positions: 19
          symbol: '$'
          bid_increments: [100, 200]
          minimum_next_bid:
            amount: '$60,000'
            cents: 6000000
    @view = new @ArtworkAuctionView data: @data

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
      @ArtworkAuctionView.__set__
        CURRENT_USER: 'existy'
        AUCTION:
          artwork_id: 'peter-alexander-wedge-with-puff'
          minimum_next_bid:
            amount: '$60,000'
            cents: 6000000

    after ->
      @ArtworkAuctionView.__set__
        CURRENT_USER: null
        AUCTION: null

    beforeEach ->
      sinon.stub @ArtworkAuctionView::, 'redirectTo'
      @view.data.accounting = accounting
      @view.data.user = 'existy'
      @view.render()

    afterEach ->
      @view.redirectTo.restore()

    xit 'submits the bid by redirecting to the confirmation page', ->
      @view.$('[name="bid"]').replaceWith '<input name="bid" value="60,000">'
      @view.$('button').click()
      @view.redirectTo.args[0][0]
        .should.equal '/auction/los-angeles-modern-auctions-march-2015/bid/peter-alexander-wedge-with-puff?bid=6000000'

  describe '#render', ->
    describe 'open auction', ->
      it 'renders correctly', ->
        @view.data.accounting = accounting
        @view.render()

        @view.$el.html()
          .should.containEql '(19 bids, Reserve met)'

        @view.$('.artwork-auction__bid-form__button')
          .should.have.lengthOf 1

        @view.$('.artwork-auction__buy-now')
          .should.have.lengthOf 0

        @view.$('.js-artwork-auction-bid').attr('action')
          .should.equal "/auction/#{@view.data.artwork.sale.id}/bid/#{@view.data.artwork.id}"

      describe 'bid qualification', ->
        it 'renders a disabled "Registration Pending" button', ->
          @data.accounting = accounting
          @data.me = {
            bidders: [{
              qualified_for_bidding: false
            }]
          }
          view = new @ArtworkAuctionView data: @data
          view.render()
          view.$('.artwork-auction__bid-form__button').text()
            .should.containEql 'Registration Pending'
          view.$('.js-artwork-auction-bid').attr('action')
            .should.equal "/artwork/#{@data.artwork.id}"

        it 'renders a disabled "Registration Closed" button', ->
          @data.accounting = accounting
          @data.artwork.sale.registration_ends_at = moment().subtract(2, 'days').format()
          @data.me = {}
          view = new @ArtworkAuctionView data: @data
          view.render()
          view.$('.artwork-auction__bid-form__button').text()
            .should.containEql 'Registration Closed'
          view.$('.js-artwork-auction-bid').attr('action')
            .should.equal "/artwork/#{@data.artwork.id}"

        it 'renders a auction registration button', ->
          @data.accounting = accounting
          @data.artwork.sale.require_bidder_approval = true
          @data.me = {}
          view = new @ArtworkAuctionView data: @data
          view.render()
          view.$('a.artwork-auction__bid-form__button').length.should.equal 1
          view.$('a.artwork-auction__bid-form__button').attr('href')
            .should.equal "/auction-registration/#{@data.artwork.sale.id}"
          view.$('.js-artwork-auction-bid').attr('action')
            .should.equal "/artwork/#{@data.artwork.id}"

        it 'renders an open registration bid button', ->
          @data.accounting = accounting
          @data.artwork.sale.require_bidder_approval = false
          @data.me = {}
          view = new @ArtworkAuctionView data: @data
          view.render()
          view.$('a.artwork-auction__bid-form__button').length.should.equal 1
          view.$('a.artwork-auction__bid-form__button').attr('href')
            .should.equal "/auction/#{@data.artwork.sale.id}/bid/#{@data.artwork.id}"
          view.$('.js-artwork-auction-bid').attr('action')
            .should.equal "/artwork/#{@data.artwork.id}"

      describe 'post-bid messages', ->
        beforeEach ->
          @data = Object.assign(@data, {
            user: 'existy',
            accounting: accounting
          })

        describe 'leading bidder & reserve met', ->
          it 'gives a winning message', ->
            @data.artwork.sale_artwork.reserve_status = 'reserve_met'
            @data.me = Object.assign @data.me, {
              lot_standing:
                is_leading_bidder: true
                most_recent_bid:
                  max_bid:
                    cents: 5500000
            }
            view = new @ArtworkAuctionView data: @data
            view.render()
            view.$('.bid-status').text()
              .should.containEql 'Highest Bidder'
            view.$('.bid-status__is-winning').length.should.equal 1

        describe 'leading bidder & reserve not met', ->
          it 'gives a reserve not met message', ->
            @data.artwork.sale_artwork.reserve_status = 'reserve_not_met'
            @data.me = Object.assign @data.me, {
              lot_standing:
                is_leading_bidder: true
                most_recent_bid:
                  max_bid:
                    cents: 5500000
            }
            view = new @ArtworkAuctionView data: @data
            view.render()
            view.$('.bid-status').text()
              .should.containEql 'Highest bidder, Reserve not met'
            view.$('.bid-status__increase-bid').text()
              .should.equal 'Increase your max bid to win the lot'

        describe 'not leading bidder & reserve not met', ->
          it 'gives an outbid message', ->
            @data.artwork.sale_artwork.reserve_status = 'reserve_not_met'
            @data.me = Object.assign @data.me, {
              lot_standing:
                is_leading_bidder: false
                most_recent_bid:
                  max_bid:
                    cents: 5500000
            }
            view = new @ArtworkAuctionView data: @data
            view.render()
            view.$('.bid-status').text()
              .should.containEql 'Outbid'
            view.$('.bid-status__increase-bid').text()
              .should.equal 'Increase your max bid to win the lot'

        describe 'not leading bidder & reserve met', ->
          it 'gives an outbid message', ->
            @data.artwork.sale_artwork.reserve_status = 'reserve_met'
            @data.me = Object.assign @data.me, {
              lot_standing:
                is_leading_bidder: false
                most_recent_bid:
                  max_bid:
                    cents: 5500000
            }
            view = new @ArtworkAuctionView data: @data
            view.render()
            view.$('.bid-status').text()
              .should.containEql 'Outbid'
            view.$('.bid-status__increase-bid').text()
              .should.equal 'Increase your max bid to win the lot'

    describe 'preview auction', ->
      it 'renders correctly', ->
        data =
          accounting: accounting
          artwork:
            id: 'peter-alexander-wedge-with-puff'
            is_in_auction: true
            sale:
              id: 'los-angeles-modern-auctions-march-2015'
              name: 'Los Angeles Modern Auctions - March 2015'
              is_open: false
              is_preview: true
              is_closed: false
              is_auction: true
              is_auction_promo: false
              is_with_buyers_premium: true
            sale_artwork:
              id: 'peter-alexander-wedge-with-puff'
              estimate: '$7,000–$9,000'
              current_bid: amount: '$55,000'
              counts: bidder_positions: 0
              bid_increments: [100, 200]
              minimum_next_bid:
                amount: '$60,000'
                cents: 6000000
        view = new @ArtworkAuctionView data: data
        view.render()

        view.$('.artwork-auction__bid-status__bid').text()
          .should.equal 'Starting Bid'

        view.$('.artwork-auction__bid-form__button')
          .should.have.lengthOf 0

    describe 'closed auction', ->
      it 'renders correctly', ->
        data =
          artwork:
            id: 'peter-alexander-wedge-with-puff'
            is_in_auction: true
            sale:
              id: 'los-angeles-modern-auctions-march-2015'
              name: 'Los Angeles Modern Auctions - March 2015'
              is_open: false
              is_preview: false
              is_closed: true
              is_auction: true
              is_auction_promo: false
              is_with_buyers_premium: true
            sale_artwork:
              id: 'peter-alexander-wedge-with-puff'
              reserve_message: 'Reserve met'
              estimate: '$7,000–$9,000'
              current_bid: amount: '$55,000'
              counts: bidder_positions: 19
              bid_increments: [100, 200]
              minimum_next_bid:
                amount: '$60,000'
                cents: 6000000

        view = new @ArtworkAuctionView data: data
        view.render()

        view.$el.html()
          .should.equal '<div class="artwork-auction__bid-status"><div class="artwork-auction__bid-status__closed">Bidding Closed</div></div>'

    describe  'buy now work', ->
      it 'renders correctly', ->
        data =
          accounting: accounting
          artwork:
            id: 'peter-alexander-wedge-with-puff'
            is_in_auction: true
            is_buy_nowable: true
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
              estimate: '$7,000–$9,000'
              current_bid: amount: '$55,000'
              counts: bidder_positions: 0
              bid_increments: [100, 200]
              minimum_next_bid:
                amount: '$60,000'
                cents: 6000000

        view = new @ArtworkAuctionView data: data
        view.render()

        view.$('.artwork-auction__bid-form__button')
          .should.have.lengthOf 1

        view.$('.artwork-auction__buy-now')
          .should.have.lengthOf 1

    describe  'is sold', ->
      it 'renders correctly', ->
        data =
          accounting: accounting
          artwork:
            id: 'peter-alexander-wedge-with-puff'
            is_in_auction: true
            is_buy_nowable: true
            is_sold: true
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
              estimate: '$7,000–$9,000'
              current_bid: amount: '$55,000'
              counts: bidder_positions: 0
              bid_increments: [100, 200]
              minimum_next_bid:
                amount: '$60,000'
                cents: 6000000

        view = new @ArtworkAuctionView data: data
        view.render()

        view.$('.artwork-auction__bid-form__button')
          .should.have.lengthOf 0

        view.$('.artwork-auction__bid-status__closed')
          .should.have.lengthOf 1
