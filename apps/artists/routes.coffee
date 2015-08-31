_ = require 'underscore'
_s = require 'underscore.string'
Q = require 'bluebird-q'
OrderedSets = require '../../collections/ordered_sets'
Artist = require '../../models/artist'
ArtistsByLetter = require './collections/artists_by_letter'

# *try* to pull out an artist id from the links
@parseId = parseId = (string) ->
  _.last string.match /\/?artist\/([\w-]*)\/?$/

parseGenes = (collection) ->
  collection.chain().
    filter((model) -> model.hasImage('large')). # Exclude artists without images
    shuffle().
    first(4).
    value()

@index = (req, res) ->
  featuredArtists = new OrderedSets(key: 'homepage:featured-artists')
  featuredGenes = new OrderedSets(key: 'artists:featured-genes')
  genes = null

  render = _.after 2, ->
    res.render 'index',
      letterRange: ArtistsByLetter::range
      featuredArtists: featuredArtists.at 0
      featuredGenes: genes

  featuredArtists.fetchAll(cache: true).then ->
    links = featuredArtists.at(0)
    Q.allSettled(links.get('items').map (link) ->
      # Fetch and relate the artist featured in the link
      id = parseId link.get('href')
      artist = new Artist id: id
      link.set 'artist', artist
      artist.fetch cache: true
    ).then render

  featuredGenes.fetchAll(cache: true).then ->
    genesSet = featuredGenes.findWhere item_type: 'Gene'
    genes = genesSet.get 'items'
    Q.allSettled(genes.map (gene) ->
      gene.fetchArtists 'trending',
        cache: true
        success: ->
          gene.trendingArtists = parseGenes gene.trendingArtists
    ).then render

@letter = (req, res) ->
  currentPage = parseInt(req.query.page) or 1
  letter = req.params.letter.replace('artists-starting-with-', '')
  artists = new ArtistsByLetter([], { letter: letter, state: { currentPage: currentPage } })

  artists.fetch().then ->
    res.render 'letter',
      artists: artists
      letterRange: artists.range
      letter: _s.capitalize(letter)
