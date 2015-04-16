Q = require 'q'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'
Auction = require '../../models/auction'
Feature = require '../../models/feature'
Profile = require '../../models/profile'
SaleArtworks = require '../../collections/sale_artworks'
Artworks = require '../../collections/artworks'
OrderedSets = require '../../collections/ordered_sets'
State = require '../../components/auction_artworks/models/state'

setupUser = (user, auction) ->
  dfd = Q.defer()

  if user?
    Q.all([
      user.fetch()
      user.checkRegisteredForAuction saleId: auction.id, success: (boolean) ->
        user.set 'registered_to_bid', boolean
    ]).done ->
      dfd.resolve user
  else
    dfd.resolve user

  dfd.promise

@index = (req, res, next) ->
  id = req.params.id

  auction = new Auction id: id
  saleArtworks = new SaleArtworks [], id: id
  artworks = new Artworks
  artworks.comparator = (artwork) ->
    (saleArtwork = artwork.related().saleArtwork).get('lot_number') or
    saleArtwork.get('position') or
    saleArtwork.id
  state = new State

  Q.all([
    auction.fetch(cache: true)
    saleArtworks.fetchUntilEndInParallel(cache: true)
    setupUser(req.user, auction)
  ]).spread (a, b, user) ->
    artworks.reset Artworks.__fromSale__(saleArtworks)

    res.locals.sd.AUCTION = auction.toJSON()
    res.locals.sd.ARTWORKS = artworks.toJSON()
    res.locals.sd.USER = user.toJSON() if user?

    res.render 'index',
      auction: auction
      artworks: artworks
      saleArtworks: saleArtworks
      user: user
      state: state

  , ->
    err = new Error 'Not Found'
    err.status = 404
    next err
