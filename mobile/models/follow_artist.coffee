sd = require('sharify').data
Backbone = require 'backbone'

module.exports = class FollowArtist extends Backbone.Model

  urlRoot: ->
    "#{sd.API_URL}/api/v1/me/follow/artist"
