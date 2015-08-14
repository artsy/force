{ ARTIST } = sd = require('sharify').data
Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
Artist = require '../../../models/artist.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtistRouter = require './router.coffee'
{ track } = require '../../../lib/analytics.coffee'

module.exports.init = ->
  artist = new Artist ARTIST
  user = CurrentUser.orNull()

  scrollFrame 'a.artwork-item-image-link' unless sd.EIGEN

  router = new ArtistRouter model: artist, user: user
  Backbone.history.start pushState: true

  track.impression 'Artist page', id: artist.id
