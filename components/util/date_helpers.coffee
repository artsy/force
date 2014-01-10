moment = require 'moment'

module.exports = class DateHelpers

  @timespanInWords: (utc_start, utc_end) ->
    start = moment.utc utc_start
    end   = moment.utc utc_end

    startMonth = start.format('MMM')
    # don't append a . for May, 0-based months
    if start.month() isnt 4 then startMonth += "."
    startDay = start.format('Do')

    endMonth = end.format('MMM')
    # don't append a . for May, 0-based months
    if end.month() isnt 4 then endMonth += "."
    endDay = end.format('Do')

    if start.year() is end.year()
      if start.month() is end.month() and start.date() is end.date()
        monthAndDate = "#{startMonth} #{startDay}"
      else if start.month() == end.month()
        monthAndDate = "#{startMonth} #{startDay} &#x2013; #{endDay}"
      else
        monthAndDate = "#{startMonth} #{startDay} &#x2013; #{endMonth} #{endDay}"

      if start.year() isnt moment(new Date()).year()
        "#{monthAndDate} #{start.year()}"
      else
        monthAndDate
    else
      "#{startMonth} #{startDay}, #{start.format('YYYY')} &#x2013; #{endMonth} #{endDay}, #{end.format('YYYY')}"
