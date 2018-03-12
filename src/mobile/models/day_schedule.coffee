_ = require 'underscore'
moment = require 'moment'
Backbone = require 'backbone'

module.exports = class DaySchedule extends Backbone.Model

  day: ->
    @get 'day_of_week'

  formatStart: ->
    output = moment().hour( @get('start_time') / 60 / 60 ).format('h')
    output += moment().minutes( @get('start_time') / 60 ).format(':mm')
    output += moment().hour( @get('start_time') / 60 / 60 ).format('a')
    return output.replace /:00/g, ''

  formatEnd: ->
    output = moment().hour( @get('end_time') / 60 / 60 ).format('h')
    output += moment().minutes( @get('end_time') / 60 ).format(':mm')
    output += moment().hour( @get('end_time') / 60 / 60 ).format('a')
    return output.replace /:00/g, ''

  hours: ->
    if @get 'start_time'
      @formatStart() + ' — ' + @formatEnd()
    else
      "Closed"
