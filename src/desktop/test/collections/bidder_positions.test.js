/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const BidderPositions = require("../../collections/bidder_positions")
const SaleArtwork = require("../../models/sale_artwork")
const Sale = require("../../models/sale")

describe("BidderPositions", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.bidderPositions = new BidderPositions(
      [
        fabricate("bidder_position", {
          id: _.uniqueId(),
          created_at: "2011-11-14T00:03:27Z",
          highest_bid: { id: _.uniqueId() },
        }),
        fabricate("bidder_position", {
          id: _.uniqueId(),
          created_at: "2013-11-14T00:03:27Z",
          highest_bid: { id: _.uniqueId() },
        }),
        fabricate("bidder_position", {
          id: _.uniqueId(),
          created_at: "2012-11-14T00:03:27Z",
          highest_bid: { id: _.uniqueId() },
        }),
      ],
      {
        saleArtwork: (this.saleArtwork = new SaleArtwork(
          fabricate("sale_artwork", { minimum_next_bid_cents: 500 })
        )),
        sale: (this.sale = new Sale(fabricate("sale"))),
      }
    ))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#url", () =>
    it("uses the correct URL when fetching", function () {
      this.bidderPositions.fetch()
      return Backbone.sync.args[0][1]
        .url()
        .should.containEql(
          `/api/v1/me/bidder_positions?sale_id=${this.sale.id}&artwork_id=${this.saleArtwork.id}`
        )
    }))

  describe("isHighestBidder", function () {
    it("is undefined if the bidder positions does not contain a highest bidder", function () {
      return _.isUndefined(
        this.bidderPositions.isHighestBidder()
      ).should.be.ok()
    })

    return it("returns the relevant bidder position if there is a highest bidder", function () {
      const position = this.bidderPositions.last()
      this.saleArtwork.set("highest_bid", {
        id: position.get("highest_bid").id,
      })
      return this.bidderPositions.isHighestBidder().should.equal(position)
    })
  })

  describe("isOutbid", () =>
    it("returns the most recent position if there is any positions and none are the high bidder", function () {
      _.isUndefined(new BidderPositions().isOutbid()).should.be.ok()
      this.saleArtwork.set("highest_bid", {
        id: this.bidderPositions.last().get("highest_bid").id,
      })
      _.isUndefined(this.bidderPositions.isHighestBidder()).should.not.be.ok()
      _.isUndefined(this.bidderPositions.isOutbid()).should.be.ok()
      this.saleArtwork.unset("highest_bid")
      return this.bidderPositions
        .isOutbid()
        .should.equal(this.bidderPositions.mostRecent())
    }))

  describe("#mostRecent", () =>
    it("returns the most recent of the bidder positions", function () {
      return this.bidderPositions
        .mostRecent()
        .get("created_at")
        .should.equal("2013-11-14T00:03:27Z")
    }))

  describe("#classes", () =>
    it("returns some class names used in CSS depending on the state of the collection", function () {
      _.isUndefined(new BidderPositions().classes()).should.be.ok()
      this.bidderPositions.classes().should.equal("is-outbid")
      this.saleArtwork.set("highest_bid", {
        id: this.bidderPositions.last().get("highest_bid").id,
      })
      return this.bidderPositions.classes().should.equal("is-highest")
    }))

  return describe("#minBidCents", function () {
    it("returns the minimum next bid (in this case from the first bidder position suggested_next_bid_cents)", function () {
      return this.bidderPositions.minBidCents().should.equal(325000)
    })

    it("returns the minimum next bid (if the sale artwork has a higher minimum_next_bid_cents)", function () {
      this.saleArtwork.set("minimum_next_bid_cents", 650000)
      return this.bidderPositions.minBidCents().should.equal(650000)
    })

    it("still returns in the event sale artwork minimum_next_bid_cents is undefined", function () {
      this.saleArtwork.unset("minimum_next_bid_cents")
      return this.bidderPositions.minBidCents().should.equal(325000)
    })

    return it("still returns in the event there are no bidder positions", function () {
      this.saleArtwork.set("minimum_next_bid_cents", 500)
      const bidderPositions = new BidderPositions([], {
        saleArtwork: this.saleArtwork,
        sale: this.sale,
      })
      return bidderPositions.minBidCents().should.equal(500)
    })
  })
})
