Backbone = require 'backbone'
Gene = require '../../models/gene'

@index = (req, res, next) ->
  gene = new Gene id: req.params.id
  gene
    .fetch
      cache: true
      headers: 'X-Request-Id': req.id
    .then ->
      # Permanently redirect to the new location
      # if the gene slug has been updated
      if gene.id isnt req.params.id
        return res.redirect 301, gene.href()

      res.locals.sd.GENE = gene.toJSON()
      res.locals.sd.MODE = gene.mode()

      res.render 'index',
        gene: gene
    
    .catch next
