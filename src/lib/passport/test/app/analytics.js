/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const sinon = require("sinon")
const rewire = require("rewire")
const analytics = rewire("../../lib/app/analytics")

describe("analytics", function () {
  beforeEach(function () {
    let Analytics
    analytics.__set__("opts", { SEGMENT_WRITE_KEY: "foobar" })
    const scope = this
    analytics.__set__(
      "Analytics",
      (Analytics = (function () {
        Analytics = class Analytics {
          static initClass() {
            this.prototype.track = sinon.stub()
          }
          constructor() {
            scope.analytics = this
          }
        }
        Analytics.initClass()
        return Analytics
      })())
    )
    this.req = {
      session: {},
      body: {},
      user: {
        get() {
          return "foo"
        },
      },
      query: {},
    }
    this.res = { locals: { sd: {} } }
    this.next = sinon.stub()
  })

  it("tracks signup", function () {
    analytics.trackSignup("email")(this.req, this.res, this.next)
    this.analytics.track.args[0][0].properties.signup_service.should.equal(
      "email"
    )
  })

  it("tracks login", function () {
    analytics.trackLogin(this.req, this.res, this.next)
    this.analytics.track.args[0][0].event.should.equal("Successfully logged in")
    this.analytics.track.args[0][0].userId.should.equal("foo")
  })

  it("passes along modal_id and acquisition_initiative submitted fields", function () {
    this.req.body.modal_id = "foo"
    this.req.body.acquisition_initiative = "bar"
    analytics.setCampaign(this.req, this.res, this.next)
    analytics.trackSignup("email")(this.req, this.res, this.next)
    this.analytics.track.args[0][0].properties.modal_id.should.equal("foo")
    this.analytics.track.args[0][0].properties.acquisition_initiative.should.equal(
      "bar"
    )
  })

  it("passes along acquisition_initiative query params for OAuth links", function () {
    this.req.query.modal_id = "foo"
    this.req.query.acquisition_initiative = "bar"
    analytics.setCampaign(this.req, this.res, this.next)
    analytics.trackSignup("email")(this.req, this.res, this.next)
    this.analytics.track.args[0][0].properties.modal_id.should.equal("foo")
    this.analytics.track.args[0][0].properties.acquisition_initiative.should.equal(
      "bar"
    )
  })

  it("doesnt hold on to the temporary session variable", function () {
    analytics.__set__("opts", {})
    this.req.body.modal_id = "foo"
    this.req.body.acquisition_initiative = "bar"
    analytics.setCampaign(this.req, this.res, this.next)
    analytics.trackSignup("email")(this.req, this.res, this.next)
    Object.keys(this.req.session).length.should.equal(0)
  })
})
