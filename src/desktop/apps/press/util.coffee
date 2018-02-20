_ = require 'underscore'
moment = require 'moment'

sorts =
  year: ({ year }) ->
    -(parseInt year)

  month: ({ month }) ->
    -(moment().month(month).month())

  day: ({ day }) ->
    parseInt day

groupMap = (collection, key, fn) ->
  _.map _.groupBy(collection, key), fn

module.exports =
  sortedNestedGroupByDate: (items) ->
    years = groupMap items, 'year', (months, year) ->
      months = groupMap months, 'month', (items, month) ->
        month: month, items: _.sortBy items, sorts.day
      year: year, months: _.sortBy months, sorts.month
    years = _.sortBy years, sorts.year

  sortedByDate: (items) ->
    timestamped = _.mapObject items, (item) ->
      item.timestamp = moment()
        .year(item.year)
        .month(item.month)
        .day(item.day)
        .unix()
      item

    _.sortBy timestamped, 'timestamp'
