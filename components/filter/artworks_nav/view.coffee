_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View
  initialize: (options) ->
    _.extend @, options
    @listenTo @counts, 'sync', @renderCounts

  minCount: (n = 10) ->
    _.pluck(_.extend({}, _.map(@counts.attributes, (children, parent) -> children)...), 'count')
      .sort((a, b) -> b - a)[n - 1]

  renderCounts: ->
    for parent, children of @counts.attributes
      for child, { count } of children
        @$("a[data-attr='#{parent}'][data-val='#{child}']").show()
          .find(".filter-dropdown-count").text "(#{_s.numberFormat(count)})"
