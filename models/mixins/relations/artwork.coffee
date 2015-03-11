{ API_URL, APP_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    Artist = require '../../artist.coffee'
    SaleArtwork = require '../../sale_artwork.coffee'

    artist = new Artist @get('artist')
    saleArtwork = new SaleArtwork @get('saleArtwork')?.toJSON()

    @__related__ =
      artist: artist
      saleArtwork: saleArtwork
