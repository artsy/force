masonry = require '../../../../components/artwork_masonry_4_column/index.coffee'
upcomingLabel = require('../../../../components/react/auction_block/utils/upcoming_label').default
{ ARTWORK_DISPLAY_NUM } = require './config.coffee'
{ partition, pluck, shuffle, take } = require 'underscore'

prepareMasonry = (artworks, followed_artist_ids) ->
  followIds = pluck followed_artist_ids.hits, 'id'

  # Find followed artists and prepare to prepend to results array
  [followed, rest] = partition artworks,
    (artwork) ->
      followIds.some (id) -> id == artwork.id

  displayArtworkResults = take shuffle(followed).concat(shuffle(rest)), ARTWORK_DISPLAY_NUM
  displayArtworkResults

module.exports =
  prepareMasonry: prepareMasonry
  masonry: (artworks, followed_artist_ids) ->
    masonry prepareMasonry(artworks, followed_artist_ids)

  upcomingLabel: upcomingLabel
