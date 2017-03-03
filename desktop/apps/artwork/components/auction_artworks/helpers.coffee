_ = require 'underscore'
masonry = require '../../../../components/artwork_masonry/index.coffee'

reduceArray = (artworks, rows) ->
  elements = artworks.splice(0,3)
  rows.push(elements)

  if artworks.length > 0
    reduceArray(artworks, rows)
  rows

module.exports =
  masonry: masonry

  auctionArtworkRows: (artworks) ->
    rows = []
    reduceArray(artworks, rows)
