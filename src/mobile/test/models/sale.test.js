/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const moment = require("moment")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Sale = require("../../models/sale")

describe("Sale", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.sale = new Sale(
      fabricate("sale", { id: "whtney-art-party", auction_state: "open" })
    ))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#fetchArtworks", () =>
    it("fetches the sale artworks", function () {
      this.sale.fetchArtworks()
      return Backbone.sync.args[0][1]
        .url()
        .should.containEql("/api/v1/sale/whtney-art-party/sale_artworks")
    }))

  describe("#registerUrl", function () {
    it("points to the secure auction registration page")
    return it("points to the signup page when not logged in")
  })

  describe("#calculateOffsetTimes", function () {
    describe("client time preview", function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers()
        return this.sale.set({
          is_auction: true,
          start_at: moment().add(1, "minutes").format(),
          end_at: moment().add(3, "minutes").format(),
        })
      })

      afterEach(function () {
        return this.clock.restore()
      })

      it("reflects server preview state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({ iso8601: moment().format() })
        this.sale
          .get("offsetStartAtMoment")
          .isSame(moment(this.sale.get("start_at")))
          .should.be.ok()
        this.sale
          .get("offsetEndAtMoment")
          .isSame(moment(this.sale.get("end_at")))
          .should.be.ok()
        return this.sale.get("clockState").should.equal("preview")
      })

      it("reflects server open state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add(2, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .isSame(moment(this.sale.get("start_at")).subtract(2, "minutes"))
          .should.be.ok()
        this.sale
          .get("offsetEndAtMoment")
          .isSame(moment(this.sale.get("end_at")).subtract(2, "minutes"))
          .should.be.ok()
        return this.sale.get("clockState").should.equal("open")
      })

      return it("reflects server closed state", function () {
        this.sale.set({ auction_state: "closed" })
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add(4, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .isSame(moment(this.sale.get("start_at")).subtract(4, "minutes"))
          .should.be.ok()
        this.sale
          .get("offsetEndAtMoment")
          .isSame(moment(this.sale.get("end_at")).subtract(4, "minutes"))
          .should.be.ok()
        return this.sale.get("clockState").should.equal("closed")
      })
    })

    describe("client time open", function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers()
        this.sale.set({
          is_auction: true,
          start_at: moment().add(1, "minutes").format(),
          end_at: moment().add(3, "minutes").format(),
        })
        return this.clock.tick(120000)
      })

      afterEach(function () {
        return this.clock.restore()
      })

      it("reflects server preview state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().subtract(2, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .isSame(moment(this.sale.get("start_at")).add(2, "minutes"))
          .should.be.ok()
        this.sale
          .get("offsetEndAtMoment")
          .isSame(moment(this.sale.get("end_at")).add(2, "minutes"))
          .should.be.ok()
        return this.sale.get("clockState").should.equal("preview")
      })

      it("reflects server open state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({ iso8601: moment().format() })
        this.sale.get("clockState").should.equal("open")
        this.sale
          .get("offsetStartAtMoment")
          .isSame(moment(this.sale.get("start_at")))
          .should.be.ok()
        return this.sale
          .get("offsetEndAtMoment")
          .isSame(moment(this.sale.get("end_at")))
          .should.be.ok()
      })

      return it("reflects server closed state", function () {
        this.sale.set({ auction_state: "closed" })
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add(2, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .isSame(moment(this.sale.get("start_at")).subtract(2, "minutes"))
          .should.be.ok()
        this.sale
          .get("offsetEndAtMoment")
          .isSame(moment(this.sale.get("end_at")).subtract(2, "minutes"))
          .should.be.ok()
        return this.sale.get("clockState").should.equal("closed")
      })
    })

    return describe("client time closed", function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers()
        this.sale.set({
          is_auction: true,
          start_at: moment().add(1, "minutes").format(),
          end_at: moment().add(3, "minutes").format(),
        })
        return this.clock.tick(240000)
      })

      afterEach(function () {
        return this.clock.restore()
      })

      it("reflects server preview state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().subtract(4, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .isSame(moment(this.sale.get("start_at")).add(4, "minutes"))
          .should.be.ok()
        this.sale
          .get("offsetEndAtMoment")
          .isSame(moment(this.sale.get("end_at")).add(4, "minutes"))
          .should.be.ok()
        return this.sale.get("clockState").should.equal("preview")
      })

      it("reflects server open state", function () {
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().subtract(2, "minutes").format(),
        })
        this.sale
          .get("offsetStartAtMoment")
          .isSame(moment(this.sale.get("start_at")).add(2, "minutes"))
          .should.be.ok()
        this.sale
          .get("offsetEndAtMoment")
          .isSame(moment(this.sale.get("end_at")).add(2, "minutes"))
          .should.be.ok()
        return this.sale.get("clockState").should.equal("open")
      })

      return it("reflects server closed state", function () {
        this.sale.set({ auction_state: "closed" })
        this.sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({ iso8601: moment().format() })
        this.sale.get("clockState").should.equal("closed")
        this.sale
          .get("offsetStartAtMoment")
          .isSame(moment(this.sale.get("start_at")))
          .should.be.ok()
        return this.sale
          .get("offsetEndAtMoment")
          .isSame(moment(this.sale.get("end_at")))
          .should.be.ok()
      })
    })
  })

  return describe("#sortableDate", function () {
    it("returns the live_start_at if it exists", function () {
      this.sale.set({
        end_at: moment().add(2, "days"),
        live_start_at: moment().add(1, "days"),
      })
      return this.sale.sortableDate().should.eql(this.sale.get("live_start_at"))
    })

    return it("returns the end_at if no live_start_at exists", function () {
      this.sale.set({
        end_at: moment().add(2, "days"),
      })
      return this.sale.sortableDate().should.eql(this.sale.get("end_at"))
    })
  })
})
