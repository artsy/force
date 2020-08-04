/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Auctions = require("../../collections/auctions")
const Auction = require("../../models/auction")
const { fabricate } = require("@artsy/antigravity")
const moment = require("moment")

describe("Auctions", function () {
  beforeEach(function () {
    return (this.auctions = new Auctions())
  })

  return describe("#opens", function () {
    it("if there are only online auctions, just sorts by end_at", function () {
      const sothebys = new Auction(
        fabricate("sale", {
          id: "input-slash-output",
          is_auction: true,
          auction_state: "open",
          end_at: moment().add(10, "days"),
        })
      )

      const somethingelse = new Auction(
        fabricate("sale", {
          id: "cabbies-cool-auction",
          is_auction: true,
          auction_state: "open",
          end_at: moment().add(5, "days"),
        })
      )

      this.auctions.add([sothebys, somethingelse])
      this.auctions.opens()[0].id.should.equal("cabbies-cool-auction")
      return this.auctions.opens()[1].id.should.equal("input-slash-output")
    })

    it("if there are only live auctions, just sorts by live_start_at", function () {
      const sothebys = new Auction(
        fabricate("sale", {
          id: "input-slash-output",
          is_auction: true,
          auction_state: "open",
          live_start_at: moment().add(10, "days"),
        })
      )

      const somethingelse = new Auction(
        fabricate("sale", {
          id: "cabbies-cool-auction",
          is_auction: true,
          auction_state: "open",
          live_start_at: moment().add(5, "days"),
        })
      )

      this.auctions.add([sothebys, somethingelse])
      this.auctions.opens()[0].id.should.equal("cabbies-cool-auction")
      return this.auctions.opens()[1].id.should.equal("input-slash-output")
    })

    return it("if there are online and live auctions, sorts by both end_at and live_start_at", function () {
      const sothebys = new Auction(
        fabricate("sale", {
          id: "input-slash-output",
          is_auction: true,
          auction_state: "open",
          live_start_at: moment().add(10, "days"),
        })
      )

      const somethingelse = new Auction(
        fabricate("sale", {
          id: "cabbies-cool-auction",
          is_auction: true,
          auction_state: "open",
          live_start_at: moment().add(5, "days"),
        })
      )

      const anotherauction = new Auction(
        fabricate("sale", {
          id: "cool-catty-auction",
          is_auction: true,
          auction_state: "open",
          end_at: moment().add(7, "days"),
        })
      )

      this.auctions.add([sothebys, somethingelse, anotherauction])
      this.auctions.opens()[0].id.should.equal("cabbies-cool-auction")
      this.auctions.opens()[1].id.should.equal("cool-catty-auction")
      return this.auctions.opens()[2].id.should.equal("input-slash-output")
    })
  })
})
