_ = require 'underscore'
_.mixin require 'underscore.string'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
FilterSortCount = require '../sort_count/view.coffee'
ArtworkColumnsView = require '../../artwork_columns/view.coffee'
FilterArtworksNav = require '../artworks_nav/view.coffee'
FilterFixedHeader = require '../fixed_header/view.coffee'
FilterRouter = require '../router/index.coffee'
FilterNav = require '../nav/view.coffee'
COLUMN_WIDTH = 300

module.exports = class FilterArtworksView extends Backbone.View

  pageSize: 10

  initialize: (options) ->
    _.extend @, options
    @$window = $(window)

    # Set up artworks, a params model that stores the state of the filter
    # query params, and a counts model that syncs to the
    # /api/v1/search/filtered/:model/:id/suggest API to update numbers like "Showing X Works".
    # The various sub-views will hook into these model/collection events to update themselves.
    @artworks = new Artworks
    @artworks.url = @artworksUrl
    @counts = new Backbone.Model
    @counts.url = @countsUrl
    @params = new Backbone.Model size: @pageSize

    # Add child views/routers passing in necessary models/collections
    new FilterSortCount
      el: @$('.filter-artworks-sort-count')
      counts: @counts
      params: @params
    new FilterArtworksNav
      el: @$('.filter-artworks-nav')
      counts: @counts
      params: @params
    new FilterNav
      el: @$('.filter-artworks-nav')
      params: @params
      highlightAllAttrs: ['price_range', 'dimension', 'medium']
    new FilterFixedHeader
      el: @$('.filter-fixed-header-nav')
      params: @params
      scrollToEl: @$('.filter-artworks-sort-count')
    @router = new FilterRouter
      params: @params
      urlRoot: @urlRoot

    # Hook up events on the artworks, params, and counts
    @artworks.on 'sync', @render
    @counts.on 'sync', @renderCounts
    throttledReset = _.debounce @reset, 100
    @params.on 'change:price_range change:dimension change:medium change:sort reset', throttledReset
    @params.on 'change:page', =>
      @artworks.fetch { data: @params.toJSON(), remove: false }
    @$el.infiniteScroll @nextPage

  render: (col, res) =>
    @$('.filter-artworks').attr 'data-state',
      if @artworks.length is 0 then 'no-results'
      else if res.length is 0 then 'finished-paging'
      else ''
    @newColumnsView() unless @columnsView?
    @columnsView.appendArtworks(new Artworks(res).models)

  renderCounts: =>
    @$('.filter-artworks-num').html _.numberFormat @counts.get('total')

  nextPage: =>
    return if @$('.filter-artworks').is(':hidden') or
              @$('.filter-artworks').attr('data-state') is 'finished-paging'
    @params.set page: (@params.get('page') + 1) or 1

  reset: =>
    @params.set({ page: 1, size: @pageSize }, { silent: true }).trigger('change change:page')
    @counts.fetch data: @params.toJSON()
    @$('.filter-artworks-list').html ''
    _.defer @newColumnsView
    @$('h2.filter-heading').text @paramsToHeading()

  dimensionHash:
    "24": 'Small'
    "48": 'Medium'
    "84": 'Large'

  priceHash:
    '-1:1000'            : 'Under $1,000'
    '1000:5000'          : 'beweeen $1,000 & $5,000'
    '5000:10000'         : 'between $5,000 & $10,000'
    '10000:50000'        : 'between $10,000 & $50,000'
    '50000:1000000000000': 'over $50,000'
    '-1:1000000000000'   : 'for Sale'

  paramsToHeading: ->
    _.compact([
      @dimensionHash[@params.get('dimension')]
      "artworks"
      @priceHash[@params.get('price_range')]
    ]).join(' ')

  newColumnsView: =>
    @columnsView?.remove()
    @$('.filter-artworks-list').html $el = $("<div></div>")
    @columnsView = new ArtworkColumnsView
      el: $el
      collection: new Artworks
      artworkSize: 'tall'
      numberOfColumns: Math.round $el.width() / COLUMN_WIDTH
      gutterWidth: 40
