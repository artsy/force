_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
FilterArtworks = require '../../collections/filter_artworks.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'
ArtworkColumnsView = require '../artwork_columns/view.coffee'
DropdownGroupView = require './dropdown_group/view.coffee'
FilterFixedHeader = require './fixed_header/view.coffee'
HeadlineView = require './headline/view.coffee'
CountView = require './count/view.coffee'
SortView = require './sort/view.coffee'

module.exports = class FilterView extends Backbone.View
  defaults:
    giveUpCount: 0
    columnWidth: 300
    includeFixedHeader: true
    facets: ['price_range', 'dimension_range', 'medium']
    hideForSale: false
    includeAllWorks: false
    infiniteScroll: true
    pageSize: 10

  events:
    'click .filter-artworks-see-more' : 'nextPage'

  initialize: (options) ->
    { @collection, @params, @stuckFacet, @stuckParam } = options
    { @giveUpCount,
      @columnWidth,
      @includeFixedHeader,
      @facets,
      @hideForSale,
      @includeAllWorks
      @infiniteScroll,
      @pageSize } = _.defaults options, @defaults

    @initSubViews()

    @listenTo @collection, 'sync', @render

    @listenTo @params, 'change:page', =>
      @$('.filter-artworks').addClass 'is-loading'
      @collection.fetch
        remove: false
        data: @params.toJSON()
        complete: => @$('.filter-artworks').removeClass 'is-loading'

    @listenTo @params, "change:sort", @reset
    @listenTo @params, "change:for_sale", @reset
    for facet in @facets
      @listenTo @params, "change:#{facet}", @reset

    $.onInfiniteScroll(@nextPage) if @infiniteScroll

  initSubViews: ->
    new DropdownGroupView
      el: @$('.filter-artworks-nav')
      collection: @collection
      params: @params
      facets: @facets
      hideForSale: @hideForSale
      includeAllWorks: @includeAllWorks

    new HeadlineView
      el: @$('.filter-heading')
      collection: @collection
      params: @params
      facets: @facets
      stuckFacet: @stuckFacet
      stuckParam: @stuckParam

    new CountView
      el: @$('.filter-sort-count-count')
      collection: @collection
      params: @params
      facets: @facets

    new SortView
      el: @$('.filter-sort-count-pulldown')
      collection: @collection
      params: @params
      facets: @facets

    if @includeFixedHeader
      new FilterFixedHeader
        el: @$('.filter-fixed-header-nav')
        params: @params
        scrollToEl: @$('.filter-artworks-sort-count')

  render: (collection, response) =>
    @giveUpCount++ if response.hits.length is 0

    state =
      if @giveUpCount is 1 then 'finished-paging'
      else if @params.get('page') > 500 then 'finished-paging'
      else if response.hits.length < @pageSize then 'finished-paging'
      else ''

    @$('.filter-artworks').attr 'data-state', state

    @trigger("state:#{state}") if state

    @newColumnsView() unless @columnsView?
    @columnsView.appendArtworks collection.models

  newColumnsView: =>
    @columnsView?.remove()
    @$('.filter-artworks-list').html $el = $("<div></div>")
    @columnsView = new ArtworkColumnsView
      el: $el
      collection: new FilterArtworks
      artworkSize: 'tall'
      numberOfColumns: Math.round $el.width() / @columnWidth
      gutterWidth: 40

  nextPage: =>
    return if @$('.filter-artworks').is(':hidden') or
              @$('.filter-artworks').attr('data-state') is 'finished-paging'
    @params.set page: (@params.get('page') + 1) or 1

    analyticsHooks.trigger 'artwork_filter:new_page', { page: @params.get('page') }

  reset: =>
    @params.
      set({ page: 1, size: @pageSize }, { silent: true }).
      trigger('change change:page')

    @giveUpCount = 0

    @$('.filter-artworks-list').html ''

    @collection.reset()

    _.defer @newColumnsView

