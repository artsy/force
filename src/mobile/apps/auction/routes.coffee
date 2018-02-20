_ = require 'underscore'
Q = require 'bluebird-q'
Auction = require '../../models/auction'
SaleArtworks = require '../../collections/sale_artworks'
Artworks = require '../../collections/artworks'
State = require '../../components/auction_artwork_list/state'
request = require 'superagent'
{ getLiveAuctionUrl } = require '../../../utils/domain/auctions/urls'
{
  MAILCHIMP_KEY
  MAILCHIMP_AUCTION_LIST_ID
} = require '../../config'

nav = ->
  navItems: [
    { name: 'Lots', hasItems: true },
    { name: 'Sale Info', hasItems: true }
  ]

setupUser = (user, auction) ->
  if user?
    user.registeredForAuction auction.id,
      success: (boolean) ->
        user.set 'registered_to_bid', boolean
      error: ->
        user.set 'registered_to_bid', false

module.exports.index = (req, res, next) ->
  id = req.params.id
  state = new State
  auction = new Auction id: id
  saleArtworks = new SaleArtworks [], id: id
  artworks = new Artworks
  artworks.comparator = (artwork) -> (saleArtwork = artwork.related().saleArtwork).get('position') or saleArtwork.id

  promise = Q.all([
    auction.fetch(cache: true)
    saleArtworks.fetchUntilEndInParallel(cache: true)
    setupUser(req.user, auction)
  ]).catch(next)
  promise.done ->
    if auction.isLiveOpen()
      return res.redirect(getLiveAuctionUrl(id, { isLoggedIn: Boolean(req.user) }))
    artworks.reset Artworks.__fromSale__(saleArtworks)
    res.locals.sd.AUCTION = auction.toJSON()
    res.locals.sd.ARTWORKS = artworks.toJSON()
    res.render 'index',
      _.extend {}, {
        user: req.user
        state: state
        auction: auction
        artworks: artworks
        saleArtworks: saleArtworks
      }, nav()
  return promise
