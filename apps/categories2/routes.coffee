Q = require 'bluebird-q'
Genes = require '../../collections/genes'

@index = (req, res) ->
  genes = new Genes

  Q.all([
    genes.fetchUntilEndInParallel(cache: true, data: published: true, sort: 'name')
  ]).done ->

    res.render 'index', 
      genes: genes
