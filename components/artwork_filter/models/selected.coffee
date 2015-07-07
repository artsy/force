_ = require 'underscore'
deslugify = require '../../deslugify/index.coffee'
aggregations = require '../aggregations.coffee'
Backbone = require 'backbone'

module.exports = class Selected extends Backbone.Model
  visibleAttributes: ->
    _.without _.keys(@attributes), 'aggregations', 'size', 'artist_id'

  reset: (options = {}) ->
    _.map @visibleAttributes(), (attribute) =>
      @unset attribute, options

  labels: (map) ->
    _.map(_.pick(@attributes, aggregations), (key, type) =>
      return "For Sale" if type is 'for_sale' and key is true
      map[type][key]?.name
    ).join ', '

  isActive: (value) ->
    (_.find _.values(@attributes), (val) -> String(val) is String(value))?
