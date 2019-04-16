import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { test } from "desktop/apps/auction/components/artwork_browser/main/artwork/BidStatus"

const { BidStatus } = test

xdescribe("auction/components/artwork_browser/main/artwork/BidStatus.test", () => {
  describe("<BidStatus />", () => {
    it("renders sold label if artwork is sold", () => {
      const { wrapper } = renderTestComponent({
        Component: BidStatus,
        props: {
          isSold: true,
          currentBidDisplay: "",
          bidLabel: "",
        },
      })

      wrapper
        .find(".auction-BidStatus__bid-label")
        .text()
        .should.eql("Sold")
    })

    it("renders artwork display and bidLabel if not sold", () => {
      const { wrapper } = renderTestComponent({
        Component: BidStatus,
        props: {
          isSold: false,
          currentBidDisplay: "Hello",
          bidLabel: "World",
        },
      })

      wrapper.find(".auction-BidStatus__bid-label").length.should.eql(0)
      wrapper
        .find(".auction-BidStatus__bid-amount")
        .text()
        .should.eql("Hello")
      wrapper.text().should.containEql("World")
    })
  })
})
