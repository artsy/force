import sinon from "sinon"
import Backbone from "backbone"
const CollectorProfile = require("../../models/collector_profile")

describe("CollectorProfile", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    testContext.collectorProfile = new CollectorProfile()
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  describe("#findOrCreate", () => {
    it("PUTs", () => {
      testContext.collectorProfile.findOrCreate()
      Backbone.sync.args[0][0].should.equal("update")
    })
  })

  describe("#isCollector", () => {
    it("returns false if the collector level is blank", () => {
      testContext.collectorProfile.unset("collector_level")
      testContext.collectorProfile.isCollector().should.be.false()
    })

    it("returns false if the collector level below 3", () => {
      testContext.collectorProfile.set("collector_level", 2)
      testContext.collectorProfile.isCollector().should.be.false()
    })

    it("returns true if the collector level is 3", () => {
      testContext.collectorProfile.set("collector_level", 3)
      testContext.collectorProfile.isCollector().should.be.true()
    })

    it("returns true if the collector level above 3", () => {
      testContext.collectorProfile.set("collector_level", 4)
      testContext.collectorProfile.isCollector().should.be.true()
    })
  })
})
