sd              = require('sharify').data
Backbone        = require 'backbone'
Artist          = require '../../../models/artist.coffee'
Artwork         = require '../../../models/artwork.coffee'
ArtworkRouter   = require './router.coffee'

module.exports.init = ->
  artist    = new Artist sd.ARTIST
  artwork   = new Artwork sd.ARTWORK

  $ ->
    new ArtworkRouter artwork: artwork, artist: artist
    Backbone.history.start pushState: true
