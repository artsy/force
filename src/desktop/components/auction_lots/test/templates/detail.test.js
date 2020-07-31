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
const benv = require("benv")
const { fabricate } = require("@artsy/antigravity")
const { resolve } = require("path")

const Artist = require("../../../../models/artist")
const AuctionLot = require("../../../../models/auction_lot")
const AuctionLots = require("../../../../collections/auction_lots")
const Artworks = require("../../../../collections/artworks")
const CurrentUser = require("../../../../models/current_user")

const render = function (templateName) {
  const filename = path.resolve(
    __dirname,
    `../../templates/${templateName}.jade`
  )
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Detail auction lots template", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      this.lot = new AuctionLot(fabricate("auction_result"))
      this.artist = new Artist(
        fabricate("artist", {
          published_artworks_count: 2,
          forsale_artworks_count: 1,
        })
      )
      this.artworks = new Artworks([fabricate("artwork")])
      this.auctionLots = new AuctionLots(
        _.times(3, () => new AuctionLot(fabricate("auction_result"))),
        { state: { totalRecords: 1 } }
      )

      return benv.render(
        resolve(__dirname, "../../templates/detail.jade"),
        {
          sd: {},
          lot: this.lot,
          artist: this.artist,
          artworks: this.artworks,
          auctionLots: this.auctionLots,
          asset() {},
        },
        () => {
          this.$template = $("body")
          this.template = this.$template.html()

          return done()
        }
      )
    })
  })

  after(() => benv.teardown())

  it("has a single h1 tag describing the artist and title", function () {
    let h1
    ;(h1 = this.$template.find("h1")).length.should.equal(1)
    return h1
      .text()
      .should.equal("Pablo Picasso, MADONNA PAINTING — Auction Result")
  })

  it("has a link to the lot on the external auction site", function () {
    return this.$template
      .find(".ard-external")
      .text()
      .should.containEql("Visit the lot on lempertz-online.de")
  })

  it("has an h3 tag describing the artist available/reference works", function () {
    return this.$template
      .find("h3.ara-available-works-count")
      .text()
      .should.equal("1 available work & 1 reference work")
  })

  return it("displays more auction results", function () {
    const $results = this.$template.find(".auction-result-more-results")
    $results
      .find("h2")
      .text()
      .should.equal("More auction results for Pablo Picasso")
    return $results.find("tbody > tr").length.should.equal(3)
  })
})
