Backbone = require 'backbone'
DaySchedules = require '../../collections/day_schedules'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'

describe 'DaySchedules', ->

  beforeEach ->
    @daySchedules = new DaySchedules [
      {
        _id: "55919db972616960090000a3"
        start_time: 36000
        end_time: 48000
        day_of_week: "Monday"
      },
      {
        _id: "55919db972616960090000a3"
        start_time: 54000
        end_time: 68400
        day_of_week: "Monday"
      },
      {
        _id: "55919db972616960090000a3"
        start_time: 36000
        end_time: 48000
        day_of_week: "Tuesday"
      },
      {
        _id: "55919db972616960090000a3"
        start_time: 54000
        end_time: 68400
        day_of_week: "Tuesday"
      },
      {
        _id: "55919db972616960090000a3"
        start_time: 3548
        end_time: 75400
        day_of_week: "Thursday"
      },
    ]

  describe '#hoursForDay', ->
    it 'returns the hours that a show runs on a day of the week', ->
      @daySchedules.hoursForDay("Monday").should.equal "10am — 1:20pm, 3pm — 7pm"
      @daySchedules.hoursForDay("Thursday").should.equal "12:59am — 8:56pm"

    it 'returns "Closed" if a day has no schedules', ->
      @daySchedules.hoursForDay("Wednesday").should.equal "Closed"

  describe '#formattedDays', ->
    it 'returns a collection of objects representing a locations weekly schedule', ->
      @daySchedules.formattedDays().should.match [
        {
          day_start: 'Monday'
          hours: '10am — 1:20pm, 3pm — 7pm'
          day_end: 'Tuesday'
        },
        {
          day_start: 'Wednesday'
          hours: 'Closed'
        },
        {
          day_start: 'Thursday'
          hours: '12:59am — 8:56pm'
        },
        {
          day_start: 'Friday'
          hours: 'Closed'
          day_end: 'Sunday'
        }
      ]

