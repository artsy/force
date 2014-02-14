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
    if @params.keys().length is 0
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
    @params.clear()

  filterPrice: (e) ->
    @params.set { price_range: $(e.currentTarget).data 'range' }

  filterMedium: (e) ->
    @params.set { medium: $(e.currentTarget).data 'medium' }

  filterSize: (e) ->
    @params.set { dimension: $(e.currentTarget).data 'size' }

  checkDropdownItem: (e) ->
    $(e.currentTarget)
      .addClass('is-active')
      .closest('.filter-dropdown')
      .children('.filter-nav-active-text')
      .text $(e.currentTarget).find('.filter-dropdown-text').text()