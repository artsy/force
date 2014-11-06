_ = require 'underscore'
deslugify = require '../../deslugify/index.coffee'
Backbone = require 'backbone'

module.exports = class Selected extends Backbone.Model
  visibleAttributes: ->
    _.without _.keys(@attributes), 'price_range'

  reset: (options = {}) ->
    _.map @visibleAttributes(), (attribute) =>
      @unset attribute, options

  labels: (filter_hash) ->
    _.map(@attributes, (string, type) => @humanize(string, type, filter_hash)).join ', '

  humanize: (string, type, filter_hash) ->
    if string is '-1:1000000000000'
      return 'For Sale'
    else
      label = if filter_hash[type] then filter_hash[type][string] else ''
      name = if label['name'] then label['name'] else deslugify(string)
    return name

  isActive: (value) ->
    (_.find _.values(@attributes), (val) -> String(val) is String(value))?
