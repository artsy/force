mediator = require '../../lib/mediator.coffee'
aggregationsMap = require './aggregations_map.coffee'
Backbone = require 'backbone'
FiltersView = require './views/filters_view.coffee'
CountView = require './views/header_count_view.coffee'
SortsView = require './views/header_sorts_view.coffee'
MasonryView = require '../artwork_masonry/view.coffee'
Counts = require './models/counts.coffee'
Params = require './models/params.coffee'
Filter = require './models/filter.coffee'
qs = require 'querystring'
template = -> require('./templates/index.jade') arguments...

module.exports = class ArtworkFilterView extends Backbone.View
  subviews: []

  initialize: ({ @artistID, @topOffset = 0 }) ->
    @siteHeaderHeight = $('#main-layout-header').outerHeight(true)
    @path = window.location.pathname
    paramsFromUrl = qs.parse(window.location.search.replace(/^\?/, ''))
    @params = new Params paramsFromUrl

    @filter = new Filter
      params: @params
      artist_id: @artistID

    @listenTo @filter, 'change:allFetched', @allFetchedChanged
    @listenTo @filter, 'change:isLoading', @loadingStateChanged
    @listenTo @filter, 'fetchedArtworks', @fetchedArtworks
    _.each @params.whitelisted, (param) =>
      @listenTo @params, "change:#{param}", @paramsChanged

  postRender: ->
    counts = new Counts { @params }
    { @sticky } = new FiltersView _.extend
      el: @$('.artwork-filter-criteria'),
      stickyOffset: @siteHeaderHeight + @topOffset,
      { counts, @params }
    @subviews.push new CountView _.extend el: @$('#artwork-filter-right__totals'), { counts, @params }
    @subviews.push new SortsView _.extend el: @$('#artwork-filter-right__sorts-dropdown'), { @params }
    @subviews.push @masonry = new MasonryView el: @$('#artwork-filter-right__columns')
    @params.trigger 'firstSet', @artistID

  render: ->
    @$el.html template
    _.defer => @postRender()
    return this

  paramsChanged: ->
    @scrollToTop()
    @updateUrl()

  updateUrl: ->
    query = @params.currentParamsQueryString()
    url = _.compact([
      @path
      '?' if query
      query
    ]).join('')
    Backbone.history.navigate url,
      trigger: false
      replace: true

  scrollToTop: ->
    @$htmlBody ?= $('html, body')
    visibleTop = @$el.offset().top - @siteHeaderHeight
    visibleTop -= @topOffset
    @$htmlBody.animate { scrollTop: visibleTop - 1 }, 500

  infiniteScroll: =>
    return if @filter.get 'isLoading' or @filter.get 'allFetched'

    threshold = $(window).height() + $(window).scrollTop()
    $masonry = @masonry.$el
    @filter.fetch() if threshold > $masonry.offset()?.top + $masonry.height()

  fetchedArtworks: ({ artworks, reset }) =>
    if reset
      @masonry.reset artworks
      @masonry.render()
    else
      @masonry.appendArtworks artworks

    # It is possible to scroll farther than one page's worth of of artworks
    # beyond the fold. After appending or replacing artworks, check height
    # and fetch to fill to the fold.
    _.defer => @infiniteScroll()

  allFetchedChanged: (filter, allFetched) =>
    if allFetched
      $(window).off 'scroll.artwork-filter'
      mediator.trigger 'infinite:scroll:end'
    else
      $(window).on 'scroll.artwork-filter', _.throttle((=> @infiniteScroll()), 150)
      mediator.trigger 'infinite:scroll:start'

  loadingStateChanged: (filter, loading) =>
    state = if loading then 'loading' else 'loaded'
    @$('#artwork-filter-2').attr('data-state', state)

  remove: ->
    $(window).off 'scroll.artwork-filter'
    _.invoke @subviews, 'remove'
    super
