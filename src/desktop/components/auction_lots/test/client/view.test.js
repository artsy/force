/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const Artist = require("../../../../models/artist")
const AuctionLot = require("../../../../models/auction_lot")
const AuctionLots = require("../../../../collections/auction_lots")
const Artworks = require("../../../../collections/artworks")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

xdescribe("Auction results client-side code", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  before(function (done) {
    this.lot = new AuctionLot(fabricate("auction_result"))
    this.artist = new Artist(fabricate("artist"))
    this.artworks = new Artworks([fabricate("artwork")])
    this.auctionLots = new AuctionLots([this.lot], {
      state: { totalRecords: 1 },
    })

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
        const AuctionResultsView = benv.requireWithJadeify(
          resolve(__dirname, "../../client/view"),
          []
        )

        AuctionResultsView.__set__("zoom", (this.zoomStub = sinon.stub()))
        AuctionResultsView.__set__("FillwidthView", Backbone.View)
        AuctionResultsView.__get__(
          "FillwidthView"
        ).prototype.hideSecondRow = this.hideSecondRowStub = sinon.stub()
        AuctionResultsView.__set__(
          "mediator",
          (this.mediatorStub = { trigger: sinon.stub() })
        )
        done()

        return (this.view = new AuctionResultsView({
          el: $("body"),
          model: new Artist(fabricate("artist")),
        }))
      }
    )
  })

  describe("#zoomImage", function () {
    it("should instantiate a new zoom when a thumbnail is clicked", function () {
      this.zoomStub.called.should.be.false()
      this.view.$(".auction-lot-image-zoom").click()
      return this.zoomStub.called.should.be.true()
    })

    return it("passes the original sized image to the zoom", function () {
      this.view.$(".auction-lot-image-zoom").click()
      return this.zoomStub.args[0][0].should.equal(
        this.auctionLots.at(0).imageUrl("original")
      )
    })
  })

  return describe("#onRowClick", () =>
    it("intercepts any clicks to the row if the user is logged out", function () {
      this.mediatorStub.trigger.called.should.be.false()
      this.view.user = null
      this.view.$(".auction-lot").first().click()
      this.mediatorStub.trigger.args[0][0].should.equal("open:auth")
      this.mediatorStub.trigger.args[0][1].mode.should.equal("signup")
      this.view.$(".auction-lot").first().click()
      this.mediatorStub.trigger.calledTwice.should.be.true()
      // 'logged in'
      this.view.user = "existy"
      this.view.$(".auction-lot").first().click()
      return this.mediatorStub.trigger.calledThrice.should.be.false()
    }))
})
