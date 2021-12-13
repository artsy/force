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

    describe("#refresh", () => {
      it("hits the refresh endpoint", () => {
        user.refresh()
        Backbone.sync.args[0][2].url.should.equal("/user/refresh")
      })

      it("accepts a success callback", done => {
        Backbone.sync.restore()
        sinon.stub(Backbone, "sync").yieldsTo("success")
        user.refresh({
          success() {
            done()
          },
        })
      })

      it("accepts an error callback", done => {
        Backbone.sync.restore()
        sinon.stub(Backbone, "sync").yieldsTo("error")
        user.refresh({
          error() {
            done()
          },
        })
      })
    })

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
