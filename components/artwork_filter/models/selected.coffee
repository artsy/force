_ = require 'underscore'
deslugify = require '../../deslugify/index.coffee'
Backbone = require 'backbone'

module.exports = class Selected extends Backbone.Model
  visibleAttributes: ->
    _.without _.keys(@attributes), 'price_range'

  reset: (options = {}) ->
    _.map @visibleAttributes(), (attribute) =>
      @unset attribute, options

  labels: (map) ->
    _.map(@attributes, (key, type) =>
      return 'For Sale' if key is '-1:1000000000000'
      map[type][key].name
    ).join ', '

  isActive: (value) ->
    (_.find _.values(@attributes), (val) -> String(val) is String(value))?
