/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sd = require("sharify").data
const benv = require("benv")
const Backbone = require("backbone")
const moment = require("moment")
const sinon = require("sinon")
const path = require("path")
const rewire = require("rewire")
const ClockView = rewire("../view.coffee")
const Sale = require("../../../models/sale")
const { fabricate } = require("@artsy/antigravity")

describe("ClockView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      sd.API_URL = "localhost:3003"
      sd.CURRENT_PATH = ""
      benv.expose({ $: benv.require("jquery") })
      sinon.stub(Backbone, "sync")
      sinon.stub(window.location, "reload")
      Backbone.$ = $
      this.view = new ClockView({
        model: new Sale(fabricate("sale"), { clockState: "open" }),
        el: $("<div></div>"),
      })
      this.triggerSpy = sinon.stub()
      ClockView.__set__("mediator", { trigger: this.triggerSpy })
      this.clock = sinon.useFakeTimers()
      return done()
    })
  })

  afterEach(function () {
    Backbone.sync.restore()
    window.location.reload.restore()
    this.clock.restore()
    return benv.teardown()
  })

  describe("#render", function () {
    xit("sets renderClock to call in 1 second intervals", function () {
      const stub = sinon.stub(global, "setInterval")

      this.view.render()
      stub.args[0][0].should.equal(this.view.renderClock)
      stub.args[0][1].should.equal(1000)
      return stub.restore()
    })

    it("renders correct time until the sale starts", function () {
      this.view.model.set({
        is_auction: true,
        start_at: moment().subtract(1, "minutes").format(),
        end_at: moment()
          .add(3, "minutes")
          .add(1, "months")
          .add(1, "hours")
          .add(1, "seconds")
          .add(1, "days")
          .format(),
      })

      this.view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success({ time: moment().format() })

      this.view.$el.html('<div class="clock-value"></div>')
      this.view.render()
      this.view.$el.html().should.containEql("days")
      this.view.$el.html().should.containEql("mos")
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

      this.view.$el.html('<div class="clock-value"></div>')
      this.view.render()
      this.view.$el.html().should.containEql("days")
      this.view.$el.html().should.not.containEql("months")
      return this.view.$el.html().should.containEql("00")
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

    return it("triggers is-over when clock is over", function () {
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
  })

  // TODO: components/clock/test/view.coffee
  return xdescribe("#stateCallback", function () {
    it("defaults to reloading the page when the clock state changes", function () {
      const clockView = new ClockView({
        model: new Sale(fabricate("sale"), { clockState: "open" }),
        el: $("<div></div>"),
      })
      clockView.start()
      _.last(Backbone.sync.args)[2].success({ time: moment().format() })
      location.reload.called.should.equal(false)
      clockView.model.set("clockState", "closed")
      return location.reload.called.should.equal(true)
    })

    return it("can be overridden with anything", function () {
      this.hello = "cat"
      const clockView = new ClockView({
        model: new Sale(fabricate("sale"), { clockState: "open" }),
        el: $("<div></div>"),
        stateCallback: () => {
          return (this.hello = "world")
        },
      })
      clockView.start()
      _.last(Backbone.sync.args)[2].success({ time: moment().format() })
      this.hello.should.equal("cat")
      clockView.model.set("clockState", "closed")
      return this.hello.should.equal("world")
    })
  })
})
