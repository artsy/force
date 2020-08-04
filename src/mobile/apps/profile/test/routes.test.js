/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const routes = require("../routes")
const Backbone = require("backbone")
const Profile = require("../../../models/profile")

describe("#index", function () {
  beforeEach(function () {
    let renderStub
    sinon.stub(Backbone, "sync")
    routes.index(
      {
        params: { id: "foo" },
        profile: new Profile(fabricate("profile", { owner_type: "User" })),
      },
      { locals: { sd: {} }, render: (renderStub = sinon.stub()) }
    )
    Backbone.sync.args[0][2].success(fabricate("profile", { id: "artsy-ed" }))
    this.templateName = renderStub.args[0][0]
    return (this.templateOptions = renderStub.args[0][1])
  })

  afterEach(() => Backbone.sync.restore())

  return it("renders the post page", function () {
    this.templateName.should.equal("template")
    return this.templateOptions.profile.get("id").should.equal("artsy-ed")
  })
})

describe("#setProfile", function () {
  beforeEach(() => sinon.stub(Backbone, "sync"))

  afterEach(() => Backbone.sync.restore())

  it("sets the profile from the vanity url and lets the next handler take it", function () {
    let spy
    const req = { params: { id: "foobar" } }
    const res = { locals: { sd: {} } }
    routes.setProfile(req, res, (spy = sinon.spy()))
    Backbone.sync.args[0][2].success(fabricate("profile", { id: "foobar" }))
    req.profile.get("id").should.equal("foobar")
    return spy.called.should.be.ok()
  })

  return it("nexts if the profile already exists on the req", function () {
    let next
    const req = {
      params: { id: "foobar" },
      profile: new Profile(fabricate("profile")),
    }
    const res = { locals: { sd: {} } }

    routes.setProfile(req, res, (next = sinon.spy()))
    return next.called.should.be.ok()
  })
})
