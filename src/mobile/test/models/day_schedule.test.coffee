Backbone = require 'backbone'
DaySchedule = require '../../models/day_schedule'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'

describe 'DaySchedule', ->

  beforeEach ->
    @daySchedule = new DaySchedule
      _id: "55919db972616960090000a3"
      start_time: 36000
      end_time: 68543
      day_of_week: "Monday"

  describe '#day', ->
    it 'returns the day of the week that a day schedule occurs on', ->
      @daySchedule.day().should.equal "Monday"

  describe '#formatStart', ->
    it 'returns the formatted starting time of a schedule', ->
      @daySchedule.formatStart().should.equal "10am"

  describe '#formatEnd', ->
    it 'returns the formatted ending time of a schedule', ->
      @daySchedule.formatEnd().should.equal "7:02pm"

  describe '#hours', ->
    it 'returns the formatted hours that a schedule spans', ->
      @daySchedule.hours().should.equal "10am — 7:02pm"
