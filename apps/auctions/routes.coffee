Q = require 'q'
{ API_URL } = require('sharify').data
Auctions = require '../../collections/auctions'

setupUser = (user, auction) ->
  Q.promise (resolve) ->
    if user? and auction?
      user.checkRegisteredForAuction
        saleId: auction.id
        success: (boolean) ->
          user.set 'registered_to_bid', boolean
        error: ->
          user.set 'registered_to_bid', false
        complete: ->
          resolve user
    else
      resolve()

@index = (req, res, next) ->
  auctions = new Auctions
  auctions.url = "#{API_URL}/api/v1/sales" # Sans is_auction param due to promo sales

  auctions.fetch(
    cache: true
    data: published: true, size: 30, sort: '-created_at'
  ).then(->
    setupUser(req.user, auctions.next())
  ).then(->
    res.render 'index',
      pastAuctions: auctions.closeds()
      currentAuctions: res.locals.sd.CURRENT_AUCTIONS = auctions.opens()
      upcomingAuctions: res.locals.sd.UPCOMING_AUCTIONS = auctions.previews()
      promoAuctions: auctions.currentAuctionPromos()
      nextAuction: auctions.next()
  )
  .catch(next)
  .done()
