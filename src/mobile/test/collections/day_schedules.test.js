/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const DaySchedules = require("../../collections/day_schedules")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")

describe("DaySchedules", function () {
  beforeEach(function () {
    return (this.daySchedules = new DaySchedules([
      {
        _id: "55919db972616960090000a3",
        start_time: 36000,
        end_time: 48000,
        day_of_week: "Monday",
      },
      {
        _id: "55919db972616960090000a3",
        start_time: 54000,
        end_time: 68400,
        day_of_week: "Monday",
      },
      {
        _id: "55919db972616960090000a3",
        start_time: 36000,
        end_time: 48000,
        day_of_week: "Tuesday",
      },
      {
        _id: "55919db972616960090000a3",
        start_time: 54000,
        end_time: 68400,
        day_of_week: "Tuesday",
      },
      {
        _id: "55919db972616960090000a3",
        start_time: 3548,
        end_time: 75400,
        day_of_week: "Thursday",
      },
    ]))
  })

  describe("#hoursForDay", function () {
    it("returns the hours that a show runs on a day of the week", function () {
      this.daySchedules
        .hoursForDay("Monday")
        .should.equal("10am — 1:20pm, 3pm — 7pm")
      return this.daySchedules
        .hoursForDay("Thursday")
        .should.equal("12:59am — 8:56pm")
    })

    return it('returns "Closed" if a day has no schedules', function () {
      return this.daySchedules.hoursForDay("Wednesday").should.equal("Closed")
    })
  })

  return describe("#formattedDays", () =>
    it("returns a collection of objects representing a locations weekly schedule", function () {
      return this.daySchedules.formattedDays().should.match([
        {
          day_start: "Monday",
          hours: "10am — 1:20pm, 3pm — 7pm",
          day_end: "Tuesday",
        },
        {
          day_start: "Wednesday",
          hours: "Closed",
        },
        {
          day_start: "Thursday",
          hours: "12:59am — 8:56pm",
        },
        {
          day_start: "Friday",
          hours: "Closed",
          day_end: "Sunday",
        },
      ])
    }))
})
