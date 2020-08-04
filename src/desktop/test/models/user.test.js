/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const Backbone = require("backbone")
const User = require("../../models/user")
const CurrentUser = require("../../models/current_user")
const LoggedOutUser = require("../../models/logged_out_user")

describe("User", () =>
  describe("base class", function () {
    beforeEach(function () {
      sinon.stub(Backbone, "sync")
      return (this.user = new User())
    })

    afterEach(() => Backbone.sync.restore())

    describe("#refresh", function () {
      it("hits the refresh endpoint", function () {
        this.user.refresh()
        return Backbone.sync.args[0][2].url.should.equal("/user/refresh")
      })

      it("accepts a success callback", function (done) {
        Backbone.sync.restore()
        sinon.stub(Backbone, "sync").yieldsTo("success")
        return this.user.refresh({
          success() {
            return done()
          },
        })
      })

      return it("accepts an error callback", function (done) {
        Backbone.sync.restore()
        sinon.stub(Backbone, "sync").yieldsTo("error")
        return this.user.refresh({
          error() {
            return done()
          },
        })
      })
    })

    return describe("#isCollector", function () {
      it("returns false if the collector level is blank", function () {
        this.user.unset("collector_level")
        return this.user.isCollector().should.be.false()
      })

      it("returns false if the collector level below 3", function () {
        this.user.set("collector_level", 2)
        return this.user.isCollector().should.be.false()
      })

      it("returns true if the collector level is 3", function () {
        this.user.set("collector_level", 3)
        return this.user.isCollector().should.be.true()
      })

      return it("returns true if the collector level above 3", function () {
        this.user.set("collector_level", 4)
        return this.user.isCollector().should.be.true()
      })
    })
  }))
