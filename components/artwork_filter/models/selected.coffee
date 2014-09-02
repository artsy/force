_ = require 'underscore'
deslugify = require '../../deslugify/index.coffee'
Backbone = require 'backbone'

module.exports = class Selected extends Backbone.Model
  visibleAttributes: ->
    _.without _.keys(@attributes), 'price_range'

  reset: (options = {}) ->
    _.map @visibleAttributes(), (attribute) =>
      @unset attribute, options

  labels: ->
    _.map(_.values(@attributes), (key) => @humanize key).join ', '

  humanize: (string) ->
    return 'For Sale' if string is '-1:1000000000000'
    deslugify string

  isActive: (value) ->
    (_.find _.values(@attributes), (val) -> String(val) is String(value))?
