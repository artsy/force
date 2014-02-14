_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class FilterArtworksNav extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @counts.on 'sync', @renderCounts

  renderCounts: =>
    for range, val of @counts.get('price_range')
      @$("a[data-range='#{range}'] .filter-dropdown-count").html '(' + val + ')'
    for size, val of @counts.get('dimension')
      @$("a[data-size='#{size}'] .filter-dropdown-count").html '(' + val + ')'

  toggleActive: (el) ->
    @$('.is-active').removeClass 'is-active'
    $(el).addClass('is-active')

  events:
    'click .filter-artworks-nav-allworks': 'allWorks'
    'click .filter-artworks-nav-price a': 'filterPrice'
    'click .filter-artworks-nav-medium a': 'filterMedium'
    'click .filter-artworks-nav-size a': 'filterSize'
    'click .filter-dropdown a': 'checkDropdownItem'

  allWorks: ->
    @toggleActive @$('.filter-artworks-nav-allworks')
    @params.clear()

  filterPrice: (e) ->
    @toggleActive @$('.filter-artworks-nav-price')
    @params.set { price_range: $(e.target).data 'range' }

  filterMedium: (e) ->
    @toggleActive @$('.filter-artworks-nav-medium')
    @params.set { medium: $(e.target).data 'medium' }

  filterSize: (e) ->
    @toggleActive @$('.filter-artworks-nav-size')
    @params.set { dimension: $(e.target).data 'size' }

  checkDropdownItem: (e) ->
    $(e.currentTarget)
      .addClass('is-active')
      .closest('.filter-dropdown')
      .children('.filter-nav-active-text')
      .text $(e.currentTarget).find('.filter-dropdown-text').text()