moment = require 'moment'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Artwork = require '../../models/artwork'
Sale = require '../../models/sale'

describe 'Sale', ->
  beforeEach ->
    @sale = new Sale fabricate 'sale'

    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe 'reminder states', ->
    beforeEach ->
      @liveOpenSale = new Sale fabricate 'sale',
        end_at: moment().add(1, 'hours').format()
        live_start_at: moment().subtract(1, 'hours').format()
        auction_state: 'open'
      @liveSoonSale = new Sale fabricate 'sale',
        end_at: moment().add(13, 'hours').format()
        live_start_at: moment().add(8, 'minutes').format()
        auction_state: 'open'
      @closingSoonSale = new Sale fabricate 'sale',
        end_at: moment().add(12, 'hours')
        auction_state: 'open'
      @closedSale = new Sale fabricate 'sale',
        end_at: moment().subtract(1, 'day').format()
        auction_state: 'closed'
      @liveClosedSale = new Sale fabricate 'sale',
        end_at: moment().add(1, 'day').format()
        live_start_at: moment().subtract(1, 'hours').format()
        auction_state: 'closed'

    describe '#reminderStatus', ->
      it 'returns a string for a valid reminder state', ->
        @liveOpenSale.reminderStatus().should.equal 'live_open'
        @liveSoonSale.reminderStatus().should.equal 'live_open_soon'
        @closingSoonSale.reminderStatus().should.equal 'closing_soon'
      it 'returns undefined if no reminder is needed', ->
        (typeof @closedSale.reminderStatus()).should.equal 'undefined'
      it 'returns undefined for a sale that would be "closing soon" if it were not also live', ->
        sale = new Sale fabricate 'sale',
          end_at: moment().add(10, 'hours').format()
          live_start_at: moment().add(8, 'hours').format()
        (typeof sale.reminderStatus()).should.equal 'undefined'

    describe '#isClosingSoon', ->
      it 'returns true if the sale is closing soon', ->
        @closingSoonSale.isClosingSoon().should.be.true()
        new Sale fabricate 'sale', end_at: moment().add(20, 'minutes').format()
          .isClosingSoon().should.be.true()
        new Sale fabricate 'sale', end_at: moment().add(30, 'seconds').format()
          .isClosingSoon().should.be.true()
      it 'returns false if the sale is a live auction', ->
        sale = new Sale fabricate 'sale',
          end_at: moment().add(10, 'hours').format()
          live_start_at: moment().add(8, 'hours').format()
        sale.isClosingSoon().should.be.false()
      it 'returns false if the sale is not closing soon or is already over', ->
        new Sale fabricate 'sale', end_at: moment().add(5, 'second').format()
          .isClosingSoon().should.be.false()
        new Sale fabricate 'sale', end_at: moment().add(2, 'days').format()
          .isClosingSoon().should.be.false()
        @closedSale.isClosingSoon().should.be.false()

    describe '#isLiveOpenSoon', ->
      it 'returns true if the sale is opening within 10 minutes', ->
        @liveSoonSale.isLiveOpenSoon().should.be.true()
      it 'returns false if the sale is closed', ->
        new Sale fabricate 'sale',
          end_at: moment().subtract(1, 'hours').format()
          live_start_at: moment().subtract(2, 'hours').format()
        .isLiveOpenSoon().should.be.false()
      it 'returns false if a live auction is not opening within 10 minutes', ->
        new Sale fabricate 'sale',
          end_at: moment().add(36, 'hours').format()
          live_start_at: moment().add(25, 'hours').format()
        .isLiveOpenSoon().should.be.false()

      # could this happen? Should this throw or log somewhere?
      it 'returns false if for some reason the sale ends before live starts', ->
        new Sale fabricate 'sale',
          end_at: moment().add(10, 'hours').format()
          live_start_at: moment().add(12, 'hours').format()
        .isLiveOpenSoon().should.be.false()

    describe '#isLiveOpen', ->
      it 'returns true if sale is currently open for live bidding', ->
        @liveOpenSale.isLiveOpen().should.be.true()
      it 'returns false if it is not live_start_at time yet', ->
        sale = new Sale fabricate 'sale',
          end_at: moment().add(1, 'hours').format()
          live_start_at: moment().add(30, 'minutes').format()
          auction_state: 'open'
        sale.isLiveOpen().should.be.false()
      it 'returns false if sale has a live property of false', ->
        sale = new Sale fabricate 'sale',
          end_at: moment().add(10, 'hours').format()
          live_start_at: moment().subtract(30, 'minutes').format()
          auction_state: 'closed'
        sale.isLiveOpen().should.be.false()
      it 'returns false if sale is not a live auction', ->
        sale = new Sale fabricate 'sale',
          end_at: moment().add(1, 'hours').format()
        sale.isLiveOpen().should.be.false()


    describe '#isRegistrationEnded', ->
      it 'returns false if there is no registration_ends_at', ->
        @sale.set is_auction: true, registration_ends_at: null
        @sale.isRegistrationEnded().should.be.false()
      it 'returns false if the registration_ends_at is in the future', ->
        @sale.set is_auction: true, registration_ends_at: moment().add(2, 'days').format()
        @sale.isRegistrationEnded().should.be.false()
      it 'returns true if the registration_ends_at is in the past', ->
        @sale.set is_auction: true, registration_ends_at: moment().subtract(2, 'days').format()
        @sale.isRegistrationEnded().should.be.true()

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
        @sale.buyButtonState(@user, @artwork).label.should.equal 'Buy now'
        @artwork.set 'sold', true
        @sale.buyButtonState(@user, @artwork).label.should.equal 'Sold'

    describe 'bid', ->
      it 'shows Register to bid if auction is a preview', ->
        @sale.set sale_type: 'default', auction_state: 'preview'
        @user.set 'registered_to_bid', false
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Register to bid'

      it 'shows Registered to Bid if user has already registered', ->
        @sale.set sale_type: 'default', auction_state: 'preview'
        @user.set 'registered_to_bid', true
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Registered to bid'

      it 'shows Bid if the auction is open', ->
        @sale.set sale_type: 'default', auction_state: 'preview'
        @sale.set 'auction_state', 'open'
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Bid'

      it 'shows Auction Closed if the auction is closed', ->
        @sale.set sale_type: 'default', auction_state: 'preview'
        @sale.set 'auction_state', 'closed'
        @artwork.set sold: true, acquireable: false
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Auction Closed'

      it 'shows Sold if the artwork is sold', ->
        # If the artwork is sold, then it's sold
        @sale.set 'auction_state', 'open'
        @user.set 'registered_to_bid', true
        @artwork.set 'sold', true
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Sold'

      it 'shows Registration Closed when registration is closed', ->
        @sale.set is_auction: true, registration_ends_at: moment().subtract(2, 'days').format()
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Registration Closed'

      it 'shows Registration Pending if user is awaiting approval and registration closed', ->
        @sale.set is_auction: true, registration_ends_at: moment().subtract(2, 'days').format()
        @user.set 'registered_to_bid', true
        @user.set 'qualified_for_bidding', false
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Registration Pending'

      it 'shows Registration Pending if user is awaiting approval', ->
        @user.set 'registered_to_bid', true
        @user.set 'qualified_for_bidding', false
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Registration Pending'

      it 'shows Bid if user has been qualified, even if registration is closed', ->
        @sale.set is_auction: true, registration_ends_at: moment().subtract(2, 'days').format()
        @user.set 'registered_to_bid', true
        @user.set 'qualified_for_bidding', true
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Bid'

      it 'shows Enter Live Auction if live auction has opened', ->
        @sale.set is_auction: true, live_start_at: moment().subtract(2, 'days').format(), end_at: moment().add(1, 'days').format(), auction_state: 'open'
        @sale.set is_auction: true, registration_ends_at: moment().subtract(2, 'days').format()
        @user.set 'registered_to_bid', true
        @user.set 'qualified_for_bidding', true
        @sale.bidButtonState(@user, @artwork).label.should.equal 'Enter Live Auction'

  describe 'endedTime', ->
    it 'returns the end_at if the sale has an end_at', ->
      @sale.set end_at: moment('2016-12-30')
      @sale.endedTime().format('MMM D, YYYY').should.equal 'Dec 30, 2016'

    it 'returns the ended_at if the sale has no end_at', ->
      @sale.set end_at: null, ended_at: moment('2016-12-30')
      @sale.endedTime().format('MMM D, YYYY').should.equal 'Dec 30, 2016'

  describe '#fetchArtworks', ->

    it 'fetches the sale artworks', ->
      @sale.fetchArtworks()
      Backbone.sync.args[0][1].url().should.match /// /api/v1/sale/.*/sale_artworks ///

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
        @sale.get('offsetStartAtMoment').unix().should.eql moment(@sale.get('start_at')).unix()
        @sale.get('offsetEndAtMoment').unix().should.eql moment(@sale.get('end_at')).unix()
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add(2, 'minutes').format() }
        @sale.get('offsetStartAtMoment').unix().should.eql moment(@sale.get('start_at')).subtract(2, 'minutes').unix()
        @sale.get('offsetEndAtMoment').unix().should.eql moment(@sale.get('end_at')).subtract(2, 'minutes').unix()
        @sale.get('clockState').should.equal 'open'

      it 'reflects server closed state', ->
        @sale.set(auction_state: 'closed')
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add(4, 'minutes').format() }
        @sale.get('offsetStartAtMoment').unix().should.eql moment(@sale.get('start_at')).subtract(4, 'minutes').unix()
        @sale.get('offsetEndAtMoment').unix().should.eql moment(@sale.get('end_at')).subtract(4, 'minutes').unix()
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
        @sale.get('offsetStartAtMoment').unix().should.eql moment(@sale.get('start_at')).add(2, 'minutes').unix()
        @sale.get('offsetEndAtMoment').unix().should.eql moment(@sale.get('end_at')).add(2, 'minutes').unix()
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().format() }
        @sale.get('clockState').should.equal 'open'
        @sale.get('offsetStartAtMoment').unix().should.eql moment(@sale.get('start_at')).unix()
        @sale.get('offsetEndAtMoment').unix().should.eql moment(@sale.get('end_at')).unix()

      it 'reflects server closed state', ->
        @sale.set(auction_state: 'closed')
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add(2, 'minutes').format() }
        @sale.get('offsetStartAtMoment').unix().should.eql moment(@sale.get('start_at')).subtract(2, 'minutes').unix()
        @sale.get('offsetEndAtMoment').unix().should.eql moment(@sale.get('end_at')).subtract(2, 'minutes').unix()
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
        @sale.get('offsetStartAtMoment').unix().should.eql moment(@sale.get('start_at')).add(4, 'minutes').unix()
        @sale.get('offsetEndAtMoment').unix().should.eql moment(@sale.get('end_at')).add(4, 'minutes').unix()
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().subtract(2, 'minutes').format() }
        @sale.get('offsetStartAtMoment').unix().should.eql moment(@sale.get('start_at')).add(2, 'minutes').unix()
        @sale.get('offsetEndAtMoment').unix().should.eql moment(@sale.get('end_at')).add(2, 'minutes').unix()
        @sale.get('clockState').should.equal 'open'

      it 'reflects server closed state', ->
        @sale.set(auction_state: 'closed')
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().format() }
        @sale.get('clockState').should.equal 'closed'
        @sale.get('offsetStartAtMoment').unix().should.eql moment(@sale.get('start_at')).unix()
        @sale.get('offsetEndAtMoment').unix().should.eql moment(@sale.get('end_at')).unix()

  describe '#event', ->
    it 'returns an event in the correct timezone for an online sale', ->
      time = moment('2017-02-11T17:00:00+00:00').utc()
      @sale.set
        start_at: moment('2017-02-11T17:00:00+00:00')
        end_at: moment('2017-02-13T17:00:00+00:00')
      @sale.event().get('start_at').should
        .eql '2017-02-11T12:00:00'
      @sale.event().get('end_at').should
        .eql '2017-02-13T12:00:00'

    it 'returns an event in the correct timezone for a live sale', ->
      time = moment('2017-02-11T17:00:00+00:00').utc()
      @sale.set
        start_at: moment('2017-02-09T17:00:00+00:00')
        live_start_at: moment('2017-02-11T17:00:00+00:00')
        end_at: moment('2017-02-13T17:00:00+00:00')
      @sale.event().get('start_at').should
        .eql '2017-02-11T12:00:00'
      @sale.event().get('end_at').should
        .eql '2017-02-11T16:00:00'

  describe '#upcomingLabel', ->
    it 'renders the correct opening label when EDT', ->
      time = moment('2016-11-02 12:00:00', 'YYYY-MM-DD HH:mm:ss').utc()
      @sale.isPreviewState = -> true
      @sale.set
        start_at: time
        end_at: time.add(2, 'days')
      @sale.upcomingLabel().should
        .containEql 'Auction opens Nov 4'
      @sale.upcomingLabel().should
        .containEql 'EDT'

    it 'renders the correct opening label when EST', ->
      time = moment('2016-1-02 12:00:00', 'YYYY-MM-DD HH:mm:ss').utc()
      @sale.isPreviewState = -> true
      @sale.set
        start_at: time
        end_at: time.add(2, 'days')
      @sale.upcomingLabel().should
        .containEql 'Auction opens Jan 4'
      @sale.upcomingLabel().should
        .containEql 'EST'

  describe '#sortableDate', ->
    it 'returns the live_start_at if it exists', ->
      @sale.set
        end_at: moment().add 2, 'days'
        live_start_at: moment().add 1, 'days'
      @sale.sortableDate().should.eql @sale.get('live_start_at')

    it 'returns the end_at if no live_start_at exists', ->
      @sale.set
        end_at: moment().add 2, 'days'
      @sale.sortableDate().should.eql @sale.get('end_at')
