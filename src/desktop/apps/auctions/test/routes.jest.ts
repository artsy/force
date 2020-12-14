import moment from "moment"
import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
import { defer, map, uniqueId } from "lodash"
const Auction = require("../../../models/auction")
const CurrentUser = require("../../../models/current_user")
const routes = require("../routes")

describe("Auctions routes", () => {
  let sales
  let openAuction
  let closedAuction
  let middlePreviewAuction
  let latestPreviewAuction
  let soonestPreviewAuction
  let previewPromoAuction
  let openPromoAuction
  let closedPromoAuction

  beforeEach(() => {
    Backbone.sync = jest.fn().mockReturnValue(Promise.resolve())
  })

  describe("#index", () => {
    beforeAll(() => {
      sales = [
        (openAuction = new Auction(
          fabricate("sale", {
            auction_state: "open",
            eligible_sale_artworks_count: 1,
            id: "open-sale",
            is_auction: true,
          })
        )),
        (closedAuction = new Auction(
          fabricate("sale", {
            auction_state: "closed",
            eligible_sale_artworks_count: 1,
            id: "closed-sale",
            is_auction: true,
          })
        )),
        (middlePreviewAuction = new Auction(
          fabricate("sale", {
            auction_state: "preview",
            eligible_sale_artworks_count: 1,
            id: uniqueId("preview-sale"),
            is_auction: true,
            start_at: moment().add(3, "days").format(),
          })
        )),
        (soonestPreviewAuction = new Auction(
          fabricate("sale", {
            auction_state: "preview",
            eligible_sale_artworks_count: 1,
            id: uniqueId("preview-sale"),
            is_auction: true,
            start_at: moment().add(1, "days").format(),
          })
        )),
        (latestPreviewAuction = new Auction(
          fabricate("sale", {
            auction_state: "preview",
            eligible_sale_artworks_count: 1,
            id: uniqueId("preview-sale"),
            is_auction: true,
            start_at: moment().add(20, "days").format(),
          })
        )),
        (previewPromoAuction = new Auction(
          fabricate("sale", {
            auction_state: "preview",
            eligible_sale_artworks_count: 1,
            id: "preview-promo-sale",
            is_auction: false,
            sale_type: "auction promo",
          })
        )),
        (openPromoAuction = new Auction(
          fabricate("sale", {
            auction_state: "open",
            eligible_sale_artworks_count: 1,
            id: "promo-sale",
            is_auction: false,
            sale_type: "auction promo",
          })
        )),
        (closedPromoAuction = new Auction(
          fabricate("sale", {
            auction_state: "closed",
            eligible_sale_artworks_count: 1,
            id: "closed-promo-sale",
            is_auction: false,
            sale_type: "auction promo",
          })
        )),
      ]
    })

    describe("without user", () => {
      let res
      beforeAll(() => {
        res = { locals: { sd: {} }, render: jest.fn() }
      })

      it("fetches the relevant auction data and renders the index template", async done => {
        await routes.index({}, res)
        Backbone.sync.mock.calls[0][1].url.should.containEql("/api/v1/sales")
        Backbone.sync.mock.calls[0][2].data.should.eql({
          published: true,
          size: 100,
          sort: "-timely_at,name",
        })
        await Backbone.sync.mock.calls[0][2].success(sales)
        expect(Backbone.sync).toBeCalledTimes(1)

        defer(() => {
          res.render.mock.calls[0][0].should.equal("index")
          map(res.render.mock.calls[0][1].pastAuctions, "id").should.eql([
            closedAuction.id,
            closedPromoAuction.id,
          ])
          map(res.render.mock.calls[0][1].currentAuctions, "id").should.eql([
            openAuction.id,
          ])
          map(res.render.mock.calls[0][1].upcomingAuctions, "id").should.eql([
            soonestPreviewAuction.id,
            middlePreviewAuction.id,
            latestPreviewAuction.id,
          ])
          map(res.render.mock.calls[0][1].promoAuctions, "id").should.eql([
            previewPromoAuction.id,
            openPromoAuction.id,
          ])
          res.render.mock.calls[0][1].nextAuction.id.should.eql(
            soonestPreviewAuction.id
          )
          done()
        })
      })
    })

    describe("with user", () => {
      let res
      let req
      beforeAll(() => {
        req = { user: new CurrentUser(fabricate("user")) }
        res = { locals: { sd: {} }, render: jest.fn() }
      })

      it("fetches the relevant auction data in addition to the user bid status and renders the index template", function (done) {
        routes.index(req, res)
        Backbone.sync.mock.calls[0][2].success(sales)

        defer(() =>
          defer(() => {
            // Checks to see if you are registered to bid in the upcoming sale
            Backbone.sync.mock.calls[1][2].url.should.containEql(
              "/api/v1/me/bidders"
            )
            Backbone.sync.mock.calls[1][2].data.sale_id.should.equal(
              soonestPreviewAuction.id
            )
            Backbone.sync.mock.calls[1][2].success([{}, {}])
            req.user.get("registered_to_bid").should.be.true()
            done()
          })
        )
      })
    })
  })
})
