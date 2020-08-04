/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const Show = require("../../models/show")

describe("ShowEvent", function () {
  beforeEach(function () {
    return (this.show = new Show(fabricate("show")))
  })

  return describe("#eventType", () =>
    it("returns correctly formatted event types", function () {
      const formattedEvents = this.show.related().showEvents.invoke("eventType")
      return formattedEvents.should.be.match(["Opening Reception", "Event"])
    }))
})
