{ API_URL, APP_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    Artist = require '../../artist.coffee'
    SaleArtwork = require '../../sale_artwork.coffee'
    AdditionalImages = require '../../../collections/additional_images.coffee'
    Sales = require '../../../collections/sales.coffee'
    Features = require '../../../collections/features.coffee'
    Fairs = require '../../../collections/fairs.coffee'
    Shows = require '../../../collections/partner_shows.coffee'

    artist = new Artist @get('artist')
    saleArtwork = new SaleArtwork @get('sale_artwork')
    images = new AdditionalImages @get('images'), parse: true
    sales = new Sales
    sales.url = "#{API_URL}/api/v1/related/sales?artwork[]=#{@id}&active=true&cache_bust=#{Math.random()}"
    features = new Features
    features.url = "#{API_URL}/api/v1/related/features?artwork[]=#{@id}&active=true"
    fairs = new Fairs
    fairs.url = "#{API_URL}/api/v1/related/fairs?artwork[]=#{@id}&active=true"
    shows = new Shows
    shows.url = "#{API_URL}/api/v1/related/shows?artwork[]=#{@id}&active=true"

    @__related__ =
      artist: artist
      saleArtwork: saleArtwork
      images: images
      sales: sales
      features: features
      fairs: fairs
      shows: shows
