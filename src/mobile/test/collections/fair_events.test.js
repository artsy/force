/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const FairEvent = require("../../models/fair_event.coffee")
const Fair = require("../../models/fair.coffee")
const FairEvents = require("../../collections/fair_events.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("FairEvents", function () {
  beforeEach(function () {
    this.fair = new Fair(fabricate("fair"))
    return (this.fairEvents = new FairEvents(
      [
        fabricate("fair_event", {
          name: 2,
          start_at: "2014-03-07T21:00:00+00:00",
          end_at: "2014-03-07T22:30:00+00:00",
        }),
        fabricate("fair_event", {
          name: 1,
          start_at: "2014-03-06T20:00:00+00:00",
          end_at: "2014-03-06T21:30:00+00:00",
        }),
        fabricate("fair_event", {
          name: 1,
          start_at: "2014-03-07T20:00:00+00:00",
          end_at: "2014-03-07T21:00:00+00:00",
        }),
        fabricate("fair_event", {
          name: 1,
          start_at: "2014-03-08T20:00:00+00:00",
          end_at: "2014-03-08T21:30:00+00:00",
        }),
      ],
      { fairId: this.fair.id }
    ))
  })

  describe("#groupByDay", () =>
    it("groups events by day in sorted order", function () {
      const groupedByDay = this.fairEvents.groupByDay()
      const dates = _.keys(groupedByDay).sort()
      dates[0].should.equal("2014-03-06")
      dates[1].should.equal("2014-03-07")
      dates[2].should.equal("2014-03-08")
      groupedByDay["2014-03-06"].should.have.lengthOf(1)
      groupedByDay["2014-03-07"].should.have.lengthOf(2)
      groupedByDay["2014-03-08"].should.have.lengthOf(1)

      groupedByDay["2014-03-07"][0].get("name").should.equal(1)
      return groupedByDay["2014-03-07"][1].get("name").should.equal(2)
    }))

  return describe("#getEventDays", () =>
    it("formats objects for each day that has events for rendering", function () {
      const dates = _.keys(this.fairEvents.groupByDay()).sort()
      const days = this.fairEvents.getEventDays(dates)
      days.should.have.lengthOf(3)
      days[0].date.should.equal("2014-03-06")
      days[0].dayAbbr.should.equal("Thu")
      days[0].dayNum.should.equal("6")
      return days[0].href.should.equal("#2014-03-06")
    }))
})
