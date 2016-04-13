{ extend } = require 'underscore'
masonry = require '../../../../components/artwork_masonry/index.coffee'
template = -> require('./index.jade') arguments...

module.exports =
  query:
    name: 'artist_artworks'
    query: require './query.coffee'

  init: (data) ->
    $el = $('.js-artwork-artist-artworks')
    $el.replaceWith $el = $ template extend data,
      columns: masonry data.artwork.artist.artworks
