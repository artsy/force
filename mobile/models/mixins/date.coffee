moment = require 'moment'

module.exports =

  formattedDateRange: ->
    momentStart = moment @get 'start_at'
    momentEnd = moment @get 'end_at'
    if momentStart.format('MM') is momentEnd.format('MM')
      "#{momentStart.format('MMM. Do')} &ndash; #{momentEnd.format('Do')}"
    else
      "#{momentStart.format('MMM. Do')} &ndash; #{momentEnd.format('MMM. Do')}"

  fromNow: (attr) ->
    moment(@get attr).fromNow()

  groupByDate: (attr) ->
    moment(@get attr).format('YYYY-MM-DD')
