_s = require 'underscore.string'
Backbone = require 'backbone'
FilterArtworks = require '../../collections/filter_artworks'

@index = (req, res) ->
  # just the aggregates, we don't need the works
  filterArtworks = new FilterArtworks
  filterArtworks.fetch
    cache: true
    data:
      size: 0
    success: ->
      res.locals.sd.FILTER_ROOT = '/browse/artworks'
      res.render 'index',
        filterRoot: res.locals.sd.FILTER_ROOT
        counts: filterArtworks.counts
        numberFormat: _s.numberFormat
        params: new Backbone.Model
        activeText: ''
