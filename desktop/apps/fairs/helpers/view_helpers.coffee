DateHelpers = require '../../../components/util/date_helpers.coffee'
_ = require 'underscore'

module.exports =

  currentRows: (fairs) ->
    @fillRows @currentFairs(fairs)

  fillRows: (fairs) ->
    rows = []

    if fairs.length is 1
      rows.push @makeRow(fairs, 'full')
      return rows

    for fair in fairs
      unless fair.in_row
        switch @bannerSize(fair)
          # x-large banner_size fairs get a full row
          when 1
            rows.push @makeRow [fair], "full"
            break
          # every other size gets a half row
          else
            neighbor = _.chain(fairs)
              .reject((f) => f.id is fair.id)
              .reject((f) => f.in_row)
              .find((f) => @bannerSize(f) isnt 1)
              .value()
            if neighbor
              rows.push @makeRow [fair, neighbor], 'half'
            else
              rows.push @makeRow [fair], 'half-promo'
            break
    rows

  makeRow: (fairs, type) ->
    _.each fairs, (fair) -> fair.in_row = true

    {
      fairs: fairs
      type: type
    }

  formatDates: (fair) ->
    DateHelpers.timespanInWords fair.start_at, fair.end_at

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

  bannerSize: (fair) ->
    sizes =
      'x-large' : 1
      'large' : 2
      'medium' : 3
      'small' : 4
      'x-small' : 5
    sizes[fair.banner_size]

  currentFairs: (fairs) ->
    _.chain(fairs)
      .filter((fair) => @isCurrent(fair))
      .sortBy((fair) => @bannerSize(fair))
      .value()

  parseGroups: (fairs) ->
    currentFairs: @currentFairs(fairs)
    pastFairs: _.chain(fairs)
      .filter((fair) => @isPast(fair))
      .sortBy((fair) -> - Date.parse(fair.start_at))
      .value()
    upcomingFairs: _.chain(fairs)
      .filter((fair) => @isUpcoming(fair))
      .sortBy((fair) -> Date.parse(fair.start_at))
      .take(25)
      .value()
