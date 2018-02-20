Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class Videos extends Backbone.Collection

  url: -> "#{sd.API_URL}/api/v1/videos"

  initialize: ->
    @model = require '../models/video.coffee'
