/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const Profile = require("../../models/profile")
const { fabricate } = require("@artsy/antigravity")

describe("Profile", function () {
  beforeEach(function () {
    this.profile = new Profile(fabricate("profile"))
    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  describe("#iconUrl", function () {
    it("defaults to square140 icon image", function () {
      this.profile.set("icon", {
        image_url: "foo/bar/:version.jpg",
        image_versions: ["square140", "square"],
      })
      return this.profile.iconUrl().should.equal("foo/bar/square140.png")
    })

    it("falls back to square", function () {
      this.profile.set("icon", {
        image_url: "foo/bar/:version.jpg",
        image_versions: ["square"],
      })
      return this.profile.iconUrl().should.equal("foo/bar/square.png")
    })

    return it("default if non-existant image requested", function () {
      this.profile.unset("icon")
      return this.profile
        .iconUrl("circle")
        .should.equal("/images/user_profile.png")
    })
  })

  describe("#hasIcon", () =>
    it("indicates if a profile has an icon", function () {
      this.profile.hasIcon().should.be.true()
      this.profile.unset("icon")
      return this.profile.hasIcon().should.be.false()
    }))

  return describe("#initials", function () {
    it("returns up to two initials for a partner name", function () {
      this.profile.initials().should.equal("CS")

      this.profile.get("owner").name = "Whitney"
      this.profile.initials().should.equal("W")

      this.profile.get("owner").name = "John Jacob Jingle Heimer Schmidt"
      return this.profile.initials().should.equal("JJ")
    })

    return it("does not include non-word characters", function () {
      this.profile.get("owner").name = "Chime & Read"
      this.profile.initials().should.equal("CR")

      this.profile.get("owner").name = "2 % Johan _ Gregor 37"
      return this.profile.initials().should.equal("2J")
    })
  })
})
