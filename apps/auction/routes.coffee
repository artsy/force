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
{
  SAILTHRU_AUCTION_NOTIFICATION_LIST
  SAILTHRU_KEY
  SAILTHRU_SECRET
  PREDICTION_URL
} = require '../../config'
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
      ).then( ([ bidder ]) ->
        user.set 'qualified_for_bidding', bidder?.qualified_for_bidding
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
          data: published: true, auction_id: auction.get('_id')
          complete: resolve
    .then ->
      return next() if auction.isSale()

      artworks.reset Artworks.__fromSale__(saleArtworks)

      res.locals.sd.AUCTION = auction.toJSON()
      res.locals.sd.ARTWORKS = artworks.toJSON()
      res.locals.sd.USER = user.toJSON() if user?

      res.render 'index',
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

@redirect = (req, res, next) ->
  new Backbone.Collection().fetch
    cache: true
    url: "#{API_URL}/api/v1/sets/contains?item_type=Sale&item_id=#{req.params.id}"
    error: res.backboneError
    success: (collection, response, options) ->
      return next() unless collection.length
      res.redirect "/feature/#{collection?.first()?.get('owner')?.id}"

@inviteForm = (req, res, next) ->
  fail = (err) -> res.status(500).send(err.errormsg)
  sailthru.apiGet 'user', { id: req.body.email }, (err, response) ->
    return fail err if err and err.error isnt 99
    if not err
      auctionSlugs = _.uniq(
        (response.vars.auction_slugs or []).concat [req.params.id]
      )
      source = response.vars.source or 'auction'
    else
      auctionSlugs = [req.params.id]
      source = 'auction'
    sailthru.apiPost 'user',
      id: req.body.email
      lists:
        "#{SAILTHRU_AUCTION_NOTIFICATION_LIST}": 1
      vars:
        source: source
        auction_slugs: auctionSlugs
    , (err, response) ->
      return fail err if err
      res.send req.body

@redirectLive = (req, res, next) ->
  auction = new Auction id: req.params.id
  auction.fetch
    error: res.backboneError
    success: ->
      liveUrl = "#{PREDICTION_URL}/#{auction.get('id')}/login"
      if auction.isLiveOpen()
        req.user.fetchBidderForAuction auction,
          error: res.backboneError
          success: (bidder) =>
            if bidder?.get 'qualified_for_bidding'
              res.redirect liveUrl
            next()
      else next()
