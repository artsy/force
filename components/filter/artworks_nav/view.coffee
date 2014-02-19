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

  events:
    'click .filter-artworks-nav-allworks': 'allWorks'
    'click a[data-attr]': 'filterAttr'
    'click .filter-dropdown a': 'hideMenu'
    'click .filter-dropdown': 'toggleMenuIpad'

  allWorks: ->
    @params.clear().trigger('reset')

  filterAttr: (e) ->
    attr = $(e.currentTarget).data 'attr'
    val = $(e.currentTarget).data 'val'
    return @params.unset attr if val is ''
    @params.set attr, val

  hideMenu: (e) ->
    $(e.currentTarget).parent().hidehover()

  toggleMenuIpad: (e) ->
    $(e.currentTarget).toggleClass('is-hover') if navigator.userAgent.match('iPad')