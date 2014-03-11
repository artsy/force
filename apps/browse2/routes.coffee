Q = require 'q'
_ = require 'underscore'
OrderedSets = require '../../collections/ordered_sets.coffee'

@index = (req, res) ->
  [featuredGenes, popularCategories] = requests = [
    new OrderedSets(key: 'browse:featured-genes'),
    new OrderedSets(key: 'browse:popular-categories')
  ]
  Q.allSettled(_.map(requests, (xs) -> xs.fetchAll(cache: true))).then ->
    res.render 'index',
      featuredGenes: featuredGenes
      popularCategories: popularCategories