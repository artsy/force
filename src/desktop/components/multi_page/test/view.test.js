/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const MultiPageView = benv.requireWithJadeify(require.resolve("../view"), [
  "template",
])
const config = require("../config")

describe("MultiPageView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

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
    this.view.$(".mpv-nav a:first").hasClass("is-active").should.be.true()
    return this.view.$(".is-active").should.have.lengthOf(1)
  })

  describe("clicking nav link", () =>
    it("changes the active page", function () {
      this.view.state.get("active").should.equal("how-auctions-work-bidding")
      this.view.$(".mpv-nav a:last").click()
      this.view.state
        .get("active")
        .should.equal("how-auctions-work-conditions-of-sale")
      this.view.$(".mpv-nav a:last").hasClass("is-active").should.be.true()
      return this.view.$(".is-active").should.have.lengthOf(1)
    }))

  return describe("defaultPageId", () =>
    it("displays default page when a defaultPageId is passed", function () {
      const options = _.extend(config["collector-faqs"], {
        defaultPageId: "collector-faqs-selling-on-artsy",
      })
      const view = new MultiPageView(options)
      view.render()

      view.state.get("active").should.equal("collector-faqs-selling-on-artsy")
      view.$(".mpv-nav a:last").hasClass("is-active").should.be.true()
      return view.$(".is-active").should.have.lengthOf(1)
    }))
})
