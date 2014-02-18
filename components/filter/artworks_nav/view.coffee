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
    @$('.is-active').removeClass('is-active')
    if _.intersection(['price_range', 'dimension', 'medium'], @params.keys()).length is 0
      @$('.filter-artworks-nav-allworks').addClass('is-active')
    for attr, param of {
      'range': 'price_range'
      'size': 'dimension'
      'medium': 'medium'
    }
      if @params.get(param)
        @$("a[data-#{attr}='#{@params.get(param)}']")
          .addClass('is-active').closest('.filter-dropdown').addClass('is-active')
      else
        @$("a[data-#{attr}]").first().addClass('is-active')

  events:
    'click .filter-artworks-nav-allworks': 'allWorks'
    'click a[data-attr]': 'filterAttr'
    'click .filter-dropdown a': 'checkDropdownItem'
    'click .filter-dropdown': 'toggleMenuIpad'

  allWorks: ->
    @params.clear().trigger('change')

  filterAttr: (e) ->
    attr = $(e.currentTarget).data 'attr'
    val = $(e.currentTarget).data 'val'
    return @params.unset attr if val is ''
    @params.set attr, val

  checkDropdownItem: (e) ->
    $(e.currentTarget)
      .addClass('is-active')
      .closest('.filter-dropdown')
      .children('.filter-nav-active-text')
      .text($(e.currentTarget).find('.filter-dropdown-text').text())
    $(e.currentTarget).parent().hidehover()

  toggleMenuIpad: (e) ->
    $(e.currentTarget).toggleClass('is-hover') if navigator.userAgent.match('iPad')
    false