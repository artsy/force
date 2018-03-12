_ = require 'underscore'
moment = require 'moment'
Backbone = require 'backbone'
DaySchedule = require '../models/day_schedule.coffee'

module.exports = class DaySchedules extends Backbone.Collection

  model: DaySchedule

  days_of_the_week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  hoursToday: ->
    @hoursForDay moment().format 'dddd'

  hoursForDay: (day) ->
    # Get all DaySchedule models that occur on the argument 'day'
    today = _.filter @models, (daySchedule) ->
      daySchedule if daySchedule.get('day_of_week') is day
    # If today has models, sort them by starting time and return the concatenated hours, i.e:
    # '10:30am - 6pm, 7pm - 8pm'
    # If there are no DaySchedule models on 'day', return 'Closed'
    if today.length
      _.chain today
        .sortBy (daySchedule) ->
          daySchedule.get('start_time')
        .map (daySchedule) ->
          daySchedule.hours()
        .value().join(", ")
    else
      'Closed'

  formattedDays: ->
    # Returns generic javascript objects that describe a days hours according to the format:
    # "Monday — Wednesday", "8am — 2pm, 3pm — 8pm"
    # Objects will look like { day_start: 'Monday', day_end: 'Wednesday', hours: "8am — 2pm, 3pm — 8pm" }
    daySchedules = _.map @days_of_the_week, (day) =>
      day_start: day, hours: @hoursForDay day
    formattedDaySchedules = [ daySchedules[0] ]
    _.each _.rest(daySchedules), (daySchedule) ->
      if formattedDaySchedules[formattedDaySchedules.length - 1]['hours'] is daySchedule['hours']
        formattedDaySchedules[formattedDaySchedules.length - 1]['day_end'] = daySchedule['day_start']
      else
        formattedDaySchedules.push daySchedule
    return formattedDaySchedules
