Q = require 'bluebird-q'
cache = require '../../lib/cache'
Auctions = require '../../collections/auctions'

module.exports = class AuctionReminders
  key: 'auction-reminders'

  expires: 1800 # 30 minutes

  attrs: [
    'id'
    'name'
    'start_at'
    'live_start_at'
    'registration_ends_at'
    'end_at'
    'sale_type'
    'is_auction'
    'image_versions'
    'image_url'
    'auction_state'
  ]

  constructor: ->
    @auctions = new Auctions

  cached: (callback) ->
    Q.promise (resolve, reject) =>
      set = (data) =>
        cache.set @key, JSON.stringify(data), @expires
        resolve data

      cache.get @key, (err, cached) =>
        return reject err if err?
        return resolve JSON.parse(cached) if cached?
        callback set, reject

  fetch: ->
    @cached (resolve, reject) =>
      @auctions
        .fetch
          cache: true
          data:
            live: true
            published: true
            is_auction: true
        .then =>
          @auctions.reset @auctions.filter (x) -> x.reminderStatus()
          resolve @auctions.invoke('pick', @attrs)
        .catch reject
        .done()
