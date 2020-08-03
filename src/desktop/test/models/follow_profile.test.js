/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { fabricate } = require("@artsy/antigravity")
const sd = require("sharify").data
const should = require("should")
const Backbone = require("backbone")
const Profile = require("../../models/profile")
const FollowProfile = require("../../models/follow_profile")

describe("FollowProfile", function () {
  before(function () {
    return (this.sd = { API_URL: "http://localhost:5000" })
  })

  return describe("#url", function () {
    it("returns a URL with an id if the model has one", function () {
      this.followProfile = new FollowProfile({
        id: "111",
        profile: fabricate("profile"),
      })
      return this.followProfile
        .url()
        .should.equal(
          `${sd.API_URL}/api/v1/me/follow/profile/${this.followProfile.get(
            "id"
          )}`
        )
    })

    return it("returns a URL with no id for new models", function () {
      this.followProfile = new FollowProfile()
      return this.followProfile
        .url()
        .should.equal(`${sd.API_URL}/api/v1/me/follow/profile`)
    })
  })
})
