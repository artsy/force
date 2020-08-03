/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const PartnerShow = require("../../models/partner_show")

describe("PartnerShowEvent", function () {
  beforeEach(function () {
    return (this.show = new PartnerShow(fabricate("show")))
  })

  describe("#eventType", () =>
    it("returns correctly formatted event types", function () {
      const formattedEvents = this.show.related().showEvents.invoke("eventType")
      return formattedEvents.should.be.match(["Opening Reception", "Event"])
    }))

  return describe("#formatDateRange", () =>
    it("returns correctly formatted running dates", function () {
      const formattedEvents = this.show
        .related()
        .showEvents.map(show => show.formatDateRange("start_at", "end_at"))
      return formattedEvents.should.be.match([
        "Wednesday, Jan 7th, 8pm – 9pm",
        "Thursday, Jan 8th, 7:15pm – Friday, Jan 9th, 2am",
      ])
    }))
})
