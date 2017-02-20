_ = require 'underscore'
Q = require 'bluebird-q'
Auction = require '../../models/auction'
SaleArtworks = require '../../collections/sale_artworks'
Artworks = require '../../collections/artworks'
State = require '../../components/auction_artwork_list/state'
request = require 'superagent'
{
  MAILCHIMP_KEY
  MAILCHIMP_AUCTION_LIST_ID
  PREDICTION_URL
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
  artworks.comparator = (artwork) ->
    (saleArtwork = artwork.related().saleArtwork).get('lot_number') or saleArtwork.id

  Q.all([
    auction.fetch(cache: true)
    saleArtworks.fetchUntilEndInParallel(cache: true)
    setupUser(req.user, auction)
  ]).catch(next).done ->
    if auction.isLiveOpen()
      return res.redirect(
        "#{PREDICTION_URL}/#{auction.get 'id'}" +
        if req.user then '/login' else ''
      )
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

module.exports.subscribe = (req, res, next) ->
  request.post('https://us1.api.mailchimp.com/2.0/lists/subscribe')
    .send(
      apikey: MAILCHIMP_KEY
      id: MAILCHIMP_AUCTION_LIST_ID
      email: email: req.body.email
      merge_vars: "AUCTION_#{req.params.id}": true
      double_optin: false
      send_welcome: false
    ).end (err, response) ->
      if response.ok or response.body?.error.match('already subscribed')
        res.render 'subscribed', auctionId: req.params.id, email: req.body.email
      else
        return next err or new Error response.body.error
