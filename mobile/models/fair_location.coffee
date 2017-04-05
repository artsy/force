_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Relations = require './mixins/relations/location'
Location = require './location'

module.exports = class FairLocation extends Location

  singleLine: ->
    @get 'display'

  toJSONLD: -> @singleLine()
