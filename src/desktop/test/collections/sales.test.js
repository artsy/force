/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Sales = require("../../collections/sales")

describe("Sales", function () {
  beforeEach(function () {
    return (this.sales = new Sales())
  })

  return describe("#hasAuctions", () =>
    it("checks to see if any of the models are auctions", function () {
      this.sales.add({ is_auction: false })
      this.sales.hasAuctions().should.be.false()
      this.sales.add({ is_auction: true })
      return this.sales.hasAuctions().should.be.true()
    }))
})
