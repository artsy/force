Q = require 'bluebird-q'
Backbone = require 'backbone'
Tag = require '../../models/tag'
FilterArtworks = require '../../collections/filter_artworks'
aggregationParams = require './aggregations'

@index = (req, res, next) ->
  tag = new Tag(id: req.params.id)
  filterArtworks = new FilterArtworks
  params = new Backbone.Model tag: tag.id
  filterData = { size: 0, tag: req.params.id, aggregations: aggregationParams }
  Q.all([
    tag.fetch(cache: true)
    filterArtworks.fetch(data: filterData, cache: true)
  ]).catch(next).then ->
    res.locals.sd.TAG = tag.toJSON()
    res.render 'index',
      tag: tag
      filterRoot: tag.href() + '/artworks'
      counts: filterArtworks.counts
      params: params
      activeText: ''
