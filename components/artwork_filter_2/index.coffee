aggregationsMap = require './aggregations_map.coffee'
Backbone = require 'backbone'
ArtworkFiltersView = require './views/filters_view.coffee'
CountView = require './views/header_count_view.coffee'
SortsView = require './views/header_sorts_view.coffee'
MasonryView = require '../artwork_masonry/view.coffee'
Counts = require './models/counts.coffee'
Params = require './models/params.coffee'
Filter = require './models/filter.coffee'
qs = require 'querystring'

module.exports = ({ $el, artistID, scrollOffset = 0, stickyOffset = 0 }) ->
  paramsFromUrl = qs.parse(location.search.replace(/^\?/, ''))
  params = new Params paramsFromUrl
  counts = new Counts { params }

  new ArtworkFiltersView _.extend el: $el.find('.artwork-filter-criteria'), { counts, params, stickyOffset }
  new CountView _.extend el: $el.find('#artwork-section__totals'), { counts, params }
  new SortsView _.extend el: $el.find('#artwork-section__sorts-dropdown'), { params }

  masonry = new MasonryView
    el: $el.find('#artwork-section__columns')

  filter = new Filter
    params: params
    artist_id: artistID

  infiniteScroll = ->
    return if filter.allFetched() or filter.get 'isLoading'
    fold = $(window).height() + $(window).scrollTop()
    $masonry = masonry.$el
    filter.fetch() unless fold < $masonry.offset()?.top + $masonry.height() + scrollOffset

  filter.on 'fetched', ({ artworks, reset }) ->
    if reset
      masonry.reset artworks
      masonry.render()
    else
      masonry.appendArtworks artworks

    # It is possible to scroll farther than one page's worth of of artworks beyond the fold.
    # After appending or replacing artworks, check height and fetch to fill to the fold.
    _.defer -> infiniteScroll

  filter.on 'change:isLoading', (filter, loading) ->
    state = if loading then 'loading' else 'loaded'
    debugger
    $($el.find('#artwork-filter')).attr('data-state', state)

  $(window).on 'scroll.artwork-filter', _.throttle(infiniteScroll, 150)

  params.trigger 'firstSet', artistID

