_ = require 'underscore'
DateHelpers = require '../../components/util/date_helpers.coffee'

module.exports = 

  isCurrent: (fair) ->
    @isEligible(fair) and @isNotOver(fair)

  isEligible: (fair) ->
    fair.is_published and fair.profile?.is_published

  isNotOver: (fair) ->
    Date.parse(fair.end_at) > new Date

  isPast: (fair) ->
    @isEligible(fair) and @isOver(fair)

  isOver: (fair) ->
    Date.parse(fair.end_at) < new Date

  isUpcoming: (fair) ->
    @isEventuallyEligible(fair) and @isNotOver(fair)

  isEventuallyEligible: (fair) ->
    fair.is_published and not fair.profile?.is_published

  formatDates: (fair) ->
    DateHelpers.timespanInWords fair.start_at, fair.end_at

  cityStateAndCountry: (location) ->
    _.compact([
      location?.city or ''
      location?.state or ''
      location?.country or ''
    ]).join(', ')

  allPastFairs: (fairs) ->
    _.chain(fairs)
      .filter((fair) => @isPast(fair))
      .sortBy((fair) -> - Date.parse(fair.start_at))
      .value()

  pastFairs: (fairs) ->
    _.chain(fairs)
      .filter((fair) => @isPast(fair))
      .sortBy((fair) -> - Date.parse(fair.start_at))
      .take(6)
      .value()

  upcomingFairs: (fairs) ->
    _.chain(fairs)
      .filter((fair) => @isUpcoming(fair))
      .sortBy((fair) -> Date.parse(fair.start_at))
      .value()

  currentFairs: (fairs) ->
    _.chain(fairs)
      .filter((fair) => @isCurrent(fair))
      .value()

  parseGroups: (fairs) ->
    currentFairs: @currentFairs(fairs)
    pastFairs: @pastFairs(fairs)
    upcomingFairs: @upcomingFairs(fairs)
