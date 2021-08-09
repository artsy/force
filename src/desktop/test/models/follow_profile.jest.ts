import { fabricate } from "@artsy/antigravity"
const sd = require("sharify").data
const FollowProfile = require("../../models/follow_profile.coffee")

describe("FollowProfile", () => {
  let testContext

  beforeAll(() => {
    testContext = {}
  })

  beforeAll(() => {
    testContext.sd = { API_URL: "http://localhost:5000" }
  })

  describe("#url", () => {
    it("returns a URL with an id if the model has one", () => {
      testContext.followProfile = new FollowProfile({
        id: "111",
        profile: fabricate("profile"),
      })
      testContext.followProfile
        .url()
        .should.equal(
          `${
            sd.API_URL
          }/api/v1/me/follow/profile/${testContext.followProfile.get("id")}`
        )
    })

    it("returns a URL with no id for new models", () => {
      testContext.followProfile = new FollowProfile()
      testContext.followProfile
        .url()
        .should.equal(`${sd.API_URL}/api/v1/me/follow/profile`)
    })
  })
})
