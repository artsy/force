/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const FairEvent = require("../../models/fair_event.coffee")
const { fabricate } = require("@artsy/antigravity")
const moment = require("moment")

describe("Fair", function () {
  beforeEach(function () {
    this.sd = { API_URL: "http://localhost:5000" }
    return (this.fairEvent = new FairEvent(fabricate("fair_event")))
  })

  describe("#urlRoot", () =>
    it("returns API url to manage this model", function () {
      return this.fairEvent
        .urlRoot()
        .should.containEql(
          `/api/v1/fair/${this.fairEvent.get("fair").id}/fair_event`
        )
    }))

  describe("#getTime", () =>
    it("returns a formatted time span for the event", function () {
      return this.fairEvent
        .getTime()
        .should.equal(
          `${moment(this.fairEvent.get("start_at"))
            .utc()
            .format("h:mm")}&ndash;${moment(this.fairEvent.get("end_at"))
            .utc()
            .format("h:mma")}`
        )
    }))

  describe("#href", () =>
    it("uses a profile id to create a client link to the event", function () {
      return this.fairEvent
        .href()
        .should.equal(
          `/${
            this.fairEvent.get("fair").organizer.profile_id
          }/info/events/${this.fairEvent.get("id")}`
        )
    }))

  describe("#icsHref", () =>
    it("uses a profile id to create a client link to the event", function () {
      return this.fairEvent
        .icsHref()
        .should.equal(
          `undefined/${
            this.fairEvent.get("fair").organizer.profile_id
          }/info/events/${this.fairEvent.get("id")}.ics`
        )
    }))

  return describe("#getDetailDescriptionHtml", () =>
    it("favors the extended description, but will give the description if it is not available", function () {
      // Can't use the htmlToMd here
      this.fairEvent
        .getDetailDescriptionHtml()
        .should.containEql(
          this.fairEvent.get("extended_description").slice(5, 15)
        )
      this.fairEvent.set("extended_description", null)
      return this.fairEvent
        .getDetailDescriptionHtml()
        .should.containEql(this.fairEvent.get("description").slice(5, 15))
    }))
})
