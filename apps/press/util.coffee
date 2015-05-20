_ = require 'underscore'

months = [
  'January'
  'February'
  'March'
  'April'
  'May'
  'June'
  'July'
  'August'
  'September'
  'October'
  'November'
  'December'
]

sorts =
  year: ({ year }) ->
    -(parseInt year)

  month: ({ month }) ->
    -(_.indexOf months, month)

groupMap = (collection, key, fn) ->
  _.map _.groupBy(collection, key), fn

module.exports =
  transform: (items) ->
    years = groupMap items, 'year', (months, year) ->
      months = groupMap months, 'month', (items, month) ->
        month: month, items: items
      year: year, months: _.sortBy months, sorts.month
    years = _.sortBy years, sorts.year
