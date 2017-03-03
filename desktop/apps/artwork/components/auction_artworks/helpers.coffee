masonry = require '../../../../components/artwork_masonry_4_column/index.coffee'
moment = require 'moment'
{ ARTWORK_DISPLAY_NUM } = require './config.coffee'
{ include, shuffle, take } = require 'underscore'

isLiveOpen = (status, live_start_at) ->
  status == 'open' and moment().isAfter(live_start_at)

isPreviewState = (status) ->
  include(['preview'], status)

zone = (time) ->
  moment(time).tz('America/New_York')

module.exports =
  masonry: (artworks) ->
    masonry take shuffle(artworks), ARTWORK_DISPLAY_NUM

  upcomingLabel: (start_at, end_at, live_start_at, status) ->
    timeFormat = 'MMM D h:mm A z'

    if live_start_at and not isLiveOpen(status, live_start_at)
      "bidding begins #{zone(live_start_at).format(timeFormat)}"
    else if live_start_at
      "bidding now open"
    else if isPreviewState(status)
      "opens #{zone(start_at).format(timeFormat)}"
    else
      "closes #{zone(end_at).format(timeFormat)}"
