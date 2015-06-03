Backbone = require 'backbone'
FilterArtworks = require '../../collections/filter_artworks'
aggregationParams = require './aggregations.coffee'

@index = (req, res) ->
  # just the aggregates, we don't need the works
  filterArtworks = new FilterArtworks
  filterData = { size: 0, aggregations: aggregationParams }
  filterArtworks.fetch
    cache: true
    data: filterData
    success: ->
      res.locals.sd.FILTER_ROOT = '/browse/artworks'
      res.render 'index',
        filterRoot: res.locals.sd.FILTER_ROOT
        counts: filterArtworks.counts
        params: new Backbone.Model
        activeText: ''
