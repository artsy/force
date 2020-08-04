/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const rewire = require("rewire")
const routes = rewire("../routes")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const CurrentUser = require("../../../models/current_user.coffee")
const moment = require("moment")
const Q = require("bluebird-q")

const openSale = fabricate("sale", {
  name: "Awesome Sale",
  is_auction: true,
  auction_state: "open",
  start_at: moment().subtract(1, "minutes").format(),
  end_at: moment().add(3, "minutes").format(),
})

let analyticsConstructorArgs = []
let analyticsTrackArgs = []
const resetAnalytics = function () {
  analyticsTrackArgs = []
  return (analyticsConstructorArgs = [])
}

describe("#modalAuctionRegistration", function () {
  beforeEach(function () {
    let AnalyticsStub
    sinon.stub(Backbone, "sync")

    const analytics = (AnalyticsStub = class AnalyticsStub {
      constructor() {
        analyticsConstructorArgs = arguments
      }
      track() {
        return (analyticsTrackArgs = arguments)
      }
    })
    routes.__set__("Analytics", analytics)

    this.req = { params: { id: "awesome-sale" }, query: {} }
    this.res = {
      status: sinon.stub(),
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: {
        sd: {
          API_URL: "http://localhost:5000",
          SEGMENT_WRITE_KEY: "foo",
        },
        asset() {},
      },
    }
    return (this.next = sinon.stub())
  })

  afterEach(function () {
    Backbone.sync.restore()
    resetAnalytics()
    return (this.req.query = {})
  })

  it("redirects to login without user", function () {
    routes.modalAuctionRegistration(this.req, this.res)
    return this.res.redirect.args[0][0].should.equal(
      "/log_in?redirect_uri=/auction-registration/awesome-sale"
    )
  })

  return describe("with current user", function () {
    beforeEach(function () {
      return (this.req.user = new CurrentUser())
    })

    it("redirects to success url if sale is registerable and user has already registered", function () {
      routes.modalAuctionRegistration(this.req, this.res)
      Backbone.sync.args[0][2].success(openSale)

      Backbone.sync.args[1][2].success([{ foo: "bar" }])

      routes.modalAuctionRegistration(this.req, this.res)

      return this.res.redirect.args[0][0].should.equal(
        "/auction/whtney-art-party/confirm-registration"
      )
    })

    it("creates bidder and redirects to sale if sale is registerable and user has credit card on file and user accepted conditions", function () {
      this.req.query = { "accepted-conditions": "true" }
      routes.modalAuctionRegistration(this.req, this.res)
      Backbone.sync.args[0][2].success(openSale)
      Backbone.sync.args[1][2].success([])
      Backbone.sync.args[2][2].success([{ foo: "bar" }])
      Backbone.sync.args[3][2].success([{}])

      // it sends analytics
      const sentAnalytics = analyticsTrackArgs[0]
      sentAnalytics["event"].should.equal("Registration submitted")
      sentAnalytics["properties"]["auction_slug"].should.equal(
        "whtney-art-party"
      )

      return this.res.redirect.args[0][0].should.equal(
        "/auction/whtney-art-party/confirm-registration"
      )
    })

    it("redirects to registration flow if sale is registerable and user has credit card on file but user did not accept conditions", function () {
      routes.modalAuctionRegistration(this.req, this.res)
      Backbone.sync.args[0][2].success(openSale)
      Backbone.sync.args[1][2].success([])
      Backbone.sync.args[2][2].success([{ foo: "bar" }])

      // no analytics
      analyticsTrackArgs.should.be.empty()
      return this.res.redirect.args[0][0].should.equal(
        "/auction/whtney-art-party/registration-flow"
      )
    })

    it("renders registration error page if sale is an auction and is not registerable", function () {
      routes.modalAuctionRegistration(this.req, this.res)
      Backbone.sync.args[0][2].success(
        fabricate("sale", {
          name: "Awesome Sale",
          is_auction: true,
          auction_state: "closed",
        })
      )

      this.res.render.args[0][0].should.equal("registration-error")
      return this.res.render.args[0][1].sale
        .get("name")
        .should.equal("Awesome Sale")
    })

    return it("404 if sale is not auction", function () {
      routes.modalAuctionRegistration(this.req, this.res, this.next)
      Backbone.sync.args[0][2].success(
        fabricate("sale", { name: "Awesome Sale", is_auction: false })
      )

      this.next.args[0][0].status.should.equal(404)
      return this.next.args[0][0].message.should.equal("Not Found")
    })
  })
})
