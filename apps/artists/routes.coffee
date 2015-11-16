_ = require 'underscore'
_s = require 'underscore.string'
ArtistsByLetter = require './collections/artists_by_letter'
metaphysics = require '../../lib/metaphysics'

@index = (req, res, next) ->
  metaphysics '
    {
      featured_artists: ordered_sets(key: "homepage:featured-artists") {
        name
        artists: items {
          ... on FeaturedLinkItem {
            id
            title
            subtitle
            href
            image {
              thumb: cropped(width: 600, height: 500, version: "wide") {
                width
                height
                url
              }
            }
          }
        }
      }
      featured_genes: ordered_sets(key: "artists:featured-genes") {
        name
        genes: items {
          ... on GeneItem {
            id
            name
            href
            trending_artists(sample: 4) {
              id
              href
              name
              years
              nationality
              image {
                url(version: "four_thirds")
              }
            }
          }
        }
      }
    }
  '
  .then (data) ->
    res.render 'index', _.extend data,
      letters: ArtistsByLetter::range
  .catch next
  .done()

@letter = (req, res, next) ->
  currentPage = parseInt(req.query.page) or 1
  letter = req.params.letter.replace 'artists-starting-with-', ''
  artists = new ArtistsByLetter [], letter: letter, state: currentPage: currentPage

  artists.fetch()
    .then ->
      res.render 'letter',
        artists: artists
        letterRange: artists.range
        letter: _s.capitalize letter
    .catch next
    .done()
