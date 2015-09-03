Q = require 'bluebird-q'
_s = require 'underscore.string'
qs = require 'qs'
Backbone = require 'backbone'
Gene = require '../../models/gene'
FilterArtworks = require '../../collections/filter_artworks'
aggregationParams = require './aggregations.coffee'

@index = (req, res, next) ->
  gene = new Gene id: req.params.id
  params = new Backbone.Model gene: gene.id
  filterArtworks = new FilterArtworks
  filterData = size: 0, gene_id: req.params.id, aggregations: aggregationParams

  Q.all [
    gene.fetch cache: true
    filterArtworks.fetch data: filterData
  ]

  .then ->
    # Permanently redirect to the new location
    # if the gene slug has been updated
    if gene.id isnt req.params.id
      return res.redirect 301, gene.href()

    # override mode if path is set
    if _s.contains req.path, 'artworks'
      mode = 'artworks'
    else if _s.contains req.path, 'artist'
      mode = 'artist'
    else
      mode = gene.mode()

    res.locals.sd.GENE = gene.toJSON()
    res.locals.sd.MODE = mode
    res.locals.sd.FILTER_COUNTS = counts = filterArtworks.counts

    res.render 'index',
      gene: gene
      filterRoot: gene.href() + '/artworks'
      counts: counts
      params: params
      activeText: ''
      mode: mode

  .catch next
  .done()
