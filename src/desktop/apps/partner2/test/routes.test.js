/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const routes = require("../routes")
const Profile = require("../../../models/profile.coffee")
const CurrentUser = require("../../../models/current_user.coffee")

describe("Partner routes", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.req = { body: {}, query: {}, params: { id: "foo" } }
    this.res = { render: sinon.stub(), locals: { sd: {} } }
    return (this.next = sinon.stub())
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#requireNewLayout", function () {
    _.each(
      ["gallery_one", "gallery_two", "gallery_three", "institution"],
      layout =>
        it(`nexts to the middleware in this route stack if the profile layout is ${layout}`, function () {
          const partnerProfile = new Profile(
            fabricate("partner_profile", {
              owner: fabricate("partner", { profile_layout: layout }),
            })
          )
          this.res.locals.profile = partnerProfile
          routes.requireNewLayout(this.req, this.res, this.next)
          this.next.calledOnce.should.be.ok
          return _.isUndefined(this.next.args[0][0]).should.be.ok()
        })
    )

    return _.each(["gellery_default", "gallery_deprecated"], layout =>
      it(`skips the middlewares from this route stack if the profile layout is ${layout}`, function () {
        const deprecatedLayoutPartnerProfile = new Profile(
          fabricate("partner_profile", {
            owner: fabricate("partner", { profile_layout: layout }),
          })
        )
        this.res.locals.profile = deprecatedLayoutPartnerProfile
        routes.requireNewLayout(this.req, this.res, this.next)
        this.next.calledOnce.should.be.ok
        return this.next.args[0][0].should.equal("route")
      })
    )
  })
})
