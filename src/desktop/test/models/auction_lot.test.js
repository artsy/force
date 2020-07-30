/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const should = require("should")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const AuctionLot = require("../../models/auction_lot")

describe("AuctionLot", function () {
  before(function () {
    return (this.lot = new AuctionLot(fabricate("auction_result")))
  })

  describe("#href", () =>
    it("returns a URL to the auction lot", function () {
      return this.lot
        .href(new Backbone.Model({ id: "foo-bar" }))
        .should.equal(`/artist/foo-bar/auction-result/${this.lot.id}`)
    }))

  describe("#toPageTitle", () =>
    it("returns a string usable for the page title", function () {
      const artist = new Backbone.Model({ name: "Foo Bar" })
      this.lot
        .toPageTitle()
        .should.equal(
          'Auction Result for "MADONNA PAINTING" (1985) | Lempertz, May 23, 2012 | Artsy'
        )
      this.lot.set({ artist_name: "Foo Bar" })
      return this.lot
        .toPageTitle(artist)
        .should.equal(
          'Auction Result for "MADONNA PAINTING" (1985) by Foo Bar | Lempertz, May 23, 2012 | Artsy'
        )
    }))

  describe("#toPageDescription", () =>
    it("returns a string usable for the page description", function () {
      return this.lot
        .toPageDescription()
        .should.equal(
          "Screenprint on canvas, 20.1 × 15.9 in. Estimate €120,000 - 160,000 from Lempertz on May 23, 2012. Find auction estimate and sale price, and research more auction results from top auction houses."
        )
    }))

  return describe("#hasDimensions", () =>
    it("returns true if there is any dimension attributes present", function () {
      this.lot.hasDimensions().should.be.ok()
      this.lot.unset("dimensions")
      this.lot.hasDimensions().should.not.be.ok()
      this.lot.set("dimensions", "foobar")
      this.lot.hasDimensions().should.not.be.ok()
      this.lot.set("dimensions", { in: "foo" })
      this.lot.hasDimensions().should.be.ok()
      this.lot.set("dimensions", { cm: "foo" })
      return this.lot.hasDimensions().should.be.ok()
    }))
})
