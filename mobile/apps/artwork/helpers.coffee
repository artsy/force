{ groupBy, sortBy } = require 'underscore'
moment = require 'moment'

module.exports =
  groupBy: groupBy

  sortExhibitions: (shows) ->
    sortBy(shows, 'start_at').reverse()

  date: (field) ->
    moment(new Date field)
