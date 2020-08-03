/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const should = require("should")
const { fabricate } = require("@artsy/antigravity")
const FairEvent = require("../../models/fair_event")
const FairEvents = require("../../collections/fair_events")

describe("FairEvents", function () {
  before(function () {
    this.fairEvent1 = new FairEvent(fabricate("fair_event"), {
      fairId: "armory-show-2013",
    })
    this.fairEvent2 = new FairEvent(
      fabricate("fair_event", {
        name: "March third",
        start_at: "2014-03-05T17:15:00+00:00",
      }),
      { fairId: "armory-show-2013" }
    )
    return (this.fairEvent3 = new FairEvent(
      fabricate("fair_event", {
        name: "March tenth",
        start_at: "2014-10-05T17:15:00+00:00",
      }),
      { fairId: "armory-show-2013" }
    ))
  })

  describe("#initialize", () =>
    it("sets the fairId", function () {
      const fairEvents = new FairEvents([this.fairEvent1], {
        fairId: "armory-show-2013",
      })
      return fairEvents.fairId.should.equal("armory-show-2013")
    }))

  return describe("#sortedEvents", () =>
    it("sorts the events by start_at", function () {
      const fairEvents = new FairEvents(
        [this.fairEvent1, this.fairEvent2, this.fairEvent3],
        { fairId: "armory-show-2013" }
      )
      const sorted = fairEvents.sortedEvents()

      sorted["Wednesday"][0].attributes.name.should.equal("March third")
      sorted["Wednesday"][0].attributes.start_at.should.equal(
        "2014-03-05T17:15:00+00:00"
      )
      sorted["Saturday"][0].attributes.name.should.equal("Welcome")
      sorted["Saturday"][0].attributes.start_at.should.equal(
        "2014-03-08T17:15:00+00:00"
      )
      sorted["Sunday"][0].attributes.name.should.equal("March tenth")
      return sorted["Sunday"][0].attributes.start_at.should.equal(
        "2014-10-05T17:15:00+00:00"
      )
    }))
})
