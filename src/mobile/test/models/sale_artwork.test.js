/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const SaleArtwork = require("../../models/sale_artwork")
const { fabricate } = require("@artsy/antigravity")
const Backone = require("backbone")
const sinon = require("sinon")
const _ = require("underscore")

describe("SaleArtwork", function () {
  beforeEach(function () {
    sinon.stub(Backone, "sync")
    return (this.saleArtwork = new SaleArtwork(fabricate("sale_artwork")))
  })

  afterEach(() => Backone.sync.restore())

  describe("#currentBid", function () {
    it("returns the correctly formatted string", function () {
      this.saleArtwork.set({ display_highest_bid_amount_dollars: "$100" })
      return this.saleArtwork.currentBid().should.equal("$100")
    })

    return it("defaults to opening_bid_cents", function () {
      this.saleArtwork.set({
        display_highest_bid_amount_dollars: null,
        display_opening_bid_dollars: "$2",
      })
      return this.saleArtwork.currentBid().should.equal("$2")
    })
  })

  describe("#bidLabel", function () {
    it("is Current Bid if there is a bid placed", function () {
      this.saleArtwork.set({ highest_bid_amount_cents: 1000 })
      return this.saleArtwork.bidLabel().should.equal("Current Bid")
    })

    return it("is Starting Bid if there is not a current bid", function () {
      this.saleArtwork.unset("highest_bid_amount_cents")
      return this.saleArtwork.bidLabel().should.equal("Starting Bid")
    })
  })

  describe("#minBid", () =>
    it("returns the correctly formatted string", function () {
      this.saleArtwork.set({ display_minimum_next_bid_dollars: "$10" })
      return this.saleArtwork.minBid().should.equal("$10")
    }))

  describe("#bidCountLabel", function () {
    it("returns bid count in plural form if there are 0 bids", function () {
      this.saleArtwork.set({ bidder_positions_count: 0 })
      this.saleArtwork.set({ highest_bid_amount_cents: 100 })
      return this.saleArtwork.bidCountLabel().should.equal("0 bids")
    })

    it("returns bid count in singular form if 1", function () {
      this.saleArtwork.set({ bidder_positions_count: 1 })
      this.saleArtwork.set({ highest_bid_amount_cents: 100 })
      return this.saleArtwork.bidCountLabel().should.equal("1 bid")
    })

    it("returns bid count in plural form if greater than 1", function () {
      this.saleArtwork.set({ bidder_positions_count: 6 })
      this.saleArtwork.set({ highest_bid_amount_cents: 100 })
      return this.saleArtwork.bidCountLabel().should.equal("6 bids")
    })

    it("returns a blank string if attribute not present", function () {
      this.saleArtwork.unset("bidder_positions_count")
      return this.saleArtwork.bidCountLabel().should.equal("0 bids")
    })

    return it("returns a blank string if highest_bid_amount_cents attribute not present", function () {
      this.saleArtwork.set({ bidder_positions_count: 6 })
      this.saleArtwork.unset("highest_bid_amount_cents")
      return this.saleArtwork.bidCountLabel().should.equal("0 bids")
    })
  })

  describe("#formatBidCount", function () {
    it("returns an empty string if there are no bids because of no highest_bid_amount_cents", function () {
      this.saleArtwork.set({ bidder_positions_count: 6 })
      this.saleArtwork.unset("highest_bid_amount_cents")
      return this.saleArtwork.formatBidCount().should.equal("")
    })

    it("returns an empty string if there are no bids", function () {
      this.saleArtwork.unset("bidder_positions_count")
      return this.saleArtwork.formatBidCount().should.equal("")
    })

    return it("returns the original count in parentheses if it exists", function () {
      this.saleArtwork.set({ bidder_positions_count: 6 })
      this.saleArtwork.set({ highest_bid_amount_cents: 100 })
      return this.saleArtwork.formatBidCount().should.equal("(6 bids)")
    })
  })

  describe("#formatBidsAndReserve", function () {
    describe("with no bids", function () {
      it("returns This work has a reserve if there is a reserve", function () {
        this.saleArtwork.set({ highest_bid_amount_cents: 100 })
        this.saleArtwork.set({ bidder_positions_count: 0 })
        this.saleArtwork.set({ reserve_status: "reserve_not_met" })
        return this.saleArtwork
          .formatBidsAndReserve()
          .should.equal("(This work has a reserve)")
      })

      return it("returns nothing if there is no reserve", function () {
        this.saleArtwork.set({ highest_bid_amount_cents: 100 })
        this.saleArtwork.set({ bidder_positions_count: 0 })
        this.saleArtwork.set({ reserve_status: "no_reserve" })
        return this.saleArtwork.formatBidsAndReserve().should.equal("")
      })
    })

    return describe("with bids", function () {
      it("returns only bid data if there is no reserve", function () {
        this.saleArtwork.set({ highest_bid_amount_cents: 100 })
        this.saleArtwork.set({ bidder_positions_count: 2 })
        this.saleArtwork.set({ reserve_status: "no_reserve" })
        return this.saleArtwork.formatBidsAndReserve().should.equal("(2 bids)")
      })

      it("returns bid count and reserve not met if reserve is not met", function () {
        this.saleArtwork.set({ highest_bid_amount_cents: 100 })
        this.saleArtwork.set({ bidder_positions_count: 2 })
        this.saleArtwork.set({ reserve_status: "reserve_not_met" })
        return this.saleArtwork
          .formatBidsAndReserve()
          .should.equal("(2 bids, Reserve not met)")
      })

      return it("returns bid count and reserve met if reserve is met", function () {
        this.saleArtwork.set({ highest_bid_amount_cents: 100 })
        this.saleArtwork.set({ bidder_positions_count: 2 })
        this.saleArtwork.set({ reserve_status: "reserve_met" })
        return this.saleArtwork
          .formatBidsAndReserve()
          .should.equal("(2 bids, Reserve met)")
      })
    })
  })

  return describe("#estimate", function () {
    it("formats the estimate", function () {
      this.saleArtwork.unset("display_low_estimate_dollars")
      this.saleArtwork.unset("display_high_estimate_dollars")
      _.isUndefined(this.saleArtwork.estimate()).should.be.ok()
      this.saleArtwork.set({
        display_low_estimate_dollars: "$200",
        display_high_estimate_dollars: "$300",
      })
      this.saleArtwork.estimate().should.equal("$200–$300")
      this.saleArtwork.unset("display_high_estimate_dollars")
      return this.saleArtwork.estimate().should.equal("$200")
    })

    return it("falls back on to `estimate_cents`", function () {
      this.saleArtwork.set({
        display_low_estimate_dollars: "$200",
        display_estimate_dollars: "$600",
      })
      this.saleArtwork.estimate().should.equal("$200")
      this.saleArtwork.unset("display_low_estimate_dollars")
      return this.saleArtwork.estimate().should.equal("$600")
    })
  })
})
