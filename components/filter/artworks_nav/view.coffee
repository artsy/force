_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @counts.on 'sync', @renderCounts
    @params.on 'change', @renderActive

  renderCounts: =>
    for range, val of @counts.get('price_range')
      @$("a[data-range='#{range}'] .filter-dropdown-count").html '(' + val + ')'
    for size, val of @counts.get('dimension')
      @$("a[data-size='#{size}'] .filter-dropdown-count").html '(' + val + ')'

  renderActive: =>
    @$('.is-active').removeClass('is-active')
    if _.intersection(['price_range', 'dimension', 'medium'], @params.keys()).length is 0
      @$('.filter-artworks-nav-allworks').addClass('is-active')
    else
      @$("a[data-range='#{@params.get('price_range')}']")
        .addClass('is-active').closest('.filter-dropdown').addClass('is-active')
      @$("a[data-size='#{@params.get('dimension')}']")
        .addClass('is-active').closest('.filter-dropdown').addClass('is-active')

  events:
    'click .filter-artworks-nav-allworks': 'allWorks'
    'click .filter-artworks-nav-price a': 'filterPrice'
    'click .filter-artworks-nav-medium a': 'filterMedium'
    'click .filter-artworks-nav-size a': 'filterSize'
    'click .filter-dropdown a': 'checkDropdownItem'

  allWorks: ->
    @params.clear().trigger('change')

  filterPrice: (e) ->
    val = $(e.currentTarget).data 'range'
    return @params.unset 'price_range' if val is ''
    @params.set { price_range: val }

  filterMedium: (e) ->
    val = $(e.currentTarget).data 'medium'
    return @params.unset 'medium' if val is ''
    @params.set { medium: val }

  filterSize: (e) ->
    val = $(e.currentTarget).data 'size'
    return @params.unset 'dimension' if val is ''
    @params.set { dimension: val }

  checkDropdownItem: (e) ->
    $(e.currentTarget)
      .addClass('is-active')
      .closest('.filter-dropdown')
      .children('.filter-nav-active-text')
      .text $(e.currentTarget).find('.filter-dropdown-text').text()