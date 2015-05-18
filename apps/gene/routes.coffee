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
    # override mode if path is set
    if _s.contains req.path, 'artworks'
      mode = 'artworks'
    else if _s.contains req.path, 'artist'
      mode = 'artist'
    else
      mode = gene.mode()

    res.locals.sd.FILTER_ROOT = gene.href() + '/artworks'
    res.locals.sd.GENE = gene.toJSON()
    res.locals.sd.FILTER_PARAMS = new Backbone.Model gene: gene.id
    res.locals.sd.MODE = mode
    res.locals.sd.FILTER_COUNTS = counts = filterArtworks.counts

    res.render 'index',
      gene: gene
      filterRoot: res.locals.sd.FILTER_ROOT
      counts: counts
      numberFormat: _s.numberFormat
      params: params
      activeText: ''
      mode: mode

