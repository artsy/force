const { Sales } = require("../sales")

describe("Sales", () => {
  let sales

  beforeEach(() => {
    sales = new Sales()
  })

  describe("#hasAuctions", () => {
    it("checks to see if any of the models are auctions", () => {
      sales.add({ is_auction: false })
      sales.hasAuctions().should.be.false()
      sales.add({ is_auction: true })
      sales.hasAuctions().should.be.true()
    })
  })
})
