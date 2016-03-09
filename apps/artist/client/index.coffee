{ ARTIST } = sd = require('sharify').data
Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
Artist = require '../../../models/artist.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtistRouter = require './router.coffee'

module.exports.init = ->
  statuses = ARTIST.statuses
  artist = new Artist _.extend published_artworks_count: ARTIST.counts.artworks, ARTIST
  user = CurrentUser.orNull()
  scrollFrame 'a.artwork-item-image-link' unless sd.EIGEN
  router = new ArtistRouter
    model: artist,
    statuses: statuses,
    user: user
  Backbone.history.start pushState: true
