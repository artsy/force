sd = require('sharify').data
Backbone = require 'backbone'
Artist = require '../../../models/artist.coffee'
Artwork = require '../../../models/artwork.coffee'
ArtworkRouter = require './router.coffee'

module.exports.init = ->
  artist = new Artist sd.ARTIST
  artwork = new Artwork sd.ARTWORK, parse: true

  new ArtworkRouter artwork: artwork, artist: artist
  Backbone.history.start pushState: true

  # Reflection doesn't like easter eggs:(
  return if navigator.userAgent.match('PhantomJS')
  require('./ascii-easter-egg.coffee')(artwork)
  require('./skrillex-easter-egg.coffee')(artwork)
