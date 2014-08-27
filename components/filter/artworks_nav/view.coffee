_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @counts.on 'sync', @renderCounts

  renderCounts: =>
    for attr, counts of @counts.toJSON()
      continue unless _.isObject counts
      minCount = _.values(counts).sort((a, b) -> b - a)[9]
      for val, count of counts
        if minCount and count and count < minCount
          @$("a[data-attr='#{attr}'][data-val='#{val}']").hide()
        else
          @$("a[data-attr='#{attr}'][data-val='#{val}']").show()
            .find(".filter-dropdown-count").html '(' + _s.numberFormat(count) + ')'
