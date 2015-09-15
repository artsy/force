moment = require 'moment'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Sale = require '../../models/sale'
Artwork = require '../../models/artwork'

describe 'Sale', ->
  beforeEach ->
    @sd = API_URL: 'http://localhost:5000'
    @sale = new Sale fabricate 'sale'

    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#isClosingSoon', ->
    it 'returns false if the sale is closing soon', ->
      new Sale end_at: moment().add(12, 'hours').format()
        .isClosingSoon().should.be.true()

      new Sale end_at: moment().add(20, 'minutes').format()
        .isClosingSoon().should.be.true()

      new Sale end_at: moment().add(30, 'seconds').format()
        .isClosingSoon().should.be.true()

    it 'returns false if the sale is not closing soon or is already over', ->
      new Sale end_at: moment().add(5, 'second').format()
        .isClosingSoon().should.be.false()

      new Sale end_at: moment().add(2, 'days').format()
        .isClosingSoon().should.be.false()

      new Sale end_at: moment().subtract(1, 'day').format()
        .isClosingSoon().should.be.false()

  describe '#calculateAuctionState', ->
    before ->
      # moment#unix returns seconds
      # sinon#useFakeTimers accepts milliseconds
      now = moment([2010, 0, 15]).unix() * 1000
      @clock = sinon.useFakeTimers now

    after ->
      @clock.restore()

    it 'returns with the correct state (closed)', ->
      start = moment().subtract(1, 'minutes').format()
      end = moment().subtract(3, 'minutes').format()
      @sale.calculateAuctionState(start, end).should.equal 'closed'

    it 'returns with the correct state (preview)', ->
      start = moment().add(1, 'minutes').format()
      end = moment().add(3, 'minutes').format()
      @sale.calculateAuctionState(start, end).should.equal 'preview'

    it 'returns with the correct state (open)', ->
      start = moment().subtract(1, 'minutes').format()
      end = moment().add(3, 'minutes').format()
      @sale.calculateAuctionState(start, end).should.equal 'open'

    it 'accomdates offsets', ->
      start = moment().subtract(1, 'seconds').format()
      end = moment().add(1, 'seconds').format()
      @sale.calculateAuctionState(start, end, 0).should.equal 'open'
      @sale.calculateAuctionState(start, end, -999).should.equal 'open'
      @sale.calculateAuctionState(start, end, -1000).should.equal 'closed'

  describe '#parse', ->
    it 'corrects the state', ->
      staleSale = new Sale
        auction_state: 'open' # An incorrect state 'returned from the server'
        start_at: moment().subtract(1, 'minutes').format()
        end_at: moment().subtract(3, 'minutes').format()
      , parse: true
      staleSale.get('auction_state').should.equal 'closed'

  describe 'actionButtonState', ->
    beforeEach ->
      @artwork = new Artwork
      @user = new Backbone.Model

    describe 'contact', ->
      it 'returns the correct button attributes', ->
        @sale.set 'sale_type', 'auction promo'
        @sale.contactButtonState(@user, @artwork).label.should.equal 'Contact Auction House'

    describe 'buy now', ->
      it 'returns the correct button attributes', ->
        @sale.set sale_type: 'default', auction_state: 'open'
        @artwork.set acquireable: true, sold: false
        @sale.buyButtonState(@user, @artwork).label.should.equal 'Buy Now'
        @artwork.set 'sold', true
        @sale.buyButtonState(@user, @artwork).label.should.equal 'Sold'

    describe 'bid', ->
      it 'returns the correct button attributes', ->
        @sale.set sale_type: 'default', auction_state: 'preview'
        @user.set 'registered_to_bid', false
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Register to bid'
        @user.set 'registered_to_bid', true
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Registered to bid'
        @sale.set 'auction_state', 'open'
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Bid'
        @user.set 'registered_to_bid', false
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Bid'
        @sale.set 'auction_state', 'closed'
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Online Bidding Closed'
        # If the artwork is sold, then it's sold
        @sale.set 'auction_state', 'open'
        @user.set 'registered_to_bid', true
        @artwork.set 'sold', true
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Sold'

  describe '#fetchArtworks', ->

    it 'fetches the sale artworks', ->
      @sale.fetchArtworks()
      Backbone.sync.args[0][1].url.should.match /// /api/v1/sale/.*/sale_artworks ///

  describe '#registerUrl', ->

    it 'points to the secure auction registration page'
    it 'points to the signup page when not logged in'

  describe '#redirectUrl', ->

    it 'redirects to the bid page if the sale is bidable and it has an artwork and fallback to the auction page', ->
      @sale.set(is_auction: true, auction_state: 'open')
      @sale.redirectUrl(id: 'my-artwork-id').should.equal '/auction/whtney-art-party/bid/my-artwork-id'
      @sale.redirectUrl().should.equal '/auction/whtney-art-party'
      @sale.set(auction_state: 'preview')
      @sale.redirectUrl(id: 'my-artwork-id').should.equal '/auction/whtney-art-party'

  describe '#calculateOffsetTimes', ->
    describe 'client time preview', ->

      beforeEach ->
        @clock = sinon.useFakeTimers()
        @sale.set
          is_auction: true
          start_at: moment().add(1, 'minutes').format()
          end_at: moment().add(3, 'minutes').format()

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().format() }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at'))
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at'))
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add(2, 'minutes').format() }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).subtract(2, 'minutes')
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).subtract(2, 'minutes')
        @sale.get('clockState').should.equal 'open'

      it 'reflects server closed state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add(4, 'minutes').format() }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).subtract(4, 'minutes')
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).subtract(4, 'minutes')
        @sale.get('clockState').should.equal 'closed'

    describe 'client time open', ->

      beforeEach ->
        @clock = sinon.useFakeTimers()
        @sale.set
          is_auction: true
          start_at: moment().add(1, 'minutes').format()
          end_at: moment().add(3, 'minutes').format()
        @clock.tick(120000)

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().subtract(2, 'minutes').format() }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).add(2, 'minutes')
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).add(2, 'minutes')
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().format() }
        @sale.get('clockState').should.equal 'open'
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at'))
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at'))

      it 'reflects server closed state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add(2, 'minutes').format() }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).subtract(2, 'minutes')
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).subtract(2, 'minutes')
        @sale.get('clockState').should.equal 'closed'

    describe 'client time closed', ->

      beforeEach ->
        @clock = sinon.useFakeTimers()
        @sale.set
          is_auction: true
          start_at: moment().add(1, 'minutes').format()
          end_at: moment().add(3, 'minutes').format()
        @clock.tick(240000)

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().subtract(4, 'minutes').format() }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).add(4, 'minutes')
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).add(4, 'minutes')
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().subtract(2, 'minutes').format() }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).add(2, 'minutes')
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).add(2, 'minutes')
        @sale.get('clockState').should.equal 'open'

      it 'reflects server closed state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().format() }
        @sale.get('clockState').should.equal 'closed'
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at'))
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at'))
