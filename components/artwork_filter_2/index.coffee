aggregationsMap = require './aggregations_map.coffee'
Backbone = require 'backbone'
ArtworkFiltersView = require './views/filters_view.coffee'
CountView = require './views/header_count_view.coffee'
SortsView = require './views/header_sorts_view.coffee'
ArtworkColumnsView = require '../../components/artwork_columns/view.coffee'
Counts = require './models/counts.coffee'
Params = require './models/params.coffee'
ArtworkFilter = require './models/filter.coffee'
qs = require 'querystring'

module.exports = ({ $el, artistID }) ->
  paramsFromUrl = qs.parse(location.search.replace(/^\?/, ''))
  params = new Params paramsFromUrl
  counts = new Counts { params }

  filter = new ArtworkFilter { artistID, params }
  new ArtworkFiltersView _.extend el: $el.find('.artwork-filter-criteria'), { counts, params }
  new CountView _.extend el: $el.find('#artwork-section__totals'), { counts, params }
  new SortsView _.extend el: $el.find('#artwork-section__sorts-dropdown'), { params }

  # Main Artworks view
  filter.artworks.on 'reset', ->
    artworkView = new ArtworkColumnsView
      collection: filter.artworks
      el: $el.find('#artwork-section__columns')
      allowDuplicates: true
      gutterWidth: 30
      numberOfColumns: 3
      context_page: 'Artist page'

  params.trigger 'firstSet', artistID

