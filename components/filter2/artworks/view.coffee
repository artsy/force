_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
FilterArtworks = require '../../../collections/filter_artworks.coffee'
FilterSortCount = require '../sort_count/view.coffee'
ArtworkColumnsView = require '../../artwork_columns/view.coffee'
FilterArtworksNav = require '../artworks_nav/view.coffee'
FilterFixedHeader = require '../fixed_header/view.coffee'
FilterRouter = require '../router/index.coffee'
FilterNav = require '../nav/view.coffee'
COLUMN_WIDTH = 300

humanize = require('underscore.string').humanize

module.exports = class FilterArtworksView extends Backbone.View

  pageSize: 10

  initialize: (options) ->
    _.extend @, options
    @$window = $(window)

    # Set up artworks, and a params model that stores the state of the filter query params
    # The various sub-views will hook into these model/collection events to update themselves.
    @artworks = new FilterArtworks
    @params = new Backbone.Model size: @pageSize

    # Add child views/routers passing in necessary models/collections
    new FilterSortCount
      el: @$('.filter-artworks-sort-count')
      collection: @artworks
      params: @params
    new FilterArtworksNav
      el: @$('.filter-artworks-nav')
      collection: @artworks
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

    # Reset gets called on many events, debounce so only the last one gets called
    @throttledReset = _.debounce @reset, 200

    # Hook up events on the artworks, params, and counts
    @artworks.on 'sync', @render
    @artworks.on 'sync', @renderCounts
    @params.on 'change:price_range change:dimensions change:medium change:sort reset', @throttledReset
    @params.on 'change:page', =>
      @artworks.fetch
        remove: false
        data: @params.toJSON()

    $.onInfiniteScroll @nextPage

    # Ensure things kick off on initialize
    unless @skipReset
      _.defer => @params.trigger 'reset'

  render: (col, res) =>
    @giveUpCount ?= 0
    @giveUpCount++ if res?.length is 0
    @$('.filter-artworks').attr 'data-state',
      if @artworks.length is 0 then 'no-results'
      else if @giveUpCount > 100 then 'finished-paging'
      else if @params.get('page') > 500 then 'finished-paging'
      else ''
    @newColumnsView() unless @columnsView?
    @columnsView.appendArtworks(new FilterArtworks(res.hits).models)

  renderCounts: =>
    countsFormat = _s.numberFormat @artworks.counts.total.value
    @$('.filter-artworks-num').html countsFormat

    # Update meta description
    $('meta[name=description]').remove()
    $('head').append("<meta name='description' content='Collect #{countsFormat} artworks. Purchase online or connect with over 1,500 top galleries.'>")

  nextPage: =>
    return if @$('.filter-artworks').is(':hidden') or
              @$('.filter-artworks').attr('data-state') is 'finished-paging'
    @params.set page: (@params.get('page') + 1) or 1

  reset: =>
    @params.set({ page: 1, size: @pageSize }, { silent: true }).trigger('change change:page')

    @$('.filter-artworks-list').html ''
    _.defer @newColumnsView
    if headingText = @paramsToHeading()
      @$('h1.filter-heading').text(headingText).show()
      document.title = _.compact([
        @customPageTitle
        _s.capitalize(headingText)
        "Artsy"
      ]).join(' | ')
    else
      @$('h1.filter-heading').hide()

  paramsToHeading: ->
    _.compact([
      @artworks.counts?['dimensions']?[@params.get('dimensions')]?.name
      @artworks.counts?['mediums']?[@params.get('medium')]?.name
      @artworks.counts?['prices']?[@params.get('price_range')]?.name
    ]).join(' ')

  newColumnsView: =>
    @columnsView?.remove()
    @$('.filter-artworks-list').html $el = $("<div></div>")
    @columnsView = new ArtworkColumnsView
      el: $el
      collection: new FilterArtworks
      artworkSize: 'tall'
      numberOfColumns: Math.round $el.width() / COLUMN_WIDTH
      gutterWidth: 40
