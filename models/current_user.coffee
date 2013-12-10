Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class CurrentUser extends Backbone.Model

  url: -> "#{sd.GRAVITY_URL}/api/v1/me"

  # Add the access token to fetches and saves
  sync: (method, model, options = {}) ->
    options.data ?= {}
    options.data.access_token = @get 'accessToken'
    super