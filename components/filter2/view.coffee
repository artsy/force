_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
FilterArtworks = require '../../collections/filter_artworks.coffee'
ArtworkColumnsView = require '../artwork_columns/view.coffee'
DropdownGroupView = require './dropdown_group/view.coffee'
FilterFixedHeader = require './fixed_header/view.coffee'
HeadlineView = require './headline/view.coffee'
CountView = require './count/view.coffee'
SortView = require './sort/view.coffee'

module.exports = class FilterView extends Backbone.View
  giveUpCount: 0
  columnWidth: 300
  facets: ['price_range', 'dimension_range', 'medium']

  initialize: ({@collection, @params}) ->
    @initSubViews()

    @listenTo @collection, 'sync', @render

    @listenTo @params, 'change:page', =>
      @collection.fetch
        remove: false
        data: @params.toJSON()

    @listenTo @params, "change:sort", @reset
    for facet in @facets
      @listenTo @params, "change:#{facet}", @reset

    $.onInfiniteScroll @nextPage

  initSubViews: ->
    new DropdownGroupView
      el: @$('.filter-artworks-nav')
      collection: @collection
      params: @params
      facets: @facets

    new HeadlineView
      el: @$('.filter-heading')
      collection: @collection
      params: @params
      facets: @facets

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

    new FilterFixedHeader
      el: @$('.filter-fixed-header-nav')
      params: @params
      scrollToEl: @$('.filter-artworks-sort-count')

  render: (collection, response) =>
    @giveUpCount++ if collection.length is 0

    @$('.filter-artworks').attr 'data-state',
      if @giveUpCount > 2 then 'finished-paging'
      else if @params.get('page') > 500 then 'finished-paging'
      else ''

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

  reset: =>
    @params.
      set({ page: 1, size: @pageSize }, { silent: true }).
      trigger('change change:page')

    @giveUpCount = 0

    @$('.filter-artworks-list').html ''

    @collection.reset()

    _.defer @newColumnsView

