_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'

module.exports = class Selected extends Backbone.Model
  visibleAttributes: ->
    @omit 'price_range'

  labels: ->
    _.map(_.values(@attributes), (key) => @humanize key).join ', '

  humanize: (string) ->
    return 'For Sale' if string is '-1:1000000000000'
    _s.titleize _s.humanize string
