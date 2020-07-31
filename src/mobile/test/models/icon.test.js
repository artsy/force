/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const Icon = require("../../models/icon")
const Profile = require("../../models/profile")
const { fabricate } = require("@artsy/antigravity")

describe("Icon", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.profile = new Profile(fabricate("profile"))
    return (this.icon = this.profile.icon())
  })

  afterEach(() => Backbone.sync.restore())

  describe("#url", () =>
    it("returns a url with a profile id in it", function () {
      return this.icon
        .url()
        .should.containEql(`api/v1/profile/${this.profile.get("id")}/icon`)
    }))

  return describe("#imageUrl", function () {
    it("does the usual version swap if the image is processed and happy", function () {
      return this.icon
        .imageUrl()
        .should.containEql("profile_icons/504e3beab19ddf0002000534/square.png")
    })

    it("returns the original if the image has not had versions processed", function () {
      this.icon.set("versions", null)
      return this.icon
        .imageUrl()
        .should.containEql(
          "profile_icons/504e3beab19ddf0002000534/original.jpg"
        )
    })

    return it("returns the default as a fall through", function () {
      this.icon.set({
        versions: null,
        image_filename: null,
      })
      return this.icon.imageUrl().should.equal(Icon.DefaultUserIconUrl)
    })
  })
})
