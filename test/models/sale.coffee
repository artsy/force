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

  describe 'actionButtonState', ->
    beforeEach ->
      @artwork = new Artwork
      @user = new Backbone.Model

    describe 'contact', ->
      it 'returns the correct button attributes', ->
        @sale.set 'sale_type', 'auction promo'
        @sale.actionButtonState(@user, @artwork).label.should.equal 'Contact Auction House'

    describe 'buy now', ->
      it 'returns the correct button attributes', ->
        @sale.set sale_type: 'default', auction_state: 'open'
        @artwork.set acquireable: true, sold: false
        @sale.actionButtonState(@user, @artwork).label.should.equal 'Buy Now'
        @artwork.set 'sold', true
        @sale.actionButtonState(@user, @artwork).label.should.equal 'Sold'

    describe 'bid', ->
      it 'returns the correct button attributes', ->
        @sale.set sale_type: 'default', auction_state: 'preview'
        @user.set 'registered_to_bid', false
        @sale.actionButtonState(@user, @artwork).label.should.equal 'Register to bid'
        @user.set 'registered_to_bid', true
        @sale.actionButtonState(@user, @artwork).label.should.equal 'Registered to bid'
        @sale.set 'auction_state', 'open'
        @sale.actionButtonState(@user, @artwork).label.should.equal 'Bid'
        @user.set 'registered_to_bid', false
        @sale.actionButtonState(@user, @artwork).label.should.equal 'Bid'
        @sale.set 'auction_state', 'closed'
        @sale.actionButtonState(@user, @artwork).label.should.equal 'Online Bidding Closed'

    describe 'fallback', ->
      it 'returns the correct button attributes', ->
        @sale.actionButtonState(null, @artwork).label.should.equal 'View'

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
          start_at: moment().add('minutes', 1).format("YYYY-MM-DD HH:mm:ss ZZ")
          end_at: moment().add('minutes', 3).format("YYYY-MM-DD HH:mm:ss ZZ")

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at'))
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at'))
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().add('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).subtract('minutes', 2)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).subtract('minutes', 2)
        @sale.get('clockState').should.equal 'open'

      it 'reflects server closed state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().add('minutes', 4).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).subtract('minutes', 4)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).subtract('minutes', 4)
        @sale.get('clockState').should.equal 'closed'

    describe 'client time open', ->

      beforeEach ->
        @clock = sinon.useFakeTimers()
        @sale.set
          is_auction: true
          start_at: moment().add('minutes', 1).format("YYYY-MM-DD HH:mm:ss ZZ")
          end_at: moment().add('minutes', 3).format("YYYY-MM-DD HH:mm:ss ZZ")
        @clock.tick(120000)

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().subtract('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).add('minutes', 2)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).add('minutes', 2)
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('clockState').should.equal 'open'
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at'))
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at'))

      it 'reflects server closed state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().add('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).subtract('minutes', 2)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).subtract('minutes', 2)
        @sale.get('clockState').should.equal 'closed'

    describe 'client time closed', ->

      beforeEach ->
        @clock = sinon.useFakeTimers()
        @sale.set
          is_auction: true
          start_at: moment().add('minutes', 1).format("YYYY-MM-DD HH:mm:ss ZZ")
          end_at: moment().add('minutes', 3).format("YYYY-MM-DD HH:mm:ss ZZ")
        @clock.tick(240000)

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().subtract('minutes', 4).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).add('minutes', 4)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).add('minutes', 4)
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().subtract('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).add('minutes', 2)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).add('minutes', 2)
        @sale.get('clockState').should.equal 'open'

      it 'reflects server closed state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('clockState').should.equal 'closed'
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at'))
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at'))
