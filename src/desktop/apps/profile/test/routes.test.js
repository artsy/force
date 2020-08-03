/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const routes = require("../routes")
const Profile = require("../../../models/profile.coffee")

describe("Profile routes", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.req = { body: {}, query: {}, get: sinon.stub(), params: { id: "foo" } }
    return (this.res = {
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: { sd: {} },
    })
  })

  afterEach(() => Backbone.sync.restore())

  describe("#follow", function () {
    beforeEach(function () {
      this.req.user = new Backbone.Model()
      this.req
      return routes.follow(this.req, this.res)
    })

    it("follows the profile", () =>
      _.last(Backbone.sync.args)[1]
        .urlRoot()
        .should.containEql("me/follow/profile"))

    return it("rediects back", function () {
      _.last(Backbone.sync.args)[2].success()
      return this.res.redirect.args[0][0].should.equal("/foo")
    })
  })

  return describe("#setProfile", function () {
    it("sets the profile in locals for other apps", function () {
      let next
      routes.setProfile(this.req, this.res, (next = sinon.stub()))
      _.last(Backbone.sync.args)[1].url().should.containEql("/profile/foo")
      _.last(Backbone.sync.args)[2].success(
        fabricate("profile", { id: "moobar" })
      )
      return this.res.locals.profile.get("id").should.equal("moobar")
    })

    it("passes the users access token", function () {
      let next
      this.req.user = new Backbone.Model({ accessToken: "foobar" })
      routes.setProfile(this.req, this.res, (next = sinon.stub()))
      return _.last(Backbone.sync.args)[2].data.access_token.should.containEql(
        "foobar"
      )
    })

    it("does not pass an access token with no user", function () {
      let next
      this.req.user = null
      routes.setProfile(this.req, this.res, (next = sinon.stub()))
      return (
        _.last(Backbone.sync.args)[2].data.access_token != null
      ).should.not.be.ok()
    })

    it("nexts if profile already exists in locals", function () {
      let next
      this.res.locals.profile = new Profile(fabricate("profile"))
      routes.setProfile(this.req, this.res, (next = sinon.stub()))
      return next.called.should.be.ok()
    })

    return it("nexts for a request for an `asset` profile", function () {
      let next
      this.req.params.id = "assets"
      routes.setProfile(this.req, this.res, (next = sinon.stub()))
      return next.called.should.be.ok()
    })
  })
})
