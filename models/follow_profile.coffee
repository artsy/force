sd       = require('sharify').data
Backbone = require 'backbone'

module.exports = class FollowProfile extends Backbone.Model

  urlRoot: ->
    "#{sd.ARTSY_URL}/api/v1/me/follow/profile"
