/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const template = require("jade").compileFile(
  require.resolve("../template.jade")
)
const cheerio = require("cheerio")
const moment = require("moment")
const { getLiveAuctionUrl } = require("../../../../utils/domain/auctions/urls")

const fixture = () => [
  {
    id: "56ba482e8b3b8167d7000000",
    sale_artwork: {
      id: "ed-ruscha-cockroaches-from-insects-portfolio",
      lot_label: "10",
      counts: {
        bidder_positions: 5,
      },
      highest_bid: {
        amount: "$4,000",
      },
      sale_id: "mauction-evening-sale",
      sale: {
        end_at: "2016-10-31T04:28:00+00:00",
        live_start_at: null,
        is_live_open: false,
        is_closed: false,
      },
      artwork: {
        image: {
          url:
            "https://d32dm0rphc51dk.cloudfront.net/0-AL7CEZ5IDjCWdNxwjmBg/tall.jpg",
        },
        href: "/artwork/ed-ruscha-cockroaches-from-insects-portfolio",
        artist: {
          name: "Ed Ruscha",
        },
      },
    },
  },
]

describe("My Active Bids template", function () {
  beforeEach(function () {
    return (this.locals = {
      myActiveBids: fixture(),
      viewHelpers: { getLiveAuctionUrl },
      accounting: {
        formatMoney(s) {
          return s
        },
      },
    })
  })

  it(`renders highest bid if user is leading bidder and reserve met\
bidder position match`, function () {
    this.locals.myActiveBids[0].is_leading_bidder = true
    this.locals.myActiveBids[0].sale_artwork.reserve_status = "reserve_met"
    const $ = cheerio.load(template(this.locals))
    $(".bid-status").text().should.containEql("Highest Bid")
    return $(".bid-status__is-winning").length.should.equal(1)
  })

  it(`renders highest bid if leading bidder and reserve not met \
bidder position do not match`, function () {
    this.locals.myActiveBids[0].is_leading_bidder = true
    this.locals.myActiveBids[0].sale_artwork.reserve_status = "reserve_not_met"
    const $ = cheerio.load(template(this.locals))
    $(".bid-status").text().should.containEql("Highest Bid")
    return $(".bid-status__is-winning-reserve-not-met").length.should.equal(1)
  })

  it("renders losing if not leading bidder & reserve not met", function () {
    this.locals.myActiveBids[0].is_leading_bidder = false
    this.locals.myActiveBids[0].sale_artwork.reserve_status = "reserve_not_met"
    const $ = cheerio.load(template(this.locals))
    $(".bid-status").text().should.containEql("Outbid")
    return $(".bid-status__is-losing").length.should.equal(1)
  })

  it("renders losing if not leading bidder & reserve is met", function () {
    this.locals.myActiveBids[0].is_leading_bidder = false
    this.locals.myActiveBids[0].sale_artwork.reserve_status = "reserve_met"
    const $ = cheerio.load(template(this.locals))
    $(".bid-status").text().should.containEql("Outbid")
    return $(".bid-status__is-losing").length.should.equal(1)
  })

  describe("live sale", () =>
    it("does not render bid status for open live sale", function () {
      this.locals.myActiveBids[0].sale_artwork.sale.live_start_at = moment()
        .subtract(1, "day")
        .format()
      this.locals.myActiveBids[0].sale_artwork.sale.is_live_open = true
      this.locals.myActiveBids[0].sale_artwork.sale.end_at = null
      const $ = cheerio.load(template(this.locals))
      $(".bid-status").length.should.eql(0)
      $(".my-active-bids-item-details--hide-bid").length.should.eql(1)
      $(".my-active-bids-bid-live-button").length.should.eql(1)
      $(".my-active-bids-bid-live-button").text().should.containEql("Bid Live")
      return $(".my-active-bids-bid-live-button")
        .attr("href")
        .should.containEql("mauction-evening-sale/login")
    }))

  return describe("closed", () =>
    it("does not render bid status when closed", function () {
      this.locals.myActiveBids[0].sale_artwork.sale.live_start_at = moment()
        .subtract(1, "day")
        .format()
      this.locals.myActiveBids[0].sale_artwork.sale.is_live_open = false
      this.locals.myActiveBids[0].sale_artwork.sale.is_closed = true
      const $ = cheerio.load(template(this.locals))
      $(".bid-status").length.should.eql(0)
      $(".my-active-bids-bid-live-button").length.should.eql(1)
      $(".my-active-bids-bid-live-button").text().should.containEql("View Lot")
      return $(".my-active-bids-bid-live-button")
        .attr("href")
        .should.containEql(
          "/artwork/ed-ruscha-cockroaches-from-insects-portfolio"
        )
    }))
})
