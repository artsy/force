_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'

module.exports = class FairLocation extends Backbone.Model

  singleLine: ->
    @get 'display'

  toJSONLD: -> @singleLine()
