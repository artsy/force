{ timespanInWords } = require '../../components/util/date_helpers.coffee'

module.exports =
  viewAllUrl: (module) ->
    return module.context.href if module.context

    urls =
      active_bids: false
      followed_artists: '/works-for-you'
      followed_galleries: '/user/saves'
      saved_works: '/user/saves'
      recommended_works: false
      live_auctions: false
      current_fairs: false
      related_artists: false
      genes: false

    urls[module.key]

  timeSpan: (start_at, end_at) ->
    timespanInWords start_at, end_at


