_ = require 'underscore'
Q = require 'q'
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

setupUser = (user, auction) ->
  Q.promise (resolve) ->
    if user?
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
  id = req.params.id
  user = req.user
  auction = new Auction id: id
  saleArtworks = new SaleArtworks [], id: id
  articles = new Articles
  state = new State
  artworks = new Artworks

  artworks.comparator = (artwork) ->
    saleArtwork = artwork.related().saleArtwork
    saleArtwork.get('lot_number') or
    saleArtwork.get('position') or
    saleArtwork.id

  Q.all([
    auction.fetch(cache: true)
    saleArtworks.fetchUntilEndInParallel(cache: true)
    setupUser(user, auction)
  ]).then(->
    articles.fetch(cache: true, data: published: true, auction_id: auction.get('_id'))
  ).then(->
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
  ).catch(->
    err = new Error 'Not Found'
    err.status = 404
    next err
  ).done()

@redirect = (req, res) ->
  new Backbone.Collection().fetch
    cache: true
    url: "#{API_URL}/api/v1/sets/contains?item_type=Sale&item_id=#{req.params.id}"
    error: res.backboneError
    success: (collection, response, options) ->
      res.redirect "/feature/#{collection.first().get('owner').id}"
