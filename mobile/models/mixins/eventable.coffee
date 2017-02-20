moment = require 'moment'

module.exports =
  date: (attr) ->
    moment.utc @get(attr)

  formatDateRange: (start_attr, end_attr, format = 'dddd, MMM. Do, h:mma') ->
    start = @date start_attr
    end = @date end_attr

    output = "#{start.format(format)} – "
    output += end.format(if start.isSame(end, 'day') then 'h:mma' else format)

    output.replace /:00/g, ''
