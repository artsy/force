Gene = require '../../models/gene'
_ = require 'underscore'

module.exports.index = (req, res, next) ->
  gene = new Gene id: req.params.id
  gene.fetch
    cache: true
    success: ->
      res.locals.sd.GENE = gene.toJSON()
      res.locals.sd.PARAMS = _.extend req.query, gene_id: req.params.id
      res.render 'index', gene: gene
    error: res.backboneError
