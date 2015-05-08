_ = require 'underscore'
Q = require 'q'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'
Sales = require '../../collections/sales'
Auctions = require '../../collections/auctions'

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
  auctions.url = "#{API_URL}/api/v1/sales" # Sans is_auction param due to promo sales
  auctions.comparator = (auction) ->
    -(Date.parse auction.get('end_at'))
  auctions.fetch
    cache: true
    data: published: true, size: 30, sort: '-created_at'
    success: (collection, response, options) ->
      [preview, open, closed] = _.map ['preview', 'open', 'closed'], (state) ->
        auctions.select (auction) ->
          auction.isAuction() and
          auction.get('auction_state') is state and
          not auction.isAuctionPromo()

      promo = auctions.select (auction) -> auction.isAuctionPromo()

      nextAuction = preview[0]

      Q.all([
        setupUser(req.user, nextAuction) if nextAuction?
      ]).done ->
        res.locals.sd.CURRENT_AUCTIONS = open
        res.locals.sd.UPCOMING_AUCTIONS = preview

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
