Q             = require 'q'
_             = require 'underscore'
OrderedSets   = require '../../collections/ordered_sets.coffee'
{ isSSL }     = require '../../components/util/ssl.coffee'

@index = (req, res) ->
  [featuredGenes, popularCategories, geneCategories] = requests = [
    OrderedSets.new({ key: 'browse:featured-genes' }),
    OrderedSets.new({ key: 'browse:popular-categories' }),
    OrderedSets.new({ key: 'browse:gene-categories' })
  ]

  Q.allSettled(_.map(requests, (xs) -> xs.fetch(cache: true))).then ->
    Q.allSettled(_.flatten(_.map(requests, (xs) -> xs.fetchSets(cache: true)))).then ->
      underSSL = isSSL(req, res.locals.sd.SECURE_APP_URL)
      if underSSL
        featuredGenes.invoke 'set', underSSl: underSSL
        popularCategories.invoke 'set', underSSl: underSSL
        geneCategories.invoke 'set', underSSl: underSSL
      res.render 'template', {
        featuredGenes: featuredGenes,
        popularCategories: popularCategories,
        geneCategories: geneCategories
      }
