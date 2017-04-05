{ API_URL, APP_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    Artist = require '../../artist'
    SaleArtwork = require '../../sale_artwork'
    Partner = require '../../partner'

    Artworks = require '../../../collections/artworks'
    Sales = require '../../../collections/sales'
    Artists = require '../../../collections/artists'

    artist = new Artist @get('artist')
    saleArtwork = new SaleArtwork @get('sale_artwork')
    partner = new Partner @get('partner')
    artists = new Artists @get('artists')

    sales = new Sales
    sales.url = "#{API_URL}/api/v1/related/sales?artwork[]=#{@id}&active=true&cache_bust=#{Math.random()}"

    artworks = new Artworks
    artworks.url = "#{API_URL}/api/v1/related/layer/synthetic/main/artworks?artwork[]=#{@id}"

    @__related__ =
      artist: artist
      saleArtwork: saleArtwork
      partner: partner
      sales: sales
      artists: artists
      artworks: artworks
