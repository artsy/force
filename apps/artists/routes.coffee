_                 = require 'underscore'
Q                 = require 'q'
OrderedSets       = require '../../collections/ordered_sets'
ArtistsByLetter   = require './collections/artists_by_letter'

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

    requests = requests.concat genes.map (gene) ->
      deferred      = Q.defer()
      genePromise   = gene.fetchArtists 'trending', { cache: true }

      genePromise.then ->
        gene.trendingArtists = parseGenes gene.trendingArtists
        # Fetch full attributes for the 4 randomly selected artists
        Q.allSettled(gene.trendingArtists.map (artist) ->
          artist.fetch(cache: true)
        ).then -> deferred.resolve.apply this, arguments

      deferred.promise

    Q.allSettled(requests).then ->
      res.render 'index',
        letterRange:      ArtistsByLetter::range
        featuredArtists:  featuredArtists.at 0
        featuredGenes:    genes

@letter = (req, res) ->
  currentPage   = parseInt(req.query.page) or 1
  letter        = req.params.letter
  artists       = new ArtistsByLetter([], { letter: letter, state: { currentPage: currentPage } })

  artists.fetch(cache: true).then ->
    res.render 'letter',
      artists:      artists
      letterRange:  artists.range
      letter:       letter

