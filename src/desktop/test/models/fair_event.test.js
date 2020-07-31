/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const should = require("should")
const FairEvent = require("../../models/fair_event")

describe("FairEvent", function () {
  before(function () {
    return (this.fairEvent = new FairEvent(fabricate("fair_event"), {
      fairId: "armory-show-2013",
    }))
  })

  describe("#initialize", () =>
    it("sets the fairId", function () {
      return this.fairEvent.fairId.should.equal("armory-show-2013")
    }))

  describe("#formatDate", () =>
    it("returns the date in Day, Month 1 format", function () {
      return this.fairEvent.formatDate().should.equal("Saturday, March 8")
    }))

  return describe("#formatTime", () =>
    it("returns the time in 2:00-4:00AM format", function () {
      return this.fairEvent.formatTime().should.equal("5:15-5:30PM")
    }))
})
