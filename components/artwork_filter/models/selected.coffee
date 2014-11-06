_ = require 'underscore'
deslugify = require '../../deslugify/index.coffee'
Backbone = require 'backbone'

module.exports = class Selected extends Backbone.Model
  visibleAttributes: ->
    _.without _.keys(@attributes), 'price_range'

  reset: (options = {}) ->
    _.map @visibleAttributes(), (attribute) =>
      @unset attribute, options

  labels: (filterHash) ->
    _.map(@attributes, (string, type) => @humanize(string, type, filterHash)).join ', '

  humanize: (string, type, filterHash) ->
    if string is '-1:1000000000000'
      return 'For Sale'
    else
      label = if filterHash[type] then filterHash[type][string] else ''
      name = if label['name'] then label['name'] else deslugify(string)

  isActive: (value) ->
    (_.find _.values(@attributes), (val) -> String(val) is String(value))?
