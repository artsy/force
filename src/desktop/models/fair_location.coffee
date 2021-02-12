Backbone = require 'backbone'

module.exports = class FairLocation extends Backbone.Model

  singleLine: ->
    @get 'display'

  toJSONLD: -> @singleLine()
