Backbone = require 'backbone'
Artist = require '../../../models/artist.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtistRouter = require './router.coffee'

module.exports.init = ->
  model = new Artist sd.ARTIST
  user = CurrentUser.orNull()
  new ArtistRouter model: model, user: user
  Backbone.history.start pushState: true
  require('./analytics.coffee')(model)
