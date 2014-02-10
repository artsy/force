Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
mediator = require '../mediator.coffee'

module.exports = class FilterArtworksNav extends Backbone.View

  initialize: (opts) ->
    { @filterOptions } = opts
    @render()
    @

  render: ->
    @$el.html template mediums: @filterOptions?.medium

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
    mediator.trigger 'filter', {}

  filterPrice: (e) ->
    @toggleActive @$('.filter-artworks-nav-price')
    mediator.trigger 'filter', { price_range: $(e.target).data 'range' }

  filterMedium: (e) ->
    @toggleActive @$('.filter-artworks-nav-medium')
    mediator.trigger 'filter', { medium: $(e.target).data 'medium' }

  filterSize: (e) ->
    @toggleActive @$('.filter-artworks-nav-size')
    mediator.trigger 'filter', { dimension: $(e.target).data 'size' }

  checkDropdownItem: (e) ->
    $(e.target)
      .addClass('is-active')
      .closest('.filter-dropdown')
      .children('.filter-nav-active-text')
      .text $(e.target).text()