moment = require 'moment'
_ = require 'underscore'

module.exports = class DateHelpers

  @formatDate: (utc_date) ->
    date = moment.utc utc_date

    month = date.format('MMM')
    day = date.format('Do')

    "#{month} #{day}"

  @timespanInWords: (utc_start, utc_end, formats = {}) ->
    defaultFormats =
      day: 'Do'
      month: 'MMM'
      year: 'YYYY'

    formats = _.defaults formats, defaultFormats

    start = moment.utc utc_start
    end = moment.utc utc_end

    startMonth = start.format(formats.month)
    startDay = start.format(formats.day)

    endMonth = end.format(formats.month)
    endDay = end.format(formats.day)

    if start.year() is end.year()
      if start.month() is end.month() and start.date() is end.date()
        monthAndDate = "#{startMonth} #{startDay}"
      else if start.month() == end.month()
        monthAndDate = "#{startMonth} #{startDay} – #{endDay}"
      else
        monthAndDate = "#{startMonth} #{startDay} – #{endMonth} #{endDay}"

      if start.year() isnt moment(new Date()).year()
        "#{monthAndDate} #{start.year()}"
      else
        monthAndDate
    else
      "#{startMonth} #{startDay}, #{start.format(formats.year)} – #{endMonth} #{endDay}, #{end.format(formats.year)}"

