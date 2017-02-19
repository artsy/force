sd = require('sharify').data
Backbone = require 'backbone'

module.exports = class FollowGene extends Backbone.Model

  urlRoot: ->
    "#{sd.API_URL}/api/v1/me/follow/gene"
