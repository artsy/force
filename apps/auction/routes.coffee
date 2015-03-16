Q = require 'q'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'
Auction = require '../../models/auction'
Feature = require '../../models/feature'
Profile = require '../../models/profile'
SaleArtworks = require '../../collections/sale_artworks'
Artworks = require '../../collections/artworks'

determineFeature = (id, err, next) ->
  new Backbone.Collection().fetch
    cache: true
    url: "#{API_URL}/api/v1/sets/contains?item_type=Sale&item_id=#{id}"
    error: err
    success: (collection, response, options) ->
      next collection.first().get('owner')

fetchPartner = (saleArtworks, options = {}) ->
  dfd = Q.defer()

  saleArtworks.fetch
    cache: options.cache
    data: size: 1
    error: dfd.resolve
    success: (collection, response, options) ->
      return dfd.resolve(new Profile) if collection.length is 0

      { default_profile_id } = collection.first().get('artwork')?.partner
      profile = new Profile id: default_profile_id

      profile.fetch
        cache: options.cache
        complete: ->
          dfd.resolve profile

  dfd.promise

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


@index = (req, res) ->
  id = req.params.id

  determineFeature id, res.backboneError, (owner) ->
    feature = new Feature id: owner.id
    auction = new Auction id: id
    saleArtworks = new SaleArtworks [], id: id
    artworks = new Artworks
    artworks.comparator = (artwork) ->
      (saleArtwork = artwork.related().saleArtwork).get('lot_number') or saleArtwork.id

    Q.all([

      auction.fetch(cache: true)
      feature.fetch(cache: true)
      fetchPartner(saleArtworks, cache: true)
      saleArtworks.fetchUntilEndInParallel(cache: true)
      setupUser(req.user, auction)

    ]).spread((x, y, profile, z, user) ->
      artworks.reset Artworks.__fromSale__(saleArtworks)

      res.locals.sd.FEATURE = feature.toJSON()
      res.locals.sd.AUCTION = auction.toJSON()
      res.locals.sd.ARTWORKS = artworks.toJSON()
      res.locals.sd.USER = user.toJSON() if user?

      res.render 'index',
        auction: auction
        feature: feature
        profile: profile
        artworks: artworks
        saleArtworks: saleArtworks
        user: user

    ).done()
