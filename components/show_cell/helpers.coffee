moment = require 'moment'
_ = require 'underscore'

module.exports =
  isEndingSoon: (show, days = 5, today = moment().startOf('day')) ->
    soon = moment.duration(days, 'days').valueOf()
    diff = moment(new Date show.end_at).diff(today)
    diff <= soon and diff >= 0

  endingIn: (show, today = moment().startOf('day')) ->
    days = moment(show.end_at).diff(today, 'days')
    if days is 0 then 'today' else "in #{days} day#{if days is 1 then '' else 's'}"

  locationAndDate: (show) ->
    location = show.fair?.location?.city
    location ?= show.location?.city
    _.compact([
      location
      show.exhibition_period
    ]).join ', '