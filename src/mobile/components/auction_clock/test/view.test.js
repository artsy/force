/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const path = require("path")
const Sale = require("../../../models/sale")
const { fabricate } = require("@artsy/antigravity")
const Backbone = require("backbone")
const benv = require("benv")
const moment = require("moment")
const { resolve } = require("path")
const rewire = require("rewire")
const AuctionClockView = rewire("../view")
const fs = require("fs")
const jade = require("jade")

const omg = function () {
  const filename = resolve(__dirname, "../template.jade")
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("AuctionClockView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.clock = sinon.useFakeTimers()
    this.triggerSpy = sinon.stub()
    this.intervalSpy = sinon.stub()
    AuctionClockView.__set__("mediator", { trigger: this.triggerSpy })
    AuctionClockView.__set__("setInterval", this.intervalSpy)
    return (this.view = new AuctionClockView({
      el: $("body"),
      model: new Sale(fabricate("sale")),
    }))
  })

  afterEach(function () {
    Backbone.sync.restore()
    return this.clock.restore()
  })

  return describe("#render", function () {
    it("sets renderClock to call in 1 second intervals", function () {
      this.view.render()
      this.intervalSpy.args[0][0].should.equal(this.view.renderClock)
      return this.intervalSpy.args[0][1].should.equal(1000)
    })

    it("renders correct time until the sale starts", function () {
      this.view.model.set({
        is_auction: true,
        start_at: moment().subtract(1, "minutes").format(),
        end_at: moment()
          .add(3, "minutes")
          .add(1, "months")
          .add(1, "days")
          .add(1, "hours")
          .add(1, "seconds")
          .format(),
      })

      this.view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success({ time: moment().format() })

      this.view.$el.html(omg())
      this.view.render()
      return this.view.$el.html().should.not.containEql("00")
    })

    it("excludes months section if sale starts 0 months from now", function () {
      this.view.model.set({
        is_auction: true,
        start_at: moment().subtract(1, "minutes").format(),
        end_at: moment().add(3, "minutes").add(1, "hours").format(),
      })

      this.view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success({ time: moment().format() })

      this.view.$el.html(omg())
      this.view.render()
      this.view.$el.html().should.containEql("00")
      return this.view.$el.html().should.not.containEql("false")
    })

    it("removes the register button at the top for open auctions", function () {
      this.view.model.set({
        start_at: new Date(2000, 10, 10).toString(),
        end_at: new Date(2015, 10, 10).toString(),
      })
      this.view.render()
      return this.view.$el.html().should.not.containEql("Register to Bid")
    })

    it("triggers is-almost-over when clock is almost over", function () {
      this.view.model.set({
        is_auction: true,
        start_at: moment().subtract(1, "minutes").format(),
        end_at: moment().add(30, "seconds").format(),
      })

      this.view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success({ time: moment().format() })

      this.view.$el.html('<div class="clock-value"></div>')
      this.view.render()
      return this.triggerSpy.args[0][0].should.equal("clock:is-almost-over")
    })

    it("triggers is-over when clock is over", function () {
      this.view.model.set({
        is_auction: true,
        start_at: moment().subtract(2, "minutes").format(),
        end_at: moment().subtract(1, "minutes").format(),
        auction_state: "closed",
      })

      this.view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success({ time: moment().format() })

      this.view.$el.html('<div class="clock-value"></div>')
      this.view.render()
      return this.triggerSpy.args[0][0].should.equal("clock:is-over")
    })

    describe("live auction integration", function () {
      beforeEach(function () {
        this.view.$el.html(omg())
        return this.view.model.set({
          live_start_at: moment().add(2, "days").format(),
        })
      })

      return it("renders the correct copy", function () {
        this.view.model.set("clockState", "live")
        this.view.$("h2").text().should.equal("Live Bidding Opening In")
        this.view.model.set("clockState", "closed")
        return this.view.$("h2").text().should.equal("Online Bidding Closed")
      })
    })

    return describe("isAuctionPromo", function () {
      beforeEach(function () {
        this.view.$el.html(omg())
        return this.view.model.set({ sale_type: "auction promo" })
      })

      return it("renders the correct copy", function () {
        this.view.model.set("clockState", "preview")
        this.view.$("h2").text().should.equal("Auction Opens In")
        this.view.model.set("clockState", "open")
        this.view.$("h2").text().should.equal("Auction Closes In")
        this.view.model.set("clockState", "closed")
        return this.view.$("h2").text().should.equal("Auction Closed")
      })
    })
  })
})
