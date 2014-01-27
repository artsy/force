Backbone    = require 'backbone'
sd          = require('sharify').data

module.exports = class Repost extends Backbone.Model

  isMine: ->
    sd.CURRENT_USER?.id && @get('profile').id == sd.CURRENT_USER?.default_profile_id
