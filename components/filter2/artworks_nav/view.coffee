_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View
  initialize: (options) ->
    _.extend @, options
    @listenTo @collection, 'sync', @renderCounts

  renderCounts: ->
    for parent, children of @collection.counts
      # console.log 'parent', parent, 'children', children
      for child, obj of children
        # console.log 'child', child, 'obj', obj
        # console.log @$("a[data-attr='#{parent}'][data-val='#{child}']")
        count = obj.count or obj
        $criterion = @$("a[data-attr='#{parent}'][data-val='#{child}']")
        $criterion.show().find('.filter-dropdown-count').text "(#{_s.numberFormat(count)})"
