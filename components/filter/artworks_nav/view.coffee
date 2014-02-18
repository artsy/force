_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @counts.on 'sync', @renderCounts
    @params.on 'change', @renderActive
    @renderActive()

  renderCounts: =>
    for attr, counts of @counts.toJSON()
      for val, count of counts
        @$("a[data-attr='#{attr}'][data-val='#{val}'] .filter-dropdown-count").html '(' + count + ')'

  renderActive: =>
    attrs = ['price_range', 'dimension', 'medium']
    @$('.is-active').removeClass('is-active')
    if _.intersection(attrs, @params.keys()).length is 0
      @$('.filter-artworks-nav-allworks').addClass('is-active')
    else
      for attr in attrs
        return unless $a = @$("a[data-attr='#{attr}'][data-val='#{@params.get(attr)}']")
        $a.addClass('is-active')
          .closest('.filter-dropdown')
          .addClass('is-active')
          .children('.filter-nav-active-text')
          .text $a.children('.filter-dropdown-text').text()

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
    false