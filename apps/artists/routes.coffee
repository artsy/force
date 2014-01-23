_             = require 'underscore'
sd            = require('sharify').data
Q             = require 'q'
Artist        = require '../../models/artist.coffee'
OrderedSets   = require '../../collections/ordered_sets.coffee'

letterRange = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

# This collection to be extracted and cleaned up at a later time
PageableCollection = require 'backbone-pageable'
class ArtistsByLetter extends PageableCollection
  url: ->
    "#{sd.ARTSY_URL}/api/v1/artists/#{@letter}?total_count=1"

  model: Artist

  state:
    pageSize: 100

  queryParams:
    currentPage: 'page'
    pageSize: 'size'

  parseState: (resp, queryParams, state, options) ->
    if options.res
      { totalRecords: parseInt(options.res.headers['x-total-count']) }

  initialize: (models, options={}) ->
    { @letter } = options
    super

parseGenes = (collection) ->
  collection.chain().
    filter((model) -> model.hasImage('large')). # Exclude artists without images
    shuffle().
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
        letterRange:      letterRange
        featuredArtists:  featuredArtists.at 0
        featuredGenes:    genes

@letter = (req, res) ->
  # Should probably 404, throw error for the time being
  throw new Error('Invalid option') unless _.contains(letterRange, req.params.letter)

  currentPage   = parseInt(req.query.page) or 1
  letter        = req.params.letter
  artists       = new ArtistsByLetter([], { letter: letter, state: { currentPage: currentPage } })

  artists.fetch(cache: true).then ->
    res.render 'letter',
      artists:      artists
      letterRange:  letterRange
      letter:       letter

