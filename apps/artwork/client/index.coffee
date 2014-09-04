sd = require('sharify').data
Backbone = require 'backbone'
Artist = require '../../../models/artist.coffee'
Artwork = require '../../../models/artwork.coffee'
ArtworkRouter = require './router.coffee'
{ track } = require '../../../lib/analytics.coffee'

module.exports.init = ->
  artist = new Artist sd.ARTIST
  artwork = new Artwork sd.ARTWORK, parse: true
  new ArtworkRouter artwork: artwork, artist: artist
  Backbone.history.start pushState: true

  track.impression 'Artwork page', id: artwork.id
  require './analytics.coffee'

  # Reflection doesn't like easter eggs :(
  return if navigator.userAgent.match('PhantomJS')
  require('./ascii_easter_egg.coffee')(artwork)
  require('./skrillex_easter_egg.coffee')(artwork)
