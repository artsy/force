{ extend } = require 'underscore'
{ capitalize } = require 'underscore.string'
ArtistsByLetter = require './collections/artists_by_letter'
metaphysics = require '../../lib/metaphysics'

@index = (req, res, next) ->
  send = query: require './query'

  return if metaphysics.debug req, res, send

  metaphysics send
    .then (data) ->
      res.render 'index', extend data,
        letters: ArtistsByLetter::range

  .catch next

@letter = (req, res, next) ->
  currentPage = parseInt(req.query.page) or 1
  letter = req.params.letter.replace 'artists-starting-with-', ''
  artists = new ArtistsByLetter [], letter: letter, state: currentPage: currentPage

  artists.fetch()
    .then ->
      res.render 'letter',
        artists: artists
        letterRange: artists.range
        letter: capitalize letter

    .catch next
