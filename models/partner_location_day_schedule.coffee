_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
sd = require('sharify').data

module.exports = class PartnerLocationDaySchedule extends Backbone.Model

  daySchedules: ->
    return this

  # Takes a day of the week as a string and returns a formatted schedule for a day of the week or closed:
  # { start: 'Monday', hours: '10:30am–7pm' } or { start: 'Tuesday', hours: 'Closed'}
  formatDaySchedule: (day) ->
    if @daySchedules()
      if _.contains ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], day
        daySchedule = _.find (@location().get 'day_schedules'), (daySchedule) -> daySchedule['day_of_week'] is day
        if daySchedule
          startHour = moment().hour(daySchedule['start_time'] / 60 / 60)
          startMinute = moment().minutes(daySchedule['start_time'] / 60)
          endHour = moment().hour(daySchedule['end_time'] / 60 / 60)
          endMinute = moment().minutes(daySchedule['end_time'] / 60 )
          start: day
          hours: "#{startHour.format('h')}\
                  #{ if startMinute.format('mm') == '00' then '' else startMinute.format(':mm')}\
                  #{startHour.format('a')}–\
                  #{endHour.format('h')}\
                  #{if endMinute.format('mm') == '00' then '' else endMinute.format(':mm')}\
                  #{endHour.format('a')}"
        else
          start: day
          hours: 'Closed'

  # Returns an array of formatted 'day schedule' objects for a 7 day week:
  # [{ start: 'Monday', hours: '10am – 7pm'}, {start: 'Tuesday, hours: 'Closed'}, ... ]
  formatDaySchedules: ->
    if @daySchedules()
      _.map ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], (day) =>
        @formatDaySchedule(day)

  # returns an array of grouped and formatted 'day schedules' objects in the format:
  # [{ days: 'Monday–Thursday, Sunday', hours: '10am - 7pm' }, { days: 'Friday', hours: '6:30am - 7pm' }]
  formatModalDaySchedules: () ->
    if @daySchedules()
      daysOpen = [@formatDaySchedules()[0]]
      _.each @formatDaySchedules().slice(1), (daySchedule) ->
        if daySchedule['hours'] is _.last(daysOpen)['hours']
          _.extend _.last(daysOpen), end: "#{daySchedule['start']}"
        else
          daysOpen.push {start: daySchedule['start'], hours: daySchedule['hours']}
      _.chain (daysOpen)
        .groupBy 'hours'
        .map (schedule) ->
          _.chain(schedule)
            .map (day) ->
              days: if day['end'] then "#{day['start']}–#{day['end']}" else "#{day['start']}"
              hours: schedule[0]['hours']
            .reduce (memo, iteratee) ->
              memo['days'] = memo['days'] + ", #{iteratee['days']}"
              return memo
            .value()
        .reject (day_schedule) -> day_schedule['hours'] is 'Closed'
        .value()
