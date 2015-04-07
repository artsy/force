{ API_URL, APP_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    Artist = require '../../artist.coffee'
    SaleArtwork = require '../../sale_artwork.coffee'
    AdditionalImages = require '../../../collections/additional_images.coffee'

    artist = new Artist @get('artist')
    saleArtwork = new SaleArtwork @get('sale_artwork')
    images = new AdditionalImages @get('images'), parse: true

    @__related__ =
      artist: artist
      saleArtwork: saleArtwork
      images: images
