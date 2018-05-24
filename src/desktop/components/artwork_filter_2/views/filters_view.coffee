Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Sticky = require '../../sticky/index.coffee'
CountView = require './header_count_view.coffee'
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

    # FIXME: Replace with proper A/B test
    # if sd.ENABLE_EXPERIMENTAL_ARTIST_PAGINATION
    if sd.ARTIST_PAGE_PAGINATION is 'experiment'
      countView = new CountView _.extend el: @$('#artwork-filter-left__totals'), { @counts, @params }
      countView.render()

    this

  resetPagination: ->
    @params.set { page: 1 }, { silent: true }

  toggleBool: (e) ->
    e.preventDefault()
    @resetPagination()
    key = ($el = $(e.target)).prop('name')
    value = $el.prop('checked')
    if value
      @params.set key, value
    else
      @params.unset key

  filterSelected: (e) ->
    e.preventDefault()
    @resetPagination()
    key = ($el = $(e.target)).data('key')
    value = $el.attr('data-value')
    @params.updateWith key, value

  filterDeselected: (e) ->
    e.preventDefault()
    @resetPagination()
    key = ($el = $(e.target)).data('key')
    @params.unset key

  seeAllClicked: (e) =>
    e.preventDefault()
    @resetPagination()
    key = ($el = $(e.target)).data('key')
    delete @truncate[key]
    @trigger 'filterExpanded'
