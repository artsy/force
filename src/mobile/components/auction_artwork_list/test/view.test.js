/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const Backbone = require("backbone")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Auction = require("../../../models/sale")
const Artworks = require("../../../collections/artworks")
const AuctionArtworkListView = benv.requireWithJadeify(
  resolve(__dirname, "../view"),
  ["template"]
)

describe("AuctionArtworkListView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.auction = new Auction(fabricate("sale", { is_auction: true }))
    this.artworks = new Artworks([
      fabricate("artwork", {
        id: "three-bids",
        sale_artwork: { bidder_positions_count: 3 },
        artist: { sortable_id: "z" },
      }),
      fabricate("artwork", {
        id: "one-bid",
        sale_artwork: { bidder_positions_count: 1 },
        artist: { sortable_id: "a" },
      }),
    ])
    this.view = new AuctionArtworkListView({
      model: this.auction,
      collection: this.artworks,
    })
    return this.view.render()
  })

  it("renders correctly", function () {
    return this.view.$(".aal-amount").text().should.equal("2 Lots")
  })

  it("does not render bid number if the auction is closed", function () {
    this.view.model.isClosed = () => true
    this.view.render()
    return this.view.$(".aali-bid-count").length.should.not.be.above(0)
  })

  return it("handles sorts", function () {
    this.view.state.set("sort", "name_asc")
    this.view
      .$(".auction-artwork-list-item")
      .first()
      .attr("href")
      .should.containEql("one-bid")
    this.view.state.set("sort", "bids_desc")
    this.view
      .$(".auction-artwork-list-item")
      .first()
      .attr("href")
      .should.containEql("three-bids")
    this.view.state.set("sort", "bids_asc")
    return this.view
      .$(".auction-artwork-list-item")
      .first()
      .attr("href")
      .should.containEql("one-bid")
  })
})
