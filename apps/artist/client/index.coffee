_ = require 'underscore'
Backbone = require 'backbone'
Artist = require '../../../models/artist.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtistRouter = require './router.coffee'
analytics = require './analytics.coffee'

module.exports.init = ->
  analytics.listenToEvents()

  model = new Artist sd.ARTIST
  user = CurrentUser.orNull()
  router = new ArtistRouter model: model, user: user

  Backbone.history.start pushState: true

  analytics.trackArtistPageView model

