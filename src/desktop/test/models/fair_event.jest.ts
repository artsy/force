import { fabricate } from "@artsy/antigravity"
const FairEvent = require("../../models/fair_event.coffee")

describe("FairEvent", () => {
  let testContext

  beforeAll(() => {
    testContext = {}
  })

  beforeAll(() => {
    testContext.fairEvent = new FairEvent(fabricate("fair_event"), {
      fairId: "armory-show-2013",
    })
  })

  describe("#initialize", () => {
    it("sets the fairId", () => {
      testContext.fairEvent.fairId.should.equal("armory-show-2013")
    })
  })

  describe("#formatDate", () => {
    it("returns the date in Day, Month 1 format", () => {
      testContext.fairEvent.formatDate().should.equal("Saturday, March 8")
    })
  })

  describe("#formatTime", () => {
    it("returns the time in 2:00-4:00AM format", () => {
      testContext.fairEvent.formatTime().should.equal("5:15-5:30PM")
    })
  })
})
