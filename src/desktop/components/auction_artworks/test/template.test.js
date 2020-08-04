/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const $ = require("cheerio")
const jade = require("jade")
const { fabricate } = require("@artsy/antigravity")
const Auction = require("../../../models/auction")
const Artwork = require("../../../models/artwork")

const templates = {
  grid: jade.compileFile(require.resolve("../templates/artwork/grid.jade")),
  list: jade.compileFile(require.resolve("../templates/artwork/list.jade")),
}

describe("templates", function () {
  beforeEach(function () {
    this.artwork = new Artwork(fabricate("artwork"))
    return (this.auction = new Auction(fabricate("sale", { is_auction: true })))
  })

  describe("biddable artwork", function () {
    describe("open auction", function () {
      beforeEach(function () {
        this.auction.set({ auction_state: "open" })
        this.artwork.set({
          acquireable: false,
          sold: false,
          sale_artwork: {
            highest_bid_amount_cents: 100000,
            display_highest_bid_amount_dollars: "$1,000",
          },
        })
        return (this.data = _.extend(
          {},
          { artwork: this.artwork, auction: this.auction },
          this.artwork.related()
        ))
      })

      describe("list", () =>
        it("renders correctly", function () {
          const $template = $(templates.list(this.data))
          $template
            .find(".ala-bid-status strong")
            .text()
            .should.equal("Current Bid: ")
          $template.find(".ala-current-bid").text().should.equal("$1,000")
          $template.find(".ala-bid-count").text().should.equal("")
          return $template.find(".js-bid-button").text().should.equal("Bid")
        }))

      return describe("grid", () =>
        it("renders correctly", function () {
          const $template = $(templates.grid(this.data))
          $template.find(".aabs-label").text().should.equal("Current Bid ")
          $template.find(".aabs-price").first().text().should.equal("$1,000") // `last` contains a nbsp; for spacing hack
          return $template.find(".js-bid-button").text().should.equal("Bid")
        }))
    })

    return describe("closed auction", function () {
      beforeEach(function () {
        this.auction.set({ auction_state: "closed" })
        this.artwork.set({
          acquireable: false,
          sold: false,
          sale_artwork: { highest_bid_amount_cents: 100000 },
        })
        return (this.data = _.extend(
          {},
          { artwork: this.artwork, auction: this.auction },
          this.artwork.related()
        ))
      })

      describe("list", () =>
        it("renders correctly", function () {
          const $template = $(templates.list(this.data))
          $template.find(".ala-bid-status").should.have.lengthOf(0)
          $template.find(".ala-bid-count").should.have.lengthOf(0)
          return $template
            .find(".avant-garde-button")
            .text()
            .should.equal("Auction Closed")
        }))

      return describe("grid", () =>
        it("renders correctly", function () {
          const $template = $(templates.grid(this.data))
          $template.find(".aga-bid-status").length.should.equal(0)
          $template.find(".js-bid-button").should.have.lengthOf(0)
          return $template
            .find(".avant-garde-button")
            .text()
            .should.equal("Auction Closed")
        }))
    })
  })

  describe("auction promo", function () {
    describe("preview state", function () {
      beforeEach(function () {
        this.auction.set({
          auction_state: "preview",
          sale_type: "auction promo",
        })
        this.auction.isAuctionPromo().should.be.true()
        return (this.data = _.extend(
          {},
          { artwork: this.artwork, auction: this.auction },
          this.artwork.related()
        ))
      })

      describe("list", () =>
        it("renders correctly", function () {
          const $template = $(templates.list(this.data))
          $template.find(".ala-bid-status").should.have.lengthOf(0)
          $template.find(".ala-bid-count").should.have.lengthOf(0)
          return $template
            .find(".js-inquiry-button")
            .text()
            .should.equal("Contact Auction House")
        }))

      return describe("grid", () =>
        it("renders correctly", function () {
          const $template = $(templates.grid(this.data))
          $template.find(".aabs-label").should.have.lengthOf(0)
          $template.find(".aabs-price").should.have.lengthOf(0)
          return $template
            .find(".js-inquiry-button")
            .text()
            .should.equal("Contact Auction House")
        }))
    })

    return describe("open or closed state", function () {
      beforeEach(function () {
        this.auction.set({ auction_state: "open", sale_type: "auction promo" })
        this.auction.isAuctionPromo().should.be.true()
        return (this.data = _.extend(
          {},
          { artwork: this.artwork, auction: this.auction },
          this.artwork.related()
        ))
      })

      describe("list", () =>
        it("renders correctly", function () {
          const $template = $(templates.list(this.data))
          $template.find(".ala-bid-status").should.have.lengthOf(0)
          $template.find(".ala-bid-count").should.have.lengthOf(0)
          return $template.find(".js-inquiry-button").should.have.lengthOf(0)
        }))

      return describe("grid", () =>
        it("renders correctly", function () {
          const $template = $(templates.grid(this.data))
          $template.find(".aabs-label").should.have.lengthOf(0)
          $template.find(".aabs-price").should.have.lengthOf(0)
          return $template.find(".js-inquiry-button").should.have.lengthOf(0)
        }))
    })
  })

  return describe("acquireable", function () {
    describe("open auction; acquireable work; not sold", function () {
      beforeEach(function () {
        this.auction.set("auction_state", "open")
        this.artwork.set({
          acquireable: true,
          sold: false,
          sale_message: "$10,000",
        })
        return (this.data = _.extend(
          {},
          { artwork: this.artwork, auction: this.auction },
          this.artwork.related()
        ))
      })

      describe("list", () =>
        it("renders correctly", function () {
          const $template = $(templates.list(this.data))
          $template.find(".ala-current-bid").text().should.equal("$10,000")
          $template.find(".ala-bid-count").text().should.equal("") // Can still bid on it
          return $template
            .find(".js-acquire-button")
            .text()
            .should.equal("Buy now")
        }))

      return describe("grid", () =>
        it("renders correctly", function () {
          const $template = $(templates.grid(this.data))
          $template
            .find(".aabs-label")
            .text()
            .should.equal("Starting Bid Buy now price")
          $template.find(".aabs-price").text().should.equal("$10,000")
          return $template
            .find(".js-acquire-button")
            .text()
            .should.equal("Buy now")
        }))
    })

    return describe("open auction; acquireable work; is sold", function () {
      beforeEach(function () {
        this.auction.set("auction_state", "open")
        this.artwork.set({
          acquireable: true,
          sold: true,
          sale_message: "$10,000",
        })
        return (this.data = _.extend(
          {},
          { artwork: this.artwork, auction: this.auction },
          this.artwork.related()
        ))
      })

      describe("list", () =>
        it("renders correctly", function () {
          const $template = $(templates.list(this.data))
          $template.find(".ala-bid-count").text().should.equal("") // Can still bid on it
          return $template
            .find(".avant-garde-button")
            .text()
            .should.equal("Sold")
        }))

      return describe("grid", () =>
        it("renders correctly", function () {
          const $template = $(templates.grid(this.data))
          $template
            .find(".aabs-label")
            .text()
            .should.equal("Starting Bid Buy now price")
          $template.find(".aabs-price").text().should.equal("Sold")
          $template.find(".js-acquire-button").should.have.lengthOf(0)
          return $template
            .find(".avant-garde-button")
            .text()
            .should.equal("Sold")
        }))
    })
  })
})
