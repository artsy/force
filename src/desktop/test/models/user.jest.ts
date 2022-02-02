import sinon from "sinon"
import Backbone from "backbone"
const { User } = require("../../models/user")

describe("User", () => {
  let user
  describe("base class", () => {
    beforeEach(() => {
      sinon.stub(Backbone, "sync")
      user = new User()
    })

    afterEach(() => Backbone.sync.restore())

    describe("#isCollector", () => {
      it("returns false if the collector level is blank", () => {
        user.unset("collector_level")
        user.isCollector().should.be.false()
      })

      it("returns false if the collector level below 3", () => {
        user.set("collector_level", 2)
        user.isCollector().should.be.false()
      })

      it("returns true if the collector level is 3", () => {
        user.set("collector_level", 3)
        user.isCollector().should.be.true()
      })

      it("returns true if the collector level above 3", () => {
        user.set("collector_level", 4)
        user.isCollector().should.be.true()
      })
    })
  })
})
