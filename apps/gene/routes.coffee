_s = require 'underscore.string'
Q = require 'q'
Backbone = require 'backbone'
Gene = require '../../models/gene'
FilterArtworks = require '../../collections/filter_artworks'

@index = (req, res, next) ->
  gene = new Gene(id: req.params.id)
  filterArtworks = new FilterArtworks
  params = new Backbone.Model gene: gene.id

  Q.all([
    gene.fetch(cache: true)
    filterArtworks.fetch(data: { size: 0, gene: req.params.id } )
  ]).done ->
    res.locals.sd.FILTER_ROOT = gene.href() + '/artworks'
    res.locals.sd.GENE = gene.toJSON()
    res.locals.sd.FILTER_PARAMS = new Backbone.Model gene: gene.id

    res.render 'index',
      gene: gene
      filterRoot: res.locals.sd.FILTER_ROOT
      counts: filterArtworks.counts
      numberFormat: _s.numberFormat
      params: params
      activeText: ''

