_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View
  initialize: (options) ->
    _.extend @, options
    @listenTo @counts, 'sync', @renderCounts

  minCount: (attr, n = 10) ->
    _.last _.take _.pluck(@counts.get(attr), 'count').sort((a, b) -> b - a), n

  renderCounts: ->
    for parent, children of @counts.attributes
      threshold = @minCount parent
      for child, { count } of children
        $criterion = @$("a[data-attr='#{parent}'][data-val='#{child}']")
        if threshold <= count
          $criterion.show().find('.filter-dropdown-count').text "(#{_s.numberFormat(count)})"
        else
          $criterion.hide()
