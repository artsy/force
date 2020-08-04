/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sd = require("sharify").data
const { fabricate } = require("@artsy/antigravity")
const Backbone = require("backbone")
const BidderPosition = require("../../models/bidder_position")

describe("BidderPosition", function () {
  beforeEach(function () {
    return (this.bidderPosition = new BidderPosition(
      fabricate("bidder_position", {
        highest_bid: { display_amount_dollars: "$5,500" },
        display_max_bid_amount_dollars: "$3,100",
      })
    ))
  })

  describe("#currentBid", function () {
    it("returns the currency string representing the highest bid amount", function () {
      return this.bidderPosition.currentBid().should.equal("$5,500")
    })

    return it("returns undefined when there is no highest bid", function () {
      this.bidderPosition.unset("highest_bid")
      return _.isUndefined(this.bidderPosition.currentBid()).should.be.ok()
    })
  })

  describe("#maxBid", () =>
    it("returns a formatted currency string representing the max bid amount", function () {
      return this.bidderPosition.maxBid().should.equal("$3,100")
    }))

  return describe("#url()", function () {
    it("generates the right url with an id", function () {
      this.bidderPosition.set({ id: "cat" })
      return this.bidderPosition
        .url()
        .should.containEql("/api/v1/me/bidder_position/cat")
    })

    return it("generates the right url when a new model", function () {
      const newPosition = new BidderPosition()
      sd.API_URL = "https://api.artsy.net"
      return newPosition
        .url()
        .should.equal("https://api.artsy.net/api/v1/me/bidder_position")
    })
  })
})
