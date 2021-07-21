import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
const AuctionLot = require("../../models/auction_lot.coffee")

describe("AuctionLot", () => {
  let testContext

  beforeAll(() => {
    testContext = {
      lot: new AuctionLot(fabricate("auction_result")),
    }
  })

  describe("#href", () => {
    it("returns a URL to the auction lot", () => {
      testContext.lot
        .href(new Backbone.Model({ id: "foo-bar" }))
        .should.equal(`/artist/foo-bar/auction-result/${testContext.lot.id}`)
    })
  })

  describe("#toPageTitle", () => {
    it("returns a string usable for the page title", () => {
      const artist = new Backbone.Model({ name: "Foo Bar" })
      testContext.lot
        .toPageTitle()
        .should.equal(
          'Auction Result for "MADONNA PAINTING" (1985) | Lempertz, May 23, 2012 | Artsy'
        )
      testContext.lot.set({ artist_name: "Foo Bar" })
      testContext.lot
        .toPageTitle(artist)
        .should.equal(
          'Auction Result for "MADONNA PAINTING" (1985) by Foo Bar | Lempertz, May 23, 2012 | Artsy'
        )
    })
  })

  describe("#toPageDescription", () => {
    it("returns a string usable for the page description", () => {
      testContext.lot
        .toPageDescription()
        .should.equal(
          "Screenprint on canvas, 20.1 × 15.9 in. Estimate €120,000 - 160,000 from Lempertz on May 23, 2012. Find auction estimate and sale price, and research more auction results from top auction houses."
        )
    })
  })

  describe("#hasDimensions", () => {
    it("returns true if there is any dimension attributes present", () => {
      testContext.lot.hasDimensions().should.be.ok()
      testContext.lot.unset("dimensions")
      testContext.lot.hasDimensions().should.not.be.ok()
      testContext.lot.set("dimensions", "foobar")
      testContext.lot.hasDimensions().should.not.be.ok()
      testContext.lot.set("dimensions", { in: "foo" })
      testContext.lot.hasDimensions().should.be.ok()
      testContext.lot.set("dimensions", { cm: "foo" })
      testContext.lot.hasDimensions().should.be.ok()
    })
  })
})
