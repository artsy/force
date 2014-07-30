Gene = require '../../models/gene'

@index = (req, res, next) ->
  new Gene(id: req.params.id).fetch
    success: (gene) ->
      res.locals.sharify.data.GENE = gene.toJSON()
      res.render 'index',
        gene: gene
        filterRoot: gene.href() + '/artworks'
    error: res.backboneError
