import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
import { times } from "lodash"
const CurrentUser = require("../../../lib/current_user.coffee")
const { FollowProfiles } = require("../follow_profiles")
const FollowProfile = require("../../models/follow_profile.coffee")
const Profile = require("../../models/profile.coffee")

describe("FollowProfiles", () => {
  let followProfile1
  let followProfile2
  let followProfiles
  let onAdd
  let onSuccess
  let onRemove

  beforeEach(() => {
    onAdd = jest.fn()
    onSuccess = jest.fn()
    onRemove = jest.fn()
    window.analytics = { track: jest.fn() } as any

    followProfile1 = new FollowProfile({
      id: "111",
      profile: { id: "profile-1" },
    })
    followProfile2 = new FollowProfile({
      id: "222",
      profile: { id: "profile-2" },
    })
    followProfiles = new FollowProfiles()
    followProfiles.reset()
    followProfiles.add(followProfile1)
  })

  describe("#initialize", () => {
    it("binds to add / remove callbacks to proxy model specific event triggers", () => {
      followProfiles.on(`add:${followProfile2.get("profile").id}`, onAdd)
      followProfiles.on(`remove:${followProfile2.get("profile").id}`, onRemove)
      followProfiles.add(followProfile2)
      followProfiles.remove(followProfile2)
      expect(onAdd).toHaveBeenCalledTimes(1)
      expect(onRemove).toHaveBeenCalledTimes(1)
    })
  })

  describe("#isFollowing", () => {
    it("returns true if the profile is in this collection", () => {
      const profile = new Profile(followProfile1.get("profile"))
      followProfiles.isFollowing(profile).should.be.true()
    })

    it("returns false if the profile is not in this collection", () => {
      const profile = new Profile(followProfile2.get("profile"))
      followProfiles.isFollowing(profile).should.be.false()
    })
  })

  describe("#findByProfileId", () => {
    it("returns a FollowProfile model from the collection with a profile id", () => {
      const profileId = followProfile1.get("profile").id
      const followProfile = followProfiles.findByProfileId(profileId)
      followProfile.should.equal(followProfile1)
    })
  })

  describe("#syncFollows", () => {
    it("returns without a current user", () => {
      CurrentUser.orNull = jest.fn().mockReturnValue(null)
      const fetchSpy = jest.spyOn(followProfiles, "fetch")
      followProfiles.syncFollows([followProfile2.get("profile").id])
      expect(fetchSpy).not.toBeCalled()
    })
  })

  describe("with a current user", () => {
    let profileId

    beforeEach(() => {
      profileId = followProfile2.get("profile").id
      Backbone.sync = jest.fn()
      CurrentUser.orNull = jest
        .fn()
        .mockReturnValue(new CurrentUser(fabricate("user")))
    })

    describe("#syncFollows", () => {
      it("adds given profiles to the collection if the current user follows them", () => {
        followProfiles.on(`add:${profileId}`, onAdd)
        followProfiles.syncFollows([profileId])
        Backbone.sync.mock.calls[0][2].data.profiles.should.containEql(
          followProfile2.get("profile").id
        )
        Backbone.sync.mock.calls[0][2].success([followProfile2.attributes])
        expect(onAdd).toHaveBeenCalledTimes(1)

        followProfiles.should.have.lengthOf(2)
        followProfiles
          .findByProfileId(profileId)
          .get("id")
          .should.equal(followProfile2.get("id"))
      })

      it("should not cache the result and retain models", () => {
        followProfiles.syncFollows([profileId])
        Backbone.sync.mock.calls[0][2].cache.should.be.false()
      })

      it("should retain the models when fetching", () => {
        followProfiles.syncFollows([profileId])
        Backbone.sync.mock.calls[0][2].remove.should.be.false()
        Backbone.sync.mock.calls[0][2].merge.should.be.true()
      })

      it("breaks sync requests up so that no more than @maxSyncSize are requested at a time", () => {
        const profileIds = []
        jest.spyOn(followProfiles, "syncFollows")
        followProfiles.maxSyncSize = 10
        times(22, n => {
          // @ts-expect-error STRICT_NULL_CHECK
          profileIds.push(`profile-${n}`)
        })
        followProfiles.syncFollows(profileIds)
        expect(followProfiles.syncFollows.mock.calls[0][0]).toBe(profileIds)
        Backbone.sync.mock.calls[0][2].data.profiles.should.have.lengthOf(10)
        Backbone.sync.mock.calls[0][2].success([])

        Backbone.sync.mock.calls[1][2].data.profiles.should.have.lengthOf(10)
        Backbone.sync.mock.calls[1][2].success([])

        Backbone.sync.mock.calls[2][2].data.profiles.should.have.lengthOf(2)
        Backbone.sync.mock.calls[2][2].success([])

        expect(followProfiles.syncFollows.mock.calls[3][0].length).toBe(0)
        expect(followProfiles.syncFollows).toBeCalledTimes(4)
      })
    })

    describe("#follow", () => {
      it("creates a follow through the API and updates the collection", () => {
        followProfiles.on(`add:${profileId}`, onAdd)
        followProfiles.follow(profileId, { success: onSuccess })
        Backbone.sync.mock.calls[0][0].should.equal("create")
        Backbone.sync.mock.calls[0][1].attributes.should.have.keys(
          "profile_id",
          "profile"
        )
        Backbone.sync.mock.calls[0][1].attributes.profile.id.should.equal(
          profileId
        )
        Backbone.sync.mock.calls[0][2].success(followProfile2.attributes)
        expect(onAdd).toHaveBeenCalledTimes(1)
        expect(onSuccess).toHaveBeenCalledTimes(1)
        followProfiles.should.have.lengthOf(2)
      })
    })

    describe("#unfollow", () => {
      it("destroys a follow through the API and updates the collection", () => {
        followProfiles.add(followProfile2)
        followProfiles.should.have.lengthOf(2)
        followProfiles.on(`remove:${profileId}`, onRemove)
        followProfiles.unfollow(profileId, { success: onSuccess })
        Backbone.sync.mock.calls[0][0].should.equal("delete")
        Backbone.sync.mock.calls[0][1].attributes.should.equal(
          followProfile2.attributes
        )
        Backbone.sync.mock.calls[0][2].success(followProfile2.attributes)
        expect(onRemove).toHaveBeenCalledTimes(1)
        expect(onSuccess).toHaveBeenCalledTimes(1)
        followProfiles.should.have.lengthOf(1)
      })
    })
  })
})
