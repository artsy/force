Backbone = require 'backbone'
_ = require 'underscore'
Sticky = require '../../sticky/index.coffee'
aggregationsMap = require '../aggregations_map.coffee'
template = -> require('../templates/filters.jade') arguments...

module.exports = class ArtworkFiltersView extends Backbone.View
  truncate:
    institution: 5
    gallery: 5

  events:
    'click .js-artwork-filter-select'   : 'filterSelected'
    'click .js-artwork-filter-toggle'   : 'toggleBool'
    'click .js-artwork-filter-remove'   : 'filterDeselected'
    'click .js-artwork-filter-view-all' : 'seeAllClicked'
    'click' : 'resetPagination'

  initialize: ({ @params, @counts, stickyOffset = 0 }) ->
    @sticky = new Sticky
    @sticky.headerHeight = stickyOffset

    @listenToOnce @counts, 'change', =>
      @render()
      @sticky.add @$el
      @listenTo @counts, 'change', @render

    @listenTo @params, "change:for_sale", @render
    @listenTo this, 'filterExpanded', @render

  render: ->
    forSaleTotal = @counts.get 'for_sale'
    forSaleFilter = true
    key = if forSale = @params.get 'for_sale' then 'for_sale' else 'all'
    aggregations = @counts.aggregations?[key]

    @$el.html template {
      aggregationsMap,
      forSaleTotal,
      aggregations,
      forSale,
      @counts,
      @params,
      @truncate,
      forSaleFilter
    }
    this

  resetPagination: ->
    @params.set { page: 1 }, { silent: true }

  toggleBool: (e) ->
    e.preventDefault()
    key = ($el = $(e.target)).prop('name')
    value = $el.prop('checked')
    if value
      @params.set key, value
    else
      @params.unset key

  filterSelected: (e) ->
    e.preventDefault()
    key = ($el = $(e.target)).data('key')
    value = $el.attr('data-value')
    @params.updateWith key, value

  filterDeselected: (e) ->
    e.preventDefault()
    key = ($el = $(e.target)).data('key')
    @params.unset key

  seeAllClicked: (e) =>
    e.preventDefault()
    key = ($el = $(e.target)).data('key')
    delete @truncate[key]
    @trigger 'filterExpanded'
