_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View
  initialize: (options) ->
    _.extend @, options
    @listenTo @counts, 'sync', @renderCounts

  renderCounts: ->
    for parent, children of @counts.attributes
      for child, { count } of children
        @$("a[data-attr='#{parent}'][data-val='#{child}']").show()
          .find(".filter-dropdown-count").text "(#{_s.numberFormat(count)})"
