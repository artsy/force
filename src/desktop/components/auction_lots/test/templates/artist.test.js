/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Artist = require("../../../../models/artist")
const AuctionLots = require("../../../../collections/auction_lots")
const CurrentUser = require("../../../../models/current_user")

const render = function (templateName) {
  const filename = path.resolve(
    __dirname,
    `../../templates/${templateName}.jade`
  )
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Artist auction lots template", function () {
  describe("Sparse results", function () {
    beforeEach(function () {
      this.artist = new Artist(fabricate("artist"))
      this.auctionLots = new AuctionLots(
        _.times(10, () => fabricate("auction_result")),
        { state: { totalRecords: 10 } }
      )
      return (this.template = render("artist")({
        sd: {},
        asset() {},
        artist: this.artist,
        auctionLots: this.auctionLots,
      }))
    })

    it("Shows only the number of results and not the number of pages", function () {
      this.template.should.containEql("10 Results")
      return this.template.should.not.containEql("Page 1 of")
    })

    return it("Does *not* render the pagination nav", function () {
      return this.template.should.not.containEql("pagination")
    })
  })

  describe("Dense results", function () {
    beforeEach(function () {
      this.artist = new Artist(fabricate("artist"))
      this.auctionLots = new AuctionLots(
        _.times(26, () => fabricate("auction_result")),
        { state: { totalRecords: 26 } }
      )
      return (this.template = render("artist")({
        sd: {},
        asset() {},
        artist: this.artist,
        auctionLots: this.auctionLots,
      }))
    })

    it("Shows the number of results and the number of pages", function () {
      return this.template.should.not.containEql(
        `Page 1 of ${this.auctionLots.totalPages}`
      )
    })

    return it("Renders the pagination nav", function () {
      return this.template.should.containEql("pagination")
    })
  })

  describe("Not logged in", function () {
    beforeEach(function () {
      this.artist = new Artist(fabricate("artist"))
      this.auctionLots = new AuctionLots([fabricate("auction_result")], {
        state: { totalRecords: 1 },
      })
      return (this.template = render("artist")({
        sd: {},
        asset() {},
        artist: this.artist,
        auctionLots: this.auctionLots,
      }))
    })

    return it("Displays the sign up link instead of the sale price in the sale column", function () {
      return this.template.should.containEql("Sign up to see sale price")
    })
  })

  return describe("Logged in", function () {
    beforeEach(function () {
      this.artist = new Artist(fabricate("artist"))
      this.auctionLots = new AuctionLots([fabricate("auction_result")], {
        state: { totalRecords: 1 },
      })
      this.user = new CurrentUser(fabricate("user"))
      return (this.template = render("artist")({
        sd: {},
        asset() {},
        artist: this.artist,
        auctionLots: this.auctionLots,
        user: this.user,
      }))
    })

    return it("Does not display the sign up call to action", function () {
      return this.template.should.not.containEql(
        '<a class="auction-lot-sale-signup">Sign up to see sale price</a>'
      )
    })
  })
})
