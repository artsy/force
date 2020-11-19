import { fabricate } from "@artsy/antigravity"
import moment from "moment"
const Auctions = require("../auctions.coffee")
const Auction = require("../../models/auction.coffee")

describe("Auctions", () => {
  let auctions

  beforeEach(() => {
    auctions = new Auctions()
  })

  describe("#opens", () => {
    it("if there are only online auctions, just sorts by end_at", () => {
      const sothebys = new Auction(
        fabricate("sale", {
          auction_state: "open",
          end_at: moment().add(10, "days"),
          id: "input-slash-output",
          is_auction: true,
        })
      )

      const somethingelse = new Auction(
        fabricate("sale", {
          auction_state: "open",
          end_at: moment().add(5, "days"),
          id: "cabbies-cool-auction",
          is_auction: true,
        })
      )

      auctions.add([sothebys, somethingelse])
      auctions.opens()[0].id.should.equal("cabbies-cool-auction")
      auctions.opens()[1].id.should.equal("input-slash-output")
    })

    it("if there are only live auctions, just sorts by live_start_at", () => {
      const sothebys = new Auction(
        fabricate("sale", {
          auction_state: "open",
          id: "input-slash-output",
          is_auction: true,
          live_start_at: moment().add(10, "days"),
        })
      )

      const somethingelse = new Auction(
        fabricate("sale", {
          auction_state: "open",
          id: "cabbies-cool-auction",
          is_auction: true,
          live_start_at: moment().add(5, "days"),
        })
      )

      auctions.add([sothebys, somethingelse])
      auctions.opens()[0].id.should.equal("cabbies-cool-auction")
      auctions.opens()[1].id.should.equal("input-slash-output")
    })

    it("if there are online and live auctions, sorts by both end_at and live_start_at", () => {
      const sothebys = new Auction(
        fabricate("sale", {
          auction_state: "open",
          id: "input-slash-output",
          is_auction: true,
          live_start_at: moment().add(10, "days"),
        })
      )

      const somethingelse = new Auction(
        fabricate("sale", {
          auction_state: "open",
          id: "cabbies-cool-auction",
          is_auction: true,
          live_start_at: moment().add(5, "days"),
        })
      )

      const anotherauction = new Auction(
        fabricate("sale", {
          auction_state: "open",
          end_at: moment().add(7, "days"),
          id: "cool-catty-auction",
          is_auction: true,
        })
      )

      auctions.add([sothebys, somethingelse, anotherauction])
      auctions.opens()[0].id.should.equal("cabbies-cool-auction")
      auctions.opens()[1].id.should.equal("cool-catty-auction")
      auctions.opens()[2].id.should.equal("input-slash-output")
    })
  })
})
