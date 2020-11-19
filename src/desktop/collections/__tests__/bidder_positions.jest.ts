import { uniqueId } from "lodash"
import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
const BidderPositions = require("../bidder_positions.coffee")
const SaleArtwork = require("../../models/sale_artwork.coffee")
const Sale = require("../../models/sale.coffee")

describe("BidderPositions", () => {
  let bidderPositions
  let sale
  let saleArtwork

  beforeEach(() => {
    Backbone.sync = jest.fn()
    bidderPositions = new BidderPositions(
      [
        fabricate("bidder_position", {
          created_at: "2011-11-14T00:03:27Z",
          highest_bid: { id: uniqueId() },
          id: uniqueId(),
        }),
        fabricate("bidder_position", {
          created_at: "2013-11-14T00:03:27Z",
          highest_bid: { id: uniqueId() },
          id: uniqueId(),
        }),
        fabricate("bidder_position", {
          created_at: "2012-11-14T00:03:27Z",
          highest_bid: { id: uniqueId() },
          id: uniqueId(),
        }),
      ],
      {
        sale: sale = new Sale(fabricate("sale")),
        saleArtwork: saleArtwork = new SaleArtwork(
          fabricate("sale_artwork", { minimum_next_bid_cents: 500 })
        ),
      }
    )
  })

  describe("#url", () => {
    it("uses the correct URL when fetching", () => {
      bidderPositions.fetch()
      Backbone.sync.mock.calls[0][1]
        .url()
        .should.containEql(
          `/api/v1/me/bidder_positions?sale_id=${sale.id}&artwork_id=${saleArtwork.id}`
        )
    })
  })

  describe("isHighestBidder", () => {
    it("is undefined if the bidder positions does not contain a highest bidder", () => {
      expect(bidderPositions.isHighestBidder()).toBeUndefined()
    })

    it("returns the relevant bidder position if there is a highest bidder", () => {
      const position = bidderPositions.last()
      saleArtwork.set("highest_bid", {
        id: position.get("highest_bid").id,
      })
      bidderPositions.isHighestBidder().should.equal(position)
    })
  })

  describe("isOutbid", () => {
    it("returns the most recent position if there is any positions and none are the high bidder", () => {
      expect(new BidderPositions().isOutbid()).toBeUndefined()
      saleArtwork.set("highest_bid", {
        id: bidderPositions.last().get("highest_bid").id,
      })
      expect(bidderPositions.isHighestBidder()).not.toBeUndefined()
      expect(bidderPositions.isOutbid()).toBeUndefined()
      saleArtwork.unset("highest_bid")
      bidderPositions.isOutbid().should.equal(bidderPositions.mostRecent())
    })
  })

  describe("#mostRecent", () => {
    it("returns the most recent of the bidder positions", () => {
      bidderPositions
        .mostRecent()
        .get("created_at")
        .should.equal("2013-11-14T00:03:27Z")
    })
  })

  describe("#classes", () => {
    it("returns some class names used in CSS depending on the state of the collection", () => {
      expect(new BidderPositions().classes()).toBeUndefined()
      bidderPositions.classes().should.equal("is-outbid")
      saleArtwork.set("highest_bid", {
        id: bidderPositions.last().get("highest_bid").id,
      })
      bidderPositions.classes().should.equal("is-highest")
    })
  })

  describe("#minBidCents", () => {
    it("returns the minimum next bid (in this case from the first bidder position suggested_next_bid_cents)", () => {
      bidderPositions.minBidCents().should.equal(325000)
    })

    it("returns the minimum next bid (if the sale artwork has a higher minimum_next_bid_cents)", () => {
      saleArtwork.set("minimum_next_bid_cents", 650000)
      bidderPositions.minBidCents().should.equal(650000)
    })

    it("still returns in the event sale artwork minimum_next_bid_cents is undefined", () => {
      saleArtwork.unset("minimum_next_bid_cents")
      bidderPositions.minBidCents().should.equal(325000)
    })

    it("still returns in the event there are no bidder positions", () => {
      saleArtwork.set("minimum_next_bid_cents", 500)
      const bidderPositions = new BidderPositions([], {
        sale: sale,
        saleArtwork: saleArtwork,
      })
      bidderPositions.minBidCents().should.equal(500)
    })
  })
})
