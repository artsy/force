_             = require 'underscore'
sd            = require('sharify').data
Q             = require 'q'
Artists       = require '../../collections/artists.coffee'
OrderedSets   = require '../../collections/ordered_sets.coffee'

parseGenes = (collection) ->
  collection.chain().
    # Exclude artists without images
    filter((model) -> model.hasImage('large')).
    # Randomize
    shuffle().
    # Take the first 4
    first(4).
    value()

@index = (req, res) ->
  requests = []

  featuredArtists   = new OrderedSets(key: 'homepage:featured-artists')
  featuredGenes     = new OrderedSets(key: 'artists:featured-genes')

  artistPromise = featuredArtists.fetchAll(cache: true)
  requests.push artistPromise

  genePromise = featuredGenes.fetchAll(cache: true)
  requests.push genePromise
  genePromise.then ->
    genesSet  = featuredGenes.findWhere item_type: 'Gene'
    genes     = genesSet.get 'items'

    genes.each (gene) ->
      promise = gene.fetchArtists 'trending', { cache: true }
      promise.then -> gene.trendingArtists = parseGenes gene.trendingArtists
      requests.push promise

    Q.allSettled(requests).then ->
      res.render 'index',
        featuredArtists:  featuredArtists.at(0)
        featuredGenes:    genes
