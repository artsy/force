/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const _ = require("underscore")
const MultiPageView = benv.requireWithJadeify(require.resolve("../view"), [
  "template",
])
const config = require("../config")

describe("MultiPageView", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      this.triggerSpy = sinon.spy()
      MultiPageView.__set__("mediator", { trigger: this.triggerSpy })
      return done()
    })
  })

  after(() => benv.teardown())

  beforeEach(function () {
    this.view = new MultiPageView(config["auction-faqs"])
    return this.view.render()
  })

  it("renders correctly", function () {
    this.view.$(".mpv-title").text().should.equal("Auction FAQs")
    this.view
      .$(".mpv-description")
      .text()
      .should.containEql("Need more immediate assistance? Please contact us")
    this.view
      .$(".mpv-nav")
      .text()
      .should.equal(
        "BiddingBuyers premium, taxes, & feesPayments and ShippingEmails and alertsConditions of sale"
      )
    this.view
      .$(".mpv-nav .mpv-content:first")
      .hasClass("is-active")
      .should.be.true()
    return this.view.$(".is-active").should.have.lengthOf(1)
  })

  return describe("clicking nav link", () =>
    it("changes the active page", function (done) {
      this.view.state.get("active").should.equal("how-auctions-work-bidding")
      this.view.$(".mpv-nav a:last").click()
      this.view.state
        .get("active")
        .should.equal("how-auctions-work-conditions-of-sale")
      this.view
        .$(".mpv-nav .mpv-content:last")
        .hasClass("is-active")
        .should.be.true()
      this.view.$(".is-active").should.have.lengthOf(1)
      return _.defer(() =>
        _.defer(() => {
          this.triggerSpy.getCall(0).args[0].should.equal("scrollto:element")
          return done()
        })
      )
    }))
})
