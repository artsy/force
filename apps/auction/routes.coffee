_ = require 'underscore'
Q = require 'bluebird-q'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'
Auction = require '../../models/auction'
Feature = require '../../models/feature'
Profile = require '../../models/profile'
SaleArtworks = require '../../collections/sale_artworks'
Artworks = require '../../collections/artworks'
OrderedSets = require '../../collections/ordered_sets'
Articles = require '../../collections/articles'
State = require '../../components/auction_artworks/models/state'
footerItems = require './footer_items'
metaphysics = require '../../lib/metaphysics'
myActiveBidsQuery = require '../../components/my_active_bids/query'
{ SAILTHRU_AUCTION_NOTIFICATION_LIST, SAILTHRU_KEY, SAILTHRU_SECRET } = require '../../config'
sailthru = require('sailthru-client').createSailthruClient(SAILTHRU_KEY,SAILTHRU_SECRET)

setupUser = (user, auction) ->
  if user?
    Q.all [
      user.fetch() # Complete-fetch required to get at bidder number
      user.checkRegisteredForAuction(
        saleId: auction.id
        success: (boolean) ->
          user.set 'registered_to_bid', boolean
        error: ->
          user.set 'registered_to_bid', false
      )
      metaphysics(query: myActiveBidsQuery, req: user: user)
        .catch(-> me: bidder_positions: [])
        .then((data) ->
          bids =_.filter data.me.bidder_positions, (position) ->
            position.sale_artwork.sale_id is auction.id
          _.sortBy bids, (bid) -> bid.is_winning
        )
    ]
  else
    Q.resolve()

@index = (req, res, next) ->
  id = req.params.id
  user = req.user
  auction = new Auction id: id
  saleArtworks = new SaleArtworks [], id: id
  articles = new Articles
  state = new State
  artworks = new Artworks
  myActiveBids = null

  artworks.comparator = (artwork) ->
    saleArtwork = artwork.related().saleArtwork
    saleArtwork.get('lot_number') or
    saleArtwork.get('position') or
    saleArtwork.id

  Q.all([
    auction.fetch(cache: true)
    saleArtworks.fetchUntilEndInParallel(cache: true)
    setupUser(user, auction)
  ])
    .then (res) ->
      myActiveBids = res?[2]?[2]
      Q.promise (resolve) ->
        articles.fetch
          cache: true
          data: published: true, auction_id: auction.get('_id')
          complete: resolve
    .then ->
      return next() if auction.isSale()

      artworks.reset Artworks.__fromSale__(saleArtworks)

      res.locals.sd.AUCTION = auction.toJSON()
      res.locals.sd.ARTWORKS = artworks.toJSON()
      res.locals.sd.USER = user.toJSON() if user?

      template = if auction.isPreview() and not auction.isAuctionPromo()
        'preview/index'
      else
        'index'

      res.render template,
        auction: auction
        artworks: artworks
        saleArtworks: saleArtworks
        articles: articles
        user: user
        state: state
        displayBlurbs: displayBlurbs = artworks.hasAny('blurb')
        maxBlurbHeight: artworks.maxBlurbHeight(displayBlurbs)
        footerItems: footerItems
        myActiveBids: myActiveBids

    .catch next
    .done()

@redirect = (req, res) ->
  new Backbone.Collection().fetch
    cache: true
    url: "#{API_URL}/api/v1/sets/contains?item_type=Sale&item_id=#{req.params.id}"
    error: res.backboneError
    success: (collection, response, options) ->
      res.redirect "/feature/#{collection.first().get('owner').id}"

@inviteForm = (req, res, next) ->
  sailthru.apiPost 'user',
    id: req.body.email
    lists:
      "#{SAILTHRU_AUCTION_NOTIFICATION_LIST}": 1
    vars:
      source: 'auction'
      auction_id: req.params.id
  , (err, response) ->
    if response.ok
      res.send req.body
    else
      res.status(500).send(response.errormsg)
