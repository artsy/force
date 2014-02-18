_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @counts.on 'sync', @renderCounts
    @params.on 'change', @highlightAllWorks

  renderCounts: =>
    for attr, counts of @counts.toJSON()
      for val, count of counts
        @$("a[data-attr='#{attr}'][data-val='#{val}'] .filter-dropdown-count").html '(' + count + ')'

  highlightAllWorks: =>
    if _.intersection(['price_range', 'dimension', 'medium'], @params.keys()).length is 0
      @$('.filter-artworks-nav-allworks').addClass('is-active')

  events:
    'click .filter-artworks-nav-allworks': 'allWorks'
    'click a[data-attr]': 'filterAttr'
    'click .filter-dropdown a': 'hideMenu'
    'click .filter-dropdown': 'toggleMenuIpad'

  allWorks: ->
    @params.clear().trigger('change')

  filterAttr: (e) ->
    attr = $(e.currentTarget).data 'attr'
    val = $(e.currentTarget).data 'val'
    return @params.unset attr if val is ''
    @params.set attr, val

  hideMenu: (e) ->
    $(e.currentTarget).parent().hidehover()

  toggleMenuIpad: (e) ->
    $(e.currentTarget).toggleClass('is-hover') if navigator.userAgent.match('iPad')