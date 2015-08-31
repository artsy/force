Q = require 'bluebird-q'
Backbone = require 'backbone'
Tag = require '../../models/tag'
FilterArtworks = require '../../collections/filter_artworks'
aggregationParams = require './aggregations.coffee'

@index = (req, res, next) ->
  tag = new Tag(id: req.params.id)
  filterArtworks = new FilterArtworks
  params = new Backbone.Model tag: tag.id
  filterData = { size: 0, tag: req.params.id, aggregations: aggregationParams }
  Q.all([
    tag.fetch(cache: true)
    filterArtworks.fetch(data: filterData)
  ]).done ->
    res.locals.sd.FILTER_ROOT = tag.href() + '/artworks'
    res.locals.sd.TAG = tag.toJSON()

    res.render 'index',
      tag: tag
      filterRoot: res.locals.sd.FILTER_ROOT
      counts: filterArtworks.counts
      params: params
      activeText: ''
