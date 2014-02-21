_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @counts.on 'sync', @renderCounts

  renderCounts: =>
    for attr, counts of @counts.toJSON()
      for val, count of counts
        @$("a[data-attr='#{attr}'][data-val='#{val}'] .filter-dropdown-count").html '(' + count + ')'