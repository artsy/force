Backbone = require 'backbone'
FilterArtworks = require '../../collections/filter_artworks'
aggregationParams = require './aggregations.coffee'

@index = (req, res) ->
  # just the aggregates, we don't need the works
  filterArtworks = new FilterArtworks
  filterData = { size: 0, aggregations: aggregationParams }
  filterArtworks.fetch
    data: filterData
    success: ->
      res.render 'index',
        filterRoot: '/browse/artworks'
        counts: filterArtworks.counts
        params: new Backbone.Model
        activeText: ''
