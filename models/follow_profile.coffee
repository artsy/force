sd       = require('sharify').data
Backbone = require 'backbone'

module.exports = class FollowProfile extends Backbone.Model

  url: ->
    if @has 'id'
      "#{sd.ARTSY_URL}/api/v1/me/follow/profile/#{@get('id')}"
    else
      "#{sd.ARTSY_URL}/api/v1/me/follow/profile"
