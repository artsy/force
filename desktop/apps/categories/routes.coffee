Q = require 'bluebird-q'
{ API_URL } = require('sharify').data
Items = require '../../collections/items'
Genes = require '../../collections/genes'
OrderedSets = require '../../collections/ordered_sets'

@index = (req, res) ->
  featuredGenes = new Items [], id: '51ba3bd10abd8521b3000049'
  geneCategories = new OrderedSets key: 'browse:gene-categories'
  genes = new Genes

  Q.all([
    featuredGenes.fetch(cache: true)
    geneCategories.fetchAll(cache: true)
    genes.fetchUntilEndInParallel(cache: true, data: published: true, sort: 'name')
  ]).done ->
    aToZGroup = genes.groupByAlphaWithColumns 3

    res.render 'index',
      featuredGenes: featuredGenes
      geneCategories: geneCategories
      aToZGroup: aToZGroup

@redirectCategory = (req, res) ->
  res.redirect 301, req.url.replace 'category', 'categories'

@redirectGene = (req, res) ->
  res.redirect 301, req.url.replace 'gene', 'categories'
