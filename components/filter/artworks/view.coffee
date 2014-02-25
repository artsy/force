_ = require 'underscore'
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
    @params = new Backbone.Model

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
    @params.on 'change:price_range change:dimension change:medium change:sort reset', @reset
    @params.on 'change:page', =>
      @artworks.fetch { data: @params.toJSON(), remove: false, size: @pageSize }
    @$el.infiniteScroll @nextPage

  render: (col, res) =>
    @$('.filter-artworks').attr 'data-state',
      if @artworks.length is 0 then 'no-results'
      else if res.length is 0 then 'finished-paging'
      else ''
    @newColumnsView() unless @columnsView?
    @columnsView.appendArtworks(new Artworks(res).models)

  renderCounts: =>
    @$('.filter-artworks-num').html @counts.get('total')

  nextPage: =>
    return if @$('.filter-artworks').is(':hidden') or
              @$('.filter-artworks').attr('data-state') is 'finished-paging'
    @params.set page: (@params.get('page') + 1) or 1

  reset: =>
    @params.set({ page: 1 }, { silent: true }).trigger('change change:page')
    @counts.fetch data: @params.toJSON()
    @$('.filter-artworks-list').html ''
    _.defer @newColumnsView

  newColumnsView: =>
    @columnsView?.remove()
    @$('.filter-artworks-list').html $el = $("<div></div>")
    @columnsView = new ArtworkColumnsView
      el: $el
      collection: new Artworks
      artworkSize: 'tall'
      numberOfColumns: Math.round $el.width() / COLUMN_WIDTH
      gutterWidth: 40
