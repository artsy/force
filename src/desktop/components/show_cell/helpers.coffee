moment = require 'moment'
_ = require 'underscore'

module.exports =
  isEndingSoon: (show, days = 5, today = moment().startOf('day')) ->
    soon = moment.duration(days, 'days').valueOf()
    diff = @date(show.end_at).diff(today)
    diff <= soon and diff >= 0

  endingIn: (show, today = moment().startOf('day')) ->
    days = @date(show.end_at).diff(today, 'days')
    if days is 0 then 'today' else "in #{days} day#{if days is 1 then '' else 's'}"

  showOrFairLocation: (show) ->
    location = show.fair?.location?.city
    location ?= show.location?.city
    location ?= show.city

  date: (field) ->
    moment(new Date field)

  locationAndDate: (show) ->
    _.compact([
      @showOrFairLocation show
      show.exhibition_period
    ]).join ', '

  partnerNameAndLocation: (show) ->
    _.compact([
      show.partner?.name
      @showOrFairLocation show
    ]).join ', '
