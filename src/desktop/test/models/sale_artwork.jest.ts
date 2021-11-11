import _ from "underscore"
import sinon from "sinon"
const Backone = require("backbone")
const SaleArtwork = require("../../models/sale_artwork.coffee")
import { fabricate } from "@artsy/antigravity"

describe("SaleArtwork", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    sinon.stub(Backone, "sync")
    testContext.saleArtwork = new SaleArtwork(fabricate("sale_artwork"))
  })

  afterEach(() => Backone.sync.restore())

  describe("#currentBid", () => {
    it("defaults to display_opening_bid_dollars", () => {
      testContext.saleArtwork.set({
        display_highest_bid_amount_dollars: null,
        display_opening_bid_dollars: "$200",
      })
      testContext.saleArtwork.currentBid().should.equal("$200")
    })
  })

  describe("#bidLabel", () => {
    it("is Current Bid if there is a bid placed", () => {
      testContext.saleArtwork.set({ highest_bid_amount_cents: 1000 })
      testContext.saleArtwork.bidLabel().should.equal("Current Bid")
    })

    it("is Starting Bid if there is not a current bid", () => {
      testContext.saleArtwork.unset("highest_bid_amount_cents")
      testContext.saleArtwork.bidLabel().should.equal("Starting Bid")
    })
  })

  describe("#estimate", () => {
    it("formats the estimate", () => {
      testContext.saleArtwork.unset("display_low_estimate_dollars")
      testContext.saleArtwork.unset("display_high_estimate_dollars")
      _.isUndefined(testContext.saleArtwork.estimate()).should.be.ok()
      testContext.saleArtwork.set({
        display_high_estimate_dollars: "$300",
        display_low_estimate_dollars: "$200",
      })
      testContext.saleArtwork.estimate().should.equal("$200–$300")
      testContext.saleArtwork.unset("display_high_estimate_dollars")
      testContext.saleArtwork.estimate().should.equal("$200")
    })

    it("falls back on to `estimate_cents`", () => {
      testContext.saleArtwork.set({
        display_estimate_dollars: "$600",
        display_low_estimate_dollars: "$200",
      })
      testContext.saleArtwork.estimate().should.equal("$200")
      testContext.saleArtwork.unset("display_low_estimate_dollars")
      testContext.saleArtwork.estimate().should.equal("$600")
    })
  })

  describe("#bidCountLabel", () => {
    it("returns bid count in singular form if 1", () => {
      testContext.saleArtwork.set({ bidder_positions_count: 1 })
      testContext.saleArtwork.set({ highest_bid_amount_cents: 100 })
      testContext.saleArtwork.bidCountLabel().should.equal("1 bid")
    })

    it("returns bid count in plural form if greater than 1", () => {
      testContext.saleArtwork.set({ bidder_positions_count: 6 })
      testContext.saleArtwork.set({ highest_bid_amount_cents: 100 })
      testContext.saleArtwork.bidCountLabel().should.equal("6 bids")
    })

    it("returns 0 if the highest_bid_amount_cents is not set (i.e. all bids were cancelled)", () => {
      testContext.saleArtwork.set({ bidder_positions_count: 6 })
      testContext.saleArtwork.unset("highest_bid_amount_cents")
      testContext.saleArtwork.bidCountLabel().should.equal("0 bids")
    })

    it("returns a 0 bids string if attribute not present", () => {
      testContext.saleArtwork.unset("bidder_positions_count")
      testContext.saleArtwork.bidCountLabel().should.equal("0 bids")
    })
  })

  // Pending this until someone tells me why it shouldn't be
  // it 'returns a blank string if highest_bid_amount_cents null', ->
  //   @saleArtwork.set bidder_positions_count: 6
  //   @saleArtwork.unset 'highest_bid_amount_cents'
  //   @saleArtwork.bidCount().should.equal ''

  describe("#formatBidCount", () => {
    it("returns an empty string if there are no bids because of no highest_bid_amount_cents", () => {
      testContext.saleArtwork.set({ bidder_positions_count: 6 })
      testContext.saleArtwork.unset("highest_bid_amount_cents")
      testContext.saleArtwork.formatBidCount().should.equal("")
    })

    it("returns an empty string if there are no bids", () => {
      testContext.saleArtwork.unset("bidder_positions_count")
      testContext.saleArtwork.formatBidCount().should.equal("")
    })

    it("returns the original count in parentheses if it exists", () => {
      testContext.saleArtwork.set({ bidder_positions_count: 6 })
      testContext.saleArtwork.set({ highest_bid_amount_cents: 100 })
      testContext.saleArtwork.formatBidCount().should.equal("(6 bids)")
    })
  })

  describe("#formatBidsAndReserve", () => {
    describe("with no bids", () => {
      it("returns This work has a reserve if there is a reserve", () => {
        testContext.saleArtwork.set({ highest_bid_amount_cents: 100 })
        testContext.saleArtwork.set({ bidder_positions_count: 0 })
        testContext.saleArtwork.set({ reserve_status: "reserve_not_met" })
        testContext.saleArtwork
          .formatBidsAndReserve()
          .should.equal("(This work has a reserve)")
      })

      it("returns nothing if there is no reserve", () => {
        testContext.saleArtwork.set({ highest_bid_amount_cents: 100 })
        testContext.saleArtwork.set({ bidder_positions_count: 0 })
        testContext.saleArtwork.set({ reserve_status: "no_reserve" })
        testContext.saleArtwork.formatBidsAndReserve().should.equal("")
      })
    })

    describe("with bids", () => {
      it("returns only bid data if there is no reserve", () => {
        testContext.saleArtwork.set({ highest_bid_amount_cents: 100 })
        testContext.saleArtwork.set({ bidder_positions_count: 2 })
        testContext.saleArtwork.set({ reserve_status: "no_reserve" })
        testContext.saleArtwork.formatBidsAndReserve().should.equal("(2 bids)")
      })

      it("returns bid count and reserve not met if reserve is not met", () => {
        testContext.saleArtwork.set({ highest_bid_amount_cents: 100 })
        testContext.saleArtwork.set({ bidder_positions_count: 2 })
        testContext.saleArtwork.set({ reserve_status: "reserve_not_met" })
        testContext.saleArtwork
          .formatBidsAndReserve()
          .should.equal("(2 bids, Reserve not met)")
      })

      it("returns bid count and reserve met if reserve is met", () => {
        testContext.saleArtwork.set({ highest_bid_amount_cents: 100 })
        testContext.saleArtwork.set({ bidder_positions_count: 2 })
        testContext.saleArtwork.set({ reserve_status: "reserve_met" })
        testContext.saleArtwork
          .formatBidsAndReserve()
          .should.equal("(2 bids, Reserve met)")
      })
    })
  })

  describe("#pollForBidChange", () => {
    it("will poll until the highest bid on the sale artwork changes", done => {
      sinon.stub(global, "setInterval")
      // @ts-ignore
      setInterval.callsArg(0)
      testContext.saleArtwork.set({ highest_bid_amount_cents: 100 })
      testContext.saleArtwork.pollForBidChange({
        success() {
          done()
        },
      })
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      _.last(Backone.sync.args)[2].success()
      testContext.saleArtwork.set({ highest_bid_amount_cents: 100 })
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      _.last(Backone.sync.args)[2].success()
      testContext.saleArtwork.set({ highest_bid_amount_cents: 200 })
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      _.last(Backone.sync.args)[2].success()
      // @ts-ignore
      setInterval.restore()
    })
  })

  describe("#cleanBidAmount", () => {
    it("correctly cleans up and cleans bid amount", () => {
      // Handles prices with cents
      testContext.saleArtwork.cleanBidAmount("123.00").should.equal(12300)
      // Handles prices w/ cents > 0
      testContext.saleArtwork.cleanBidAmount("123.45").should.equal(12300)
      // Handles commas
      testContext.saleArtwork.cleanBidAmount("1,023.45").should.equal(102300)
      // Handles dollar signs
      testContext.saleArtwork.cleanBidAmount("$1,023.45").should.equal(102300)
      // Handles numbers
      testContext.saleArtwork.cleanBidAmount(1000).should.equal(100000)
    })
  })
})
