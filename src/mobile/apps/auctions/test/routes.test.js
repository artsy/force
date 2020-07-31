/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Sale = require("../../../models/sale")
const routes = require("../routes")
const moment = require("moment")

describe("Auctions routes", function () {
  beforeEach(() => sinon.stub(Backbone, "sync"))

  afterEach(() => Backbone.sync.restore())

  describe("#index", function () {
    beforeEach(function () {
      this.sales = [
        (this.invalidSale = new Sale(
          fabricate("sale", {
            eligible_sale_artworks_count: 0,
            auction_state: "open",
            id: "invalid-sale",
          })
        )),
        (this.openSale = new Sale(
          fabricate("sale", {
            auction_state: "open",
            id: "open-sale",
            eligible_sale_artworks_count: 1,
          })
        )),
        (this.closedSale = new Sale(
          fabricate("sale", {
            auction_state: "closed",
            id: "closed-sale",
            eligible_sale_artworks_count: 1,
          })
        )),
        (this.previewSale = new Sale(
          fabricate("sale", {
            auction_state: "preview",
            id: "preview-sale",
            eligible_sale_artworks_count: 1,
          })
        )),
      ]
      return (this.res = {
        render: sinon.stub(),
        locals: { sd: {}, asset() {} },
      })
    })

    return it("fetches the relevant auction data and renders the index template", function (done) {
      routes.index({}, this.res)
      Backbone.sync.args[0][1].url.should.containEql("/api/v1/sales")
      Backbone.sync.args[0][2].data.should.eql({
        is_auction: true,
        published: true,
        size: 100,
        sort: "-timely_at,name",
      })
      Backbone.sync.args[0][2].success(this.sales)
      Backbone.sync.callCount.should.equal(5)
      Backbone.sync.args[1][1]
        .url()
        .should.containEql("/api/v1/sale/invalid-sale/sale_artworks")
      Backbone.sync.args[1][2].data.should.eql({ size: 5 })
      return _.defer(() =>
        _.defer(() => {
          this.res.locals.sd.CURRENT_AUCTIONS.should.eql([this.openSale])
          this.res.locals.sd.ARTWORK_DIMENSIONS.should.eql([
            { id: "open-sale", dimensions: [] },
            { id: "closed-sale", dimensions: [] },
          ])
          this.res.render.args[0][0].should.equal("index")
          this.res.render.args[0][1].pastAuctions.should.eql([this.closedSale])
          this.res.render.args[0][1].currentAuctions.should.eql([this.openSale])
          this.res.render.args[0][1].upcomingAuctions.should.eql([
            this.previewSale,
          ])
          return done()
        })
      )
    })
  })

  return describe("#index with sort", function () {
    beforeEach(function () {
      this.sales = [
        (this.invalidSale = new Sale(
          fabricate("sale", {
            eligible_sale_artworks_count: 0,
            auction_state: "open",
            id: "invalid-sale",
          })
        )),
        (this.openSale = new Sale(
          fabricate("sale", {
            auction_state: "open",
            id: "open-sale",
            eligible_sale_artworks_count: 1,
            end_at: moment().add(5, "days"),
          })
        )),
        (this.openLiveSale = new Sale(
          fabricate("sale", {
            auction_state: "open",
            id: "open-live-sale",
            eligible_sale_artworks_count: 1,
            end_at: moment().add(12, "days"),
            live_start_at: moment().add(7, "days"),
          })
        )),
        (this.anotherOpenSale = new Sale(
          fabricate("sale", {
            auction_state: "open",
            id: "another-open-sale",
            eligible_sale_artworks_count: 1,
            end_at: moment().add(10, "days"),
          })
        )),
      ]
      return (this.res = {
        render: sinon.stub(),
        locals: { sd: {}, asset() {} },
      })
    })

    return it("sorts the open auctions by live_start_at or end_at", function (done) {
      routes.index({}, this.res)
      Backbone.sync.args[0][1].url.should.containEql("/api/v1/sales")
      Backbone.sync.args[0][2].data.should.eql({
        is_auction: true,
        published: true,
        size: 100,
        sort: "-timely_at,name",
      })
      Backbone.sync.args[0][2].success(this.sales)
      Backbone.sync.callCount.should.equal(5)
      Backbone.sync.args[1][1]
        .url()
        .should.containEql("/api/v1/sale/invalid-sale/sale_artworks")
      Backbone.sync.args[1][2].data.should.eql({ size: 5 })
      return _.defer(() =>
        _.defer(() => {
          this.res.locals.sd.CURRENT_AUCTIONS.should.eql([
            this.openSale,
            this.openLiveSale,
            this.anotherOpenSale,
          ])
          this.res.locals.sd.ARTWORK_DIMENSIONS.should.eql([
            { id: "open-sale", dimensions: [] },
            { id: "open-live-sale", dimensions: [] },
            { id: "another-open-sale", dimensions: [] },
          ])
          this.res.render.args[0][0].should.equal("index")
          this.res.render.args[0][1].pastAuctions.should.eql([])
          this.res.render.args[0][1].currentAuctions.should.eql([
            this.openSale,
            this.openLiveSale,
            this.anotherOpenSale,
          ])
          this.res.render.args[0][1].upcomingAuctions.should.eql([])
          return done()
        })
      )
    })
  })
})
