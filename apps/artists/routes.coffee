_                 = require 'underscore'
Q                 = require 'q'
OrderedSets       = require '../../collections/ordered_sets'
Artist            = require '../../models/artist'
ArtistsByLetter   = require './collections/artists_by_letter'

parseGenes = (collection) ->
  collection.chain().
    filter((model) -> model.hasImage('large')). # Exclude artists without images
    shuffle().
    first(4).
    value()

@index = (req, res) ->
  featuredArtists   = new OrderedSets(key: 'homepage:featured-artists')
  featuredGenes     = new OrderedSets(key: 'artists:featured-genes')
  genes             = null

  render = _.after 2, ->
    res.render 'index',
      letterRange:      ArtistsByLetter::range
      featuredArtists:  featuredArtists.at 0
      featuredGenes:    genes

  featuredArtists.fetchAll(cache: true).then ->
    links = featuredArtists.at(0)
    Q.allSettled(links.get('items').map (link) ->
      # Fetch and relate the artist featured in the link
      id      = link.get('href').replace(/\/?artist\//, '')
      artist  = new Artist(id: id)
      link.set 'artist', artist
      artist.fetch(cache: true)
    ).then render

  featuredGenes.fetchAll(cache: true).then ->
    genesSet  = featuredGenes.findWhere item_type: 'Gene'
    genes     = genesSet.get 'items'
    requests  = genes.map (gene) ->
      gene.fetchArtists('trending', { cache: true }).then ->
        gene.trendingArtists = parseGenes gene.trendingArtists
        # Fetch full attributes for the 4 randomly selected artists
        Q.allSettled(gene.trendingArtists.map (artist) ->
          artist.fetch(cache: true)
        ).then render

@letter = (req, res) ->
  currentPage   = parseInt(req.query.page) or 1
  letter        = req.params.letter.replace('artists-starting-with-', '')
  artists       = new ArtistsByLetter([], { letter: letter, state: { currentPage: currentPage } })

  artists.fetch(cache: true).then ->
    res.render 'letter',
      artists:      artists
      letterRange:  artists.range
      letter:       letter

