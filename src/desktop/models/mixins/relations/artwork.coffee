{ API_URL, APP_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    Artist = require '../../artist.coffee'
    SaleArtwork = require '../../sale_artwork.coffee'
    AdditionalImages = require '../../../collections/additional_images.coffee'
    Partner = require '../../partner.coffee'

    Sales = require '../../../collections/sales.coffee'
    Fairs = require '../../../collections/fairs.coffee'
    Shows = require '../../../collections/partner_shows.coffee'
    Artists = require '../../../collections/artists.coffee'

    artist = new Artist @get('artist')
    saleArtwork = new SaleArtwork @get('sale_artwork')
    partner = new Partner @get('partner')
    images = new AdditionalImages @get('images'), parse: true
    artists = new Artists @get('artists')

    sales = new Sales
    sales.url = "#{API_URL}/api/v1/related/sales?artwork[]=#{@id}&active=true&cache_bust=#{Math.random()}"
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
      fairs: fairs
      shows: shows
      artists: artists
