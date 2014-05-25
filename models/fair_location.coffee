_        = require 'underscore'
sd       = require('sharify').data
Backbone = require 'backbone'
{ compactObject } = require './mixins/compact_object.coffee'

module.exports = class FairLocation extends Backbone.Model

  singleLine: ->
    @get 'display'

  toJSONLD: -> @singleLine()
