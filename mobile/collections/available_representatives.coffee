Backbone = require 'backbone'
sd = require('sharify').data
Profile = require '../models/profile'

module.exports = class AvailableRepresentatives extends Backbone.Collection

  url: -> "#{sd.API_URL}/api/v1/admins/available_representatives"

  @fetchFirstProfile: (options = {}) ->
    reps = new @
    profile = new Profile
    reps.fetch
      success: ->
        profile.set(id: reps.first().get 'default_profile_id')
        profile.fetch(options)
      error: options.error
    profile
