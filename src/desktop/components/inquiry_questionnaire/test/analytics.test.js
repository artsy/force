/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const rewire = require("rewire")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const CurrentUser = require("../../../models/current_user")
const Artwork = require("../../../models/artwork")
const ArtworkInquiry = require("../../../models/artwork_inquiry")
const analytics = rewire("../analytics")

describe("analytics proxy", function () {
  beforeEach(function () {
    this.hooks = analytics.__get__("analyticsHooks")
    sinon.stub(this.hooks, "trigger")

    this.context = {
      modal: { on: sinon.stub(), off: sinon.stub() },
      user: new CurrentUser(fabricate("user")),
      artwork: new Artwork(fabricate("artwork")),
      inquiry: (this.inquiry = new ArtworkInquiry()),
      collectorProfile: new Backbone.Model(),
      userInterests: new Backbone.Model(),
      state: new Backbone.Model(),
      foo: "not eventable",
    }

    return analytics.attach(this.context)
  })

  afterEach(function () {
    this.hooks.trigger.restore()
    return analytics.teardown(this.context)
  })

  return describe("#attach", () =>
    it("proxies all the events with a namespace", function () {
      this.inquiry.trigger("sync")

      // Proxies the namespaced event over hooks
      this.hooks.trigger.callCount.should.equal(1)
      this.hooks.trigger.args[0][0].should.equal(
        "inquiry_questionnaire:inquiry:sync"
      )

      // Passes the complete context
      return Object.keys(this.hooks.trigger.args[0][1]).should.eql([
        "modal",
        "user",
        "artwork",
        "inquiry",
        "collectorProfile",
        "userInterests",
        "state",
        "foo",
      ])
    }))
})
