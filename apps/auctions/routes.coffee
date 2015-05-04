_ = require 'underscore'
Q = require 'q'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'
Auctions = require '../../collections/auctions'

determineFeature = (id, cb) ->
  new Backbone.Collection().fetch
    cache: true
    url: "#{API_URL}/api/v1/sets/contains?item_type=Sale&item_id=#{id}"
    success: (collection, response, options) ->
      cb collection.first().get('owner')

setupCurrentAuction = (auction) ->
  dfd = Q.defer()
  determineFeature auction.id, (owner) ->
    (feature = auction.related().feature).set 'id', owner.id
    feature.fetch(cache: true, success: dfd.resolve, error: dfd.resolve)
  dfd.promise

setupCurrentAuctions = (auctions) ->
  dfd = Q.defer()
  Q.all(_.map(auctions, setupCurrentAuction))
    .done dfd.resolve
  dfd.promise

setupUser = (user, auction) ->
  dfd = Q.defer()
  if user?
    user.checkRegisteredForAuction saleId: auction.id, success: (boolean) ->
      user.set 'registered_to_bid', boolean
      dfd.resolve user
  else
    dfd.resolve user
  dfd.promise

@index = (req, res) ->
  auctions = new Auctions
  auctions.comparator = (auction) ->
    -(Date.parse auction.get('end_at'))

  auctions.fetch
    cache: true
    data: published: true, size: 20, sort: '-created_at'
    success: (collection, response, options) ->
      [preview, open, closed] = _.map ['preview', 'open', 'closed'], (state) ->
        auctions.select (auction) ->
          auction.get('auction_state') is state and !auction.isAuctionPromo()

      promo = auctions.select (auction) -> auction.isAuctionPromo()

      nextAuction = preview[0]

      res.locals.sd.CURRENT_AUCTIONS = open
      res.locals.sd.UPCOMING_AUCTIONS = preview

      Q.all([
        setupCurrentAuctions(open)
        setupUser(req.user, nextAuction) if nextAuction?
      ]).done ->

        res.render 'index',
          pastAuctions: closed
          currentAuctions: open
          upcomingAuctions: preview
          promoAuctions: promo
          nextAuction: nextAuction if nextAuction?

@redirect = (req, res) ->
  new Backbone.Collection().fetch
    cache: true
    url: "#{API_URL}/api/v1/sets/contains?item_type=Sale&item_id=#{req.params.id}"
    error: res.backboneError
    success: (collection, response, options) ->
      res.redirect "/feature/#{collection.first().get('owner').id}"
