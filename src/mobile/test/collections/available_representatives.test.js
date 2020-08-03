/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const AvailableRepresentatives = require("../../collections/available_representatives")

describe("AvailableRepresentatives", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.reps = new AvailableRepresentatives([fabricate("user")]))
  })

  afterEach(() => Backbone.sync.restore())

  return describe("@fetchFirstProfile", () =>
    it("fetches the first available rep's profile", function (done) {
      AvailableRepresentatives.fetchFirstProfile({
        success(profile) {
          profile.get("id").should.equal("your-kitten-rep")
          return done()
        },
      })
      Backbone.sync.args[0][2].success([fabricate("user")])
      return Backbone.sync.args[1][2].success(
        fabricate("profile", { id: "your-kitten-rep" })
      )
    }))
})
