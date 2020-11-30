import _ from "underscore"
const sd = require("sharify").data
import { fabricate } from "@artsy/antigravity"
const BidderPosition = require("../../models/bidder_position.coffee")

describe("BidderPosition", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.bidderPosition = new BidderPosition(
      fabricate("bidder_position", {
        display_max_bid_amount_dollars: "$3,100",
        highest_bid: { display_amount_dollars: "$5,500" },
      })
    )
  })

  describe("#currentBid", () => {
    it("returns the currency string representing the highest bid amount", () => {
      testContext.bidderPosition.currentBid().should.equal("$5,500")
    })

    it("returns undefined when there is no highest bid", () => {
      testContext.bidderPosition.unset("highest_bid")
      _.isUndefined(testContext.bidderPosition.currentBid()).should.be.ok()
    })
  })

  describe("#maxBid", () => {
    it("returns a formatted currency string representing the max bid amount", () => {
      testContext.bidderPosition.maxBid().should.equal("$3,100")
    })
  })

  describe("#url()", () => {
    it("generates the right url with an id", () => {
      testContext.bidderPosition.set({ id: "cat" })
      testContext.bidderPosition
        .url()
        .should.containEql("/api/v1/me/bidder_position/cat")
    })

    it("generates the right url when a new model", () => {
      const newPosition = new BidderPosition()
      sd.API_URL = "https://api.artsy.net"
      newPosition
        .url()
        .should.equal("https://api.artsy.net/api/v1/me/bidder_position")
    })
  })
})
