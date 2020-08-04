/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const Profile = require("../../../models/profile")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

const render = (data, done) =>
  benv.render(resolve(__dirname, "../template.jade"), data, done)

describe("Template", function () {
  beforeEach(function (done) {
    this.profile = new Profile(
      fabricate("partner_profile", {
        id: "foobar",
        cover_image: fabricate("profile_cover_image", {
          image_versions: ["medium250x165"],
          image_url: ":version",
        }),
      })
    )
    return benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  })

  afterEach(() => benv.teardown())

  describe("all is well", function () {
    beforeEach(function (done) {
      return render({ profile: this.profile }, done)
    })

    return it("renders the template in the appropriate mode", () =>
      $(".partner-profile-cover").data("mode").should.equal("cover"))
  })

  describe("missing a cover image", function () {
    beforeEach(function (done) {
      this.profile.unset("cover_image")
      return render({ profile: this.profile }, done)
    })

    return it("renders the template in the appropriate mode", () =>
      $(".partner-profile-cover").data("mode").should.equal("fallback"))
  })

  return describe("has a non-suitable cover image", function () {
    beforeEach(function (done) {
      this.profile.set({ cover_image: fabricate("profile_cover_image") })
      return render({ profile: this.profile }, done)
    })

    it("renders the template in the appropriate mode", function () {
      $(".partner-profile-cover").data("mode").should.equal("missing")
      return _.isUndefined($(".hoverable-image").attr("style")).should.be.true()
    })

    return it("has the initials to use in a fallback display solution", () =>
      $(".hoverable-image").data("initials").should.equal("GG"))
  })
})
