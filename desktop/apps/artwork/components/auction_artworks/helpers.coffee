masonry = require '../../../../components/artwork_masonry_4_column/index.coffee'
moment = require 'moment'
{ ARTWORK_DISPLAY_NUM } = require './config.coffee'
{ include, partition, pluck, shuffle, take } = require 'underscore'

isLiveOpen = (status, live_start_at) ->
  status == 'open' and moment().isAfter(live_start_at)

isPreviewState = (status) ->
  include(['preview'], status)

zone = (time) ->
  moment(time).tz('America/New_York')

module.exports =
  masonry: (artworks, followed_artist_ids) ->
    followIds = pluck followed_artist_ids.hits, 'id'

    # Find followed artists and prepare to prepend to results array
    [followed, rest] = partition artworks,
      (artwork) =>
        followIds.some (id) => id == artwork.id

    displayArtworkResults = take shuffle(followed).concat(shuffle(rest)), ARTWORK_DISPLAY_NUM
    masonry displayArtworkResults

  upcomingLabel: (start_at, end_at, live_start_at, status) ->
    timeFormat = 'MMM D, h:mm A z'

    if live_start_at and not isLiveOpen(status, live_start_at)
      "opens for live bidding #{zone(live_start_at).format(timeFormat)}"
    else if live_start_at
      "open for live bidding"
    else if isPreviewState(status)
      "opens #{zone(start_at).format(timeFormat)}"
    else
      "closes #{zone(end_at).format(timeFormat)}"
