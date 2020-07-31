/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sd = require("sharify").data
const benv = require("benv")
const should = require("should")
const sinon = require("sinon")
const Backbone = require("backbone")
const Follow = require("../model")
const Profile = require("../../../models/profile")
const { fabricate } = require("@artsy/antigravity")
const Following = require("../collection")
const CurrentUser = require("../../../models/current_user.coffee")

describe("Following collection", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )
  after(() => benv.teardown())

  beforeEach(function () {
    this.follow1 = new Follow({
      id: "111",
      name: "follow1",
      profile: { id: "profile-1" },
    })
    this.follow2 = new Follow({
      id: "222",
      name: "follow2",
      profile: { id: "profile-2" },
    })
    this.following = new Following(null, { kind: "profile" })
    this.following.reset()
    return this.following.add(this.follow1)
  })

  describe("#initialize", () =>
    it("binds to add / remove callbacks to proxy model specific event triggers", function () {
      const onAdd = sinon.spy()
      const onRemove = sinon.spy()
      this.following.once(`add:${this.follow2.get("profile").id}`, onAdd)
      this.following.once(`remove:${this.follow2.get("profile").id}`, onRemove)
      this.following.add(this.follow2)
      this.following.remove(this.follow2)
      onAdd.callCount.should.equal(1)
      return onRemove.callCount.should.equal(1)
    }))

  describe("#isFollowing", function () {
    it("returns true if the profile is in this collection", function () {
      const profile = new Profile(this.follow1.get("profile"))
      return this.following.isFollowing(profile.id).should.be.true()
    })

    return it("returns false if the profile is not in this collection", function () {
      const profile = new Profile(this.follow2.get("profile"))
      return this.following.isFollowing(profile.id).should.be.false()
    })
  })

  describe("#findByModelId", () =>
    it("returns a Follow model from the collection with a profile id", function () {
      const follow = this.following.findByModelId(
        this.follow1.get("profile").id
      )
      return follow.should.equal(this.follow1)
    }))

  describe("#syncFollows", () =>
    it("returns without a current user", function () {
      sinon.stub(CurrentUser, "orNull", () => null)
      const fetchSpy = sinon.spy(this.following, "fetch")
      this.following.syncFollows([this.follow2.get("profile").id])
      fetchSpy.callCount.should.equal(0)
      fetchSpy.restore()
      return CurrentUser.orNull.restore()
    }))

  return describe("with a current user", function () {
    beforeEach(function () {
      this.profileId1 = this.follow1.get("profile").id
      this.profileId2 = this.follow2.get("profile").id
      sinon.stub(Backbone, "sync").yieldsTo("success")
      return (sd.CURRENT_USER = "existy")
    })

    afterEach(function () {
      delete this.profileId1
      return Backbone.sync.restore()
    })

    describe("#syncFollows", function () {
      it("adds given profiles to the collection if the current user follows them", function () {
        const onAdd = sinon.stub()
        this.following.once(`add:${this.profileId2}`, onAdd)
        this.following.syncFollows([this.profileId2])
        Backbone.sync.args[0][2].data.profiles.should.containEql(
          this.follow2.get("profile").id
        )
        Backbone.sync.args[0][2].success([this.follow2.attributes])
        onAdd.callCount.should.equal(1)
        this.following.should.have.lengthOf(2)
        return this.following
          .findByModelId(this.profileId2)
          .id.should.equal(this.follow2.id)
      })

      it("should not cache the result and retain models", function () {
        this.following.syncFollows([this.profileId2])
        return Backbone.sync.args[0][2].cache.should.be.false()
      })

      it("should retain the models when fetching", function () {
        this.following.syncFollows([this.profileId2])
        Backbone.sync.args[0][2].remove.should.be.false()
        return Backbone.sync.args[0][2].merge.should.be.true()
      })

      return it("breaks sync requests up so that no more than @maxSyncSize are requested at a time", function () {
        let n
        const profileIds = []
        sinon.spy(this.following, "syncFollows")
        this.following.maxSyncSize = 10
        _(22).times(n => profileIds.push(`profile-${n}`))
        this.following.syncFollows(profileIds)

        this.following.syncFollows.getCall(0).args[0].should.equal(profileIds)
        Backbone.sync.args[0][2].data.profiles.should.have.lengthOf(10)
        Backbone.sync.args[0][2].success([])

        let rest = _.rest(profileIds, 10)
        for (n of Array.from(_.rest(profileIds, 10))) {
          this.following.syncFollows.getCall(1).args[0].should.containEql(n)
        }
        Backbone.sync.args[1][2].data.profiles.should.have.lengthOf(10)
        Backbone.sync.args[1][2].success([])

        rest = _.rest(profileIds, 20)
        for (n of Array.from(_.rest(profileIds, 20))) {
          this.following.syncFollows.getCall(2).args[0].should.containEql(n)
        }
        Backbone.sync.args[2][2].data.profiles.should.have.lengthOf(2)
        Backbone.sync.args[2][2].success([])

        this.following.syncFollows.getCall(3).args[0].should.have.lengthOf(0)
        this.following.syncFollows.callCount.should.equal(4)

        return this.following.syncFollows.restore()
      })
    })

    describe("#follow", () =>
      it("creates a follow through the API and updates the collection", function () {
        const onAdd = sinon.spy()
        const onSuccess = sinon.spy()
        this.following.once(`add:${this.profileId2}`, onAdd)
        this.following.follow(this.profileId2, { success: onSuccess })
        Backbone.sync.args[0][0].should.equal("create")
        _.keys(Backbone.sync.args[0][1].attributes).should.containEql(
          "profile_id"
        )
        _.keys(Backbone.sync.args[0][1].attributes).should.containEql("profile")
        Backbone.sync.args[0][1].attributes.profile.id.should.equal(
          this.profileId2
        )
        onAdd.callCount.should.equal(1)
        onSuccess.callCount.should.equal(1)
        this.following.should.have.lengthOf(2)
        return this.following
          .findByModelId(this.profileId2)
          .get("profile_id")
          .should.equal(this.profileId2)
      }))

    return describe("#unfollow", () =>
      it("destroys a follow through the API and updates the collection", function () {
        this.following.add(this.follow2)
        this.following.should.have.lengthOf(2)
        const onRemove = sinon.spy()
        const onSuccess = sinon.spy()
        this.following.once(`remove:${this.profileId2}`, onRemove)
        this.following.unfollow(this.profileId2, { success: onSuccess })
        Backbone.sync.args[0][0].should.equal("delete")
        Backbone.sync.args[0][1].attributes.should.equal(
          this.follow2.attributes
        )
        onRemove.callCount.should.equal(1)
        onSuccess.callCount.should.equal(1)
        return this.following.should.have.lengthOf(1)
      }))
  })
})
