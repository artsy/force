/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Sale = require("../../../models/sale")
const Backbone = require("backbone")
const buyersPremium = require("../")
const { fabricate } = require("@artsy/antigravity")

describe("buyersPremium", function () {
  beforeEach(() => sinon.stub(Backbone, "sync"))

  afterEach(() => Backbone.sync.restore())

  it("renders buyers premium based on the sale and page", function (done) {
    buyersPremium(new Sale(fabricate("sale")), function (err, html) {
      html.should.containEql("<div class='buyers-premium-pre'>")
      html.should.containEql("25%")
      return done()
    })
    return Backbone.sync.args[0][2].success(fabricate("page"))
  })

  it("renders buyers premium on a flat fee", function (done) {
    const sale = fabricate("sale", {
      buyers_premium: { schedule: [{ min_amount_cents: 0, percent: 0.25 }] },
    })
    buyersPremium(new Sale(sale), function (err, html) {
      html.should.containEql("25% on the hammer price")
      return done()
    })
    return Backbone.sync.args[0][2].success(fabricate("page"))
  })

  return it("renders buyers premium nicely that multiplies by 100 poorly", function (done) {
    const sale = fabricate("sale", {
      buyers_premium: { schedule: [{ min_amount_cents: 0, percent: 0.144 }] },
    })
    buyersPremium(new Sale(sale), function (err, html) {
      html.should.containEql("14.4% on the hammer price")
      return done()
    })
    return Backbone.sync.args[0][2].success(fabricate("page"))
  })
})
