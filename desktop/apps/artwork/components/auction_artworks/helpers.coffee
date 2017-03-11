masonry = require '../../../../components/artwork_masonry_4_column/index.coffee'
{ ARTWORK_DISPLAY_NUM } = require './config.coffee'
{ upcomingLabel } = require('../../lib/auction_label')
{ partition, pluck, shuffle, take } = require 'underscore'

module.exports =
  masonry: (artworks, followed_artist_ids) ->
    followIds = pluck followed_artist_ids.hits, 'id'

    # Find followed artists and prepare to prepend to results array
    [followed, rest] = partition artworks,
      (artwork) =>
        followIds.some (id) => id == artwork.id

    displayArtworkResults = take shuffle(followed).concat(shuffle(rest)), ARTWORK_DISPLAY_NUM
    masonry displayArtworkResults

  upcomingLabel: upcomingLabel
