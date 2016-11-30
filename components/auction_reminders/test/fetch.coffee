_ = require 'underscore'
Q = require 'bluebird-q'
sinon = require 'sinon'
moment = require 'moment'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
AuctionReminders = rewire '../fetch'

describe 'AuctionReminders', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
      .returns Q.resolve()

    @reminders = new AuctionReminders

    auctionClosingSoon = fabricate 'sale',
      id: 'closing-soon'
      is_auction: true
      auction_state: 'open'
      end_at: moment().add(1, 'hour').format()

    auctionNotClosingSoon = fabricate 'sale',
      id: 'not-closing-soon'
      is_auction: true
      auction_state: 'open'
      end_at: moment().add(10, 'days').format()

    auctionAlreadyOver = fabricate 'sale',
      id: 'already-over'
      is_auction: true
      auction_state: 'closed'
      end_at: moment().subtract(1, 'day').format()

    auctionLiveOpenSoon = fabricate 'sale',
      id: 'live-soon'
      is_auction: true
      auction_state: 'open'
      end_at: moment().add(3, 'hours').format()
      live_start_at: moment().add(9, 'minutes').format()
    
    auctionLiveOpenNow = fabricate 'sale',
      id: 'live-open'
      is_auction: true
      auction_state: 'open'
      end_at: moment().add(1, 'hours').format()
      live_start_at: moment().subtract(1, 'hours').format()

    auctionClosingSoonAsWell = fabricate 'sale',
      id: 'closing-soon-as-well'
      is_auction: true
      auction_state: 'open'
      end_at: moment().add(12, 'hours').format()

    @reminders.auctions.reset [
      auctionClosingSoon
      auctionNotClosingSoon
      auctionAlreadyOver
      auctionClosingSoonAsWell
      auctionLiveOpenNow
      auctionLiveOpenSoon
    ]

  afterEach ->
    Backbone.sync.restore()

  describe '#cached', (done) ->
    beforeEach ->
      @redis = redis = {}
      @cache =
        get: (k, cb) -> cb(null, redis[k])
        set: (k, v) -> redis[k] = v
      @__cache__ = AuctionReminders.__get__ 'cache'
      AuctionReminders.__set__ 'cache', @cache

    afterEach ->
      AuctionReminders.__set__ 'cache', @__cache__
      delete @redis[@reminders.key]

    it 'runs the block when there is nothing in the cache provides a setter fn for setting the cache', (done) ->
      @reminders
        .cached (resolve, reject) =>
          @cache.get @reminders.key, (err, cached) =>
            _.isUndefined(cached).should.be.true()

            resolve cached: true

            @cache.get @reminders.key, (err, cached) ->
              JSON.parse(cached).should.eql cached: true
              done()

        .done()

    it 'resolves parsed data from the cache and doesnt run the block when there is data cached', (done) ->
      @cache.set @reminders.key, '{ "cached": true }'
      @reminders
        .cached (resolve, reject) =>
          true.should.be.false() # Does not get called!

        .then (cached) ->
          cached.should.eql cached: true
          done()

        .done()

  describe '#fetch', ->
    it 'filters the data', (done) ->
      @reminders.fetch()
        .then (response) ->
          response.should.have.lengthOf 4
          _.pluck response, 'id'
            .should.eql [
              'closing-soon'
              'closing-soon-as-well'
              'live-open'
              'live-soon'
            ]

          keys = _.keys(_.first response)

          _.contains keys, 'some_key_we_dont_want'
            .should.be.false()

          _.contains keys, 'end_at'
            .should.be.true()

          done()
        .done()
