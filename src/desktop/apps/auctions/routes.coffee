{ API_URL } = require('sharify').data
Auctions = require '../../collections/auctions'
metaphysics = require '../../../lib/metaphysics'
require '../../../lib/promiseDone'

setupUser = (user, auction) ->
  if user? and auction?
    user.checkRegisteredForAuction(
      saleId: auction.id
      success: (boolean) -> user.set 'registered_to_bid', boolean
      error: -> user.set 'registered_to_bid', false
    )
  else
    new Promise (resolve) -> resolve()

@index = (req, res, next) ->
  auctions = new Auctions
  auctions.url = "#{API_URL}/api/v1/sales" # Sans is_auction param due to promo sales

  auctions.fetch(
    data: published: true, size: 100, sort: '-timely_at,name'
  ).then(->
    setupUser(req.user, auctions.next())
  ).then((userData) ->
    res.render 'index',
      pastAuctions: auctions.closeds()
      currentAuctions: res.locals.sd.CURRENT_AUCTIONS = auctions.opens()
      upcomingAuctions: res.locals.sd.UPCOMING_AUCTIONS = auctions.previews()
      promoAuctions: auctions.currentAuctionPromos()
      nextAuction: auctions.next()
      myActiveBids: userData?[1]?.me.bidder_positions
  )
  .catch(next)
  .done()

@redirectAuction = (req, res) ->
  res.redirect 301, req.url.replace 'auction', 'auctions'

