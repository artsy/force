_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View
  initialize: (options) ->
    _.extend @, options
    @listenTo @counts, 'sync', @renderCounts

  minCount: (attr, n = 10) ->
    counts = _.compact _.pluck @counts.get(attr), 'count'
    counts = _.compact _.pluck @counts.get(attr), 'c' unless counts.length
    counts = _.compact _.values @counts.get(attr) unless counts.length
    _.last _.take counts.sort((a, b) -> b - a), n

  renderCounts: ->
    for parent, children of @counts.attributes
      threshold = @minCount parent
      for child, obj of children
        count = obj.c or obj.count or obj
        $criterion = @$("a[data-attr='#{parent}'][data-val='#{child}']")
        if threshold <= count
          $criterion.show().find('.filter-dropdown-count').text "(#{_s.numberFormat(count)})"
        else
          $criterion.hide()
