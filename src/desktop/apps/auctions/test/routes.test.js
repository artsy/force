/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Q = require("bluebird-q")
const sinon = require("sinon")
const moment = require("moment")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Auction = require("../../../models/auction")
const CurrentUser = require("../../../models/current_user")
const rewire = require("rewire")
const routes = rewire("../routes")

describe("Auctions routes", function () {
  beforeEach(() => sinon.stub(Backbone, "sync").returns(Q.resolve()))

  afterEach(() => Backbone.sync.restore())

  return describe("#index", function () {
    before(function () {
      return (this.sales = [
        (this.sneakyOpenSale = new Auction(
          fabricate("sale", {
            is_auction: false,
            auction_state: "open",
            id: "sneaky-open-sale",
            eligible_sale_artworks_count: 1,
          })
        )),
        (this.sneakyPastSale = new Auction(
          fabricate("sale", {
            is_auction: false,
            auction_state: "closed",
            id: "sneaky-past-sale",
            eligible_sale_artworks_count: 1,
          })
        )),
        (this.openAuction = new Auction(
          fabricate("sale", {
            is_auction: true,
            auction_state: "open",
            id: "open-sale",
            eligible_sale_artworks_count: 1,
          })
        )),
        (this.closedAuction = new Auction(
          fabricate("sale", {
            is_auction: true,
            auction_state: "closed",
            id: "closed-sale",
            eligible_sale_artworks_count: 1,
          })
        )),
        (this.middlePreviewAuction = new Auction(
          fabricate("sale", {
            is_auction: true,
            auction_state: "preview",
            id: _.uniqueId("preview-sale"),
            eligible_sale_artworks_count: 1,
            start_at: moment().add(3, "days").format(),
          })
        )),
        (this.soonestPreviewAuction = new Auction(
          fabricate("sale", {
            is_auction: true,
            auction_state: "preview",
            id: _.uniqueId("preview-sale"),
            eligible_sale_artworks_count: 1,
            start_at: moment().add(1, "days").format(),
          })
        )),
        (this.latestPreviewAuction = new Auction(
          fabricate("sale", {
            is_auction: true,
            auction_state: "preview",
            id: _.uniqueId("preview-sale"),
            eligible_sale_artworks_count: 1,
            start_at: moment().add(20, "days").format(),
          })
        )),
        (this.previewPromoAuction = new Auction(
          fabricate("sale", {
            is_auction: false,
            auction_state: "preview",
            id: "preview-promo-sale",
            eligible_sale_artworks_count: 1,
            sale_type: "auction promo",
          })
        )),
        (this.openPromoAuction = new Auction(
          fabricate("sale", {
            is_auction: false,
            auction_state: "open",
            id: "promo-sale",
            eligible_sale_artworks_count: 1,
            sale_type: "auction promo",
          })
        )),
        (this.closedPromoAuction = new Auction(
          fabricate("sale", {
            is_auction: false,
            auction_state: "closed",
            id: "closed-promo-sale",
            eligible_sale_artworks_count: 1,
            sale_type: "auction promo",
          })
        )),
      ])
    })

    describe("without user", function () {
      before(function () {
        return (this.res = { render: sinon.stub(), locals: { sd: {} } })
      })

      return it("fetches the relevant auction data and renders the index template", function (done) {
        routes.index({}, this.res)

        Backbone.sync.args[0][1].url.should.containEql("/api/v1/sales")
        Backbone.sync.args[0][2].data.should.eql({
          published: true,
          size: 100,
          sort: "-timely_at,name",
        })
        Backbone.sync.args[0][2].success(this.sales)

        Backbone.sync.callCount.should.equal(1)

        return _.defer(() =>
          _.defer(() => {
            this.res.render.args[0][0].should.equal("index")
            _.pluck(this.res.render.args[0][1].pastAuctions, "id").should.eql([
              this.closedAuction.id,
              this.closedPromoAuction.id,
            ])
            _.pluck(
              this.res.render.args[0][1].currentAuctions,
              "id"
            ).should.eql([this.openAuction.id])
            _.pluck(
              this.res.render.args[0][1].upcomingAuctions,
              "id"
            ).should.eql([
              this.soonestPreviewAuction.id,
              this.middlePreviewAuction.id,
              this.latestPreviewAuction.id,
            ])
            _.pluck(this.res.render.args[0][1].promoAuctions, "id").should.eql([
              this.previewPromoAuction.id,
              this.openPromoAuction.id,
            ])
            this.res.render.args[0][1].nextAuction.id.should.eql(
              this.soonestPreviewAuction.id
            )
            return done()
          })
        )
      })
    })

    return describe("with user", function () {
      before(function () {
        this.req = { user: new CurrentUser(fabricate("user")) }
        this.res = { render: sinon.stub(), locals: { sd: {} } }
        return routes.__set__("metaphysics", () =>
          Q.promise((resolve, reject) => resolve({ me: [] }))
        )
      })

      return it("fetches the relevant auction data in addition to the user bid status and renders the index template", function (done) {
        routes.index(this.req, this.res)
        Backbone.sync.args[0][2].success(this.sales)

        return _.defer(() =>
          _.defer(() => {
            // Checks to see if you are registered to bid in the upcoming sale
            Backbone.sync.args[1][2].url.should.containEql("/api/v1/me/bidders")
            Backbone.sync.args[1][2].data.sale_id.should.equal(
              this.soonestPreviewAuction.id
            )
            Backbone.sync.args[1][2].success([{}, {}])
            this.req.user.get("registered_to_bid").should.be.true()
            return done()
          })
        )
      })
    })
  })
})
