Q = require 'bluebird-q'
Genes = require '../../collections/genes'

@index = (req, res) ->
  genes = new Genes

  Q.all([
    genes.fetchUntilEndInParallel(cache: true, data: published: true, sort: 'name')
  ]).done ->
    geneFamilies = genes.groupByFamily()

    res.render 'index',
      genes: genes
      geneFamilies: geneFamilies
