Q = require 'q'
OrderedSets = require '../../collections/ordered_sets'
Genes = require '../../collections/genes'
{ API_URL } = require('sharify').data

@index = (req, res) ->
  geneCategories = new OrderedSets key: 'browse:gene-categories'
  genes = new Genes

  Q.all([
    geneCategories.fetchAll cache: true
    genes.fetchUntilEndInParallel
      data: published: true, sort: 'name'
      url: "#{API_URL}/api/v1/genes"
      cache: true
  ]).done ->

    aToZGroup = genes.groupByAlphaWithColumns 3
    res.render 'index',
      geneCategories: geneCategories
      aToZGroup: aToZGroup
