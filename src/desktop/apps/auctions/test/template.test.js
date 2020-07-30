/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Auction = require("../../../models/auction")
const moment = require("moment")

describe("Auctions template", function () {
  before(function () {
    let auctions
    return (auctions = [
      (this.openAuction = new Auction(
        fabricate("sale", {
          auction_state: "open",
          id: "open-auction",
          end_at: moment().add(2, "days"),
        })
      )),
      (this.closedAuction = new Auction(
        fabricate("sale", { auction_state: "closed", id: "closed-auction" })
      )),
      (this.previewAuction = new Auction(
        fabricate("sale", { auction_state: "preview", id: "preview-auction" })
      )),
      (this.promoAuction = new Auction(
        fabricate("sale", {
          auction_state: "open",
          id: "promo-sale",
          eligible_sale_artworks_count: 1,
          sale_type: "auction promo",
        })
      )),
      (this.openLiveAuction = new Auction(
        fabricate("sale", {
          auction_state: "open",
          id: "live-auction",
          live_start_at: moment().subtract(1, "days"),
        })
      )),
    ])
  })

  describe("with at least one of every kind of auction", function () {
    before(function (done) {
      return benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          jQuery: benv.require("jquery"),
        })
        return benv.render(
          resolve(__dirname, "../templates/index.jade"),
          {
            sd: {},
            asset() {},
            pastAuctions: [this.closedAuction],
            currentAuctions: [this.openAuction, this.openLiveAuction],
            upcomingAuctions: [this.previewAuction],
            promoAuctions: [],
            nextAuction: this.previewAuction,
          },
          () => done()
        )
      })
    })

    after(() => benv.teardown())

    it("renders correctly", function () {
      $(".auctions-placeholder").length.should.eql(0)
      // Current ("Featured") auctions
      $(".af-name").length.should.eql(2)
      // Past auctions
      $(".leader-dots-list-item").length.should.eql(1)
      // Upcoming auctions
      $(".ap-upcoming-item").length.should.eql(1)
      // How Auctions Work
      $(".auction-cta-group").length.should.eql(3)
      // Live auction
      return $(".af-live-header").length.should.eql(1)
    })

    return it("shows the correct clocks", () =>
      $($(".af-sale-time")[1]).text().should.eql("Live bidding now open"))
  })

  return describe("without current auctions", function () {
    before(function (done) {
      return benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          jQuery: benv.require("jquery"),
        })
        benv.render(resolve(__dirname, "../templates/index.jade"), {
          sd: {},
          asset() {},
          pastAuctions: [this.closedAuction],
          currentAuctions: [],
          upcomingAuctions: [this.previewAuction],
          promoAuctions: [],
          nextAuction: this.previewAuction,
        })
        return done()
      })
    })

    after(() => benv.teardown())

    return it("renders correctly", function () {
      $(".auctions-placeholder").length.should.eql(1)
      // Current ("Featured") auctions
      $(".ap-featured-item").length.should.eql(0)
      // Upcoming & Past auctions
      return $(".auctions-list--upcoming").length.should.eql(1)
    })
  })
})
