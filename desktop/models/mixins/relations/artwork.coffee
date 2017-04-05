{ API_URL, APP_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    Artist = require '../../artist'
    SaleArtwork = require '../../sale_artwork'
    AdditionalImages = require '../../../collections/additional_images'
    Partner = require '../../partner'

    Sales = require '../../../collections/sales'
    Features = require '../../../collections/features'
    Fairs = require '../../../collections/fairs'
    Shows = require '../../../collections/partner_shows'
    Artists = require '../../../collections/artists'

    artist = new Artist @get('artist')
    saleArtwork = new SaleArtwork @get('sale_artwork')
    partner = new Partner @get('partner')
    images = new AdditionalImages @get('images'), parse: true
    artists = new Artists @get('artists')

    sales = new Sales
    sales.url = "#{API_URL}/api/v1/related/sales?artwork[]=#{@id}&active=true&cache_bust=#{Math.random()}"
    features = new Features
    features.url = "#{API_URL}/api/v1/related/features?artwork[]=#{@id}&active=true"
    fairs = new Fairs
    fairs.url = "#{API_URL}/api/v1/related/fairs?artwork[]=#{@id}&active=true"
    shows = new Shows
    shows.url = "#{API_URL}/api/v1/related/shows?artwork_id=#{@id}&active=true"

    @__related__ =
      artist: artist
      saleArtwork: saleArtwork
      partner: partner
      images: images
      sales: sales
      features: features
      fairs: fairs
      shows: shows
      artists: artists
