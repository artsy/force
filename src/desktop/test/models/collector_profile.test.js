/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const CollectorProfile = require("../../models/collector_profile")

describe("CollectorProfile", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.collectorProfile = new CollectorProfile())
  })

  afterEach(() => Backbone.sync.restore())

  describe("#findOrCreate", () =>
    it("PUTs", function () {
      this.collectorProfile.findOrCreate()
      return Backbone.sync.args[0][0].should.equal("update")
    }))

  return describe("#isCollector", function () {
    it("returns false if the collector level is blank", function () {
      this.collectorProfile.unset("collector_level")
      return this.collectorProfile.isCollector().should.be.false()
    })

    it("returns false if the collector level below 3", function () {
      this.collectorProfile.set("collector_level", 2)
      return this.collectorProfile.isCollector().should.be.false()
    })

    it("returns true if the collector level is 3", function () {
      this.collectorProfile.set("collector_level", 3)
      return this.collectorProfile.isCollector().should.be.true()
    })

    return it("returns true if the collector level above 3", function () {
      this.collectorProfile.set("collector_level", 4)
      return this.collectorProfile.isCollector().should.be.true()
    })
  })
})
