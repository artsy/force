{ extend } = require 'underscore'
{ capitalize } = require 'underscore.string'
Q = require 'bluebird-q'
ArtistsByLetter = require './collections/artists_by_letter'
metaphysics = require '../../lib/metaphysics'
fetchEOY2016Lists = require '../../components/eoy_artist_list/server.coffee'

@index = (req, res, next) ->
  send = query: require './query'

  return if metaphysics.debug req, res, send

  Q
    .all [
      metaphysics send
      fetchEOY2016Lists()
    ]
    .then ([data, eoy_artist_list]) ->
      res.render 'index', extend data,
        letters: ArtistsByLetter::range
        eoy_2016: eoy_artist_list

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
