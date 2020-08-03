/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sd = require("sharify").data
const should = require("should")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const Backbone = require("backbone")
const CurrentUser = require("../../models/current_user.coffee")
const FollowProfiles = require("../../collections/follow_profiles")
const FollowProfile = require("../../models/follow_profile")
const Profile = require("../../models/profile")

describe("FollowProfiles", function () {
  beforeEach(function () {
    this.followProfile1 = new FollowProfile({
      id: "111",
      profile: { id: "profile-1" },
    })
    this.followProfile2 = new FollowProfile({
      id: "222",
      profile: { id: "profile-2" },
    })
    this.followProfiles = new FollowProfiles()
    this.followProfiles.reset()
    return this.followProfiles.add(this.followProfile1)
  })

  describe("#initialize", () =>
    it("binds to add / remove callbacks to proxy model specific event triggers", function () {
      const onAdd = sinon.spy()
      const onRemove = sinon.spy()
      this.followProfiles.on(
        `add:${this.followProfile2.get("profile").id}`,
        onAdd
      )
      this.followProfiles.on(
        `remove:${this.followProfile2.get("profile").id}`,
        onRemove
      )
      this.followProfiles.add(this.followProfile2)
      this.followProfiles.remove(this.followProfile2)
      onAdd.callCount.should.equal(1)
      return onRemove.callCount.should.equal(1)
    }))

  describe("#isFollowing", function () {
    it("returns true if the profile is in this collection", function () {
      const profile = new Profile(this.followProfile1.get("profile"))
      return this.followProfiles.isFollowing(profile).should.be.true()
    })

    return it("returns false if the profile is not in this collection", function () {
      const profile = new Profile(this.followProfile2.get("profile"))
      return this.followProfiles.isFollowing(profile).should.be.false()
    })
  })

  describe("#findByProfileId", () =>
    it("returns a FollowProfile model from the collection with a profile id", function () {
      const profileId = this.followProfile1.get("profile").id
      const followProfile = this.followProfiles.findByProfileId(profileId)
      return followProfile.should.equal(this.followProfile1)
    }))

  describe("#syncFollows", () =>
    it("returns without a current user", function () {
      sinon.stub(CurrentUser, "orNull", () => null)
      const fetchSpy = sinon.spy(this.followProfiles, "fetch")
      this.followProfiles.syncFollows([this.followProfile2.get("profile").id])
      fetchSpy.callCount.should.equal(0)
      fetchSpy.restore()
      return CurrentUser.orNull.restore()
    }))

  return describe("with a current user", function () {
    beforeEach(function () {
      this.profileId = this.followProfile2.get("profile").id
      sinon.stub(Backbone, "sync")
      return sinon.stub(
        CurrentUser,
        "orNull",
        () => new CurrentUser(fabricate("user"))
      )
    })

    afterEach(function () {
      delete this.profileId
      Backbone.sync.restore()
      return CurrentUser.orNull.restore()
    })

    describe("#syncFollows", function () {
      it("adds given profiles to the collection if the current user follows them", function () {
        const onAdd = sinon.spy()
        this.followProfiles.on(`add:${this.profileId}`, onAdd)
        this.followProfiles.syncFollows([this.profileId])
        Backbone.sync.args[0][2].data.profiles.should.containEql(
          this.followProfile2.get("profile").id
        )
        Backbone.sync.args[0][2].success([this.followProfile2.attributes])
        onAdd.callCount.should.equal(1)
        this.followProfiles.should.have.lengthOf(2)
        return this.followProfiles
          .findByProfileId(this.profileId)
          .get("id")
          .should.equal(this.followProfile2.get("id"))
      })

      it("should not cache the result and retain models", function () {
        this.followProfiles.syncFollows([this.profileId])
        return Backbone.sync.args[0][2].cache.should.be.false()
      })

      it("should retain the models when fetching", function () {
        this.followProfiles.syncFollows([this.profileId])
        Backbone.sync.args[0][2].remove.should.be.false()
        return Backbone.sync.args[0][2].merge.should.be.true()
      })

      return it("breaks sync requests up so that no more than @maxSyncSize are requested at a time", function () {
        let n
        const profileIds = []
        sinon.spy(this.followProfiles, "syncFollows")
        this.followProfiles.maxSyncSize = 10
        _(22).times(n => {
          return profileIds.push(`profile-${n}`)
        })
        this.followProfiles.syncFollows(profileIds)

        this.followProfiles.syncFollows
          .getCall(0)
          .args[0].should.equal(profileIds)
        Backbone.sync.args[0][2].data.profiles.should.have.lengthOf(10)
        Backbone.sync.args[0][2].success([])

        let rest = _.rest(profileIds, 10)
        for (n of Array.from(_.rest(profileIds, 10))) {
          this.followProfiles.syncFollows
            .getCall(1)
            .args[0].should.containEql(n)
        }
        Backbone.sync.args[1][2].data.profiles.should.have.lengthOf(10)
        Backbone.sync.args[1][2].success([])

        rest = _.rest(profileIds, 20)
        for (n of Array.from(_.rest(profileIds, 20))) {
          this.followProfiles.syncFollows
            .getCall(2)
            .args[0].should.containEql(n)
        }
        Backbone.sync.args[2][2].data.profiles.should.have.lengthOf(2)
        Backbone.sync.args[2][2].success([])

        this.followProfiles.syncFollows
          .getCall(3)
          .args[0].should.have.lengthOf(0)
        this.followProfiles.syncFollows.callCount.should.equal(4)

        return this.followProfiles.syncFollows.restore()
      })
    })

    describe("#follow", () =>
      it("creates a follow through the API and updates the collection", function () {
        const onAdd = sinon.spy()
        const onSuccess = sinon.spy()
        this.followProfiles.on(`add:${this.profileId}`, onAdd)
        this.followProfiles.follow(this.profileId, { success: onSuccess })
        Backbone.sync.args[0][0].should.equal("create")
        Backbone.sync.args[0][1].attributes.should.have.keys(
          "profile_id",
          "profile"
        )
        Backbone.sync.args[0][1].attributes.profile.id.should.equal(
          this.profileId
        )
        Backbone.sync.args[0][2].success(this.followProfile2.attributes)
        onAdd.callCount.should.equal(1)
        onSuccess.callCount.should.equal(1)
        return this.followProfiles.should.have.lengthOf(2)
      }))

    return describe("#unfollow", () =>
      it("destroys a follow through the API and updates the collection", function () {
        this.followProfiles.add(this.followProfile2)
        this.followProfiles.should.have.lengthOf(2)
        const onRemove = sinon.spy()
        const onSuccess = sinon.spy()
        this.followProfiles.on(`remove:${this.profileId}`, onRemove)
        this.followProfiles.unfollow(this.profileId, { success: onSuccess })
        Backbone.sync.args[0][0].should.equal("delete")
        Backbone.sync.args[0][1].attributes.should.equal(
          this.followProfile2.attributes
        )
        Backbone.sync.args[0][2].success(this.followProfile2.attributes)
        onRemove.callCount.should.equal(1)
        onSuccess.callCount.should.equal(1)
        return this.followProfiles.should.have.lengthOf(1)
      }))
  })
})
