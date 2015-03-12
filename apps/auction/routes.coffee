Q = require 'q'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'
Sale = require '../../models/sale'
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

@index = (req, res) ->
  id = req.params.id

  determineFeature id, res.backboneError, (owner) ->
    feature = new Feature id: owner.id
    auction = new Sale id: id
    saleArtworks = new SaleArtworks [], id: id

    Q.all([
      auction.fetch(cache: true)
      feature.fetch(cache: true)
      fetchPartner(saleArtworks, cache: true)
      saleArtworks.fetchUntilEndInParallel(cache: true)
    ]).spread((x, y, profile, z) ->
      artworks = Artworks.fromSale saleArtworks

      res.locals.sd.AUCTION = auction.toJSON()

      res.render 'index',
        auction: auction
        feature: feature
        profile: profile
        artworks: artworks
        saleArtworks: saleArtworks

    ).done()
