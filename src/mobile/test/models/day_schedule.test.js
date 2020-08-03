/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const DaySchedule = require("../../models/day_schedule")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")

describe("DaySchedule", function () {
  beforeEach(function () {
    return (this.daySchedule = new DaySchedule({
      _id: "55919db972616960090000a3",
      start_time: 36000,
      end_time: 68543,
      day_of_week: "Monday",
    }))
  })

  describe("#day", () =>
    it("returns the day of the week that a day schedule occurs on", function () {
      return this.daySchedule.day().should.equal("Monday")
    }))

  describe("#formatStart", () =>
    it("returns the formatted starting time of a schedule", function () {
      return this.daySchedule.formatStart().should.equal("10am")
    }))

  describe("#formatEnd", () =>
    it("returns the formatted ending time of a schedule", function () {
      return this.daySchedule.formatEnd().should.equal("7:02pm")
    }))

  return describe("#hours", () =>
    it("returns the formatted hours that a schedule spans", function () {
      return this.daySchedule.hours().should.equal("10am — 7:02pm")
    }))
})
