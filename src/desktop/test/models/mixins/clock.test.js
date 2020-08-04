/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const moment = require("moment")
const { fabricate } = require("@artsy/antigravity")
const ClockMixin = require("../../../models/mixins/clock")
const sd = require("sharify").data

class Model extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, ClockMixin)
  }
}
Model.initClass()

describe("Clock Mixin", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.model = new Model(fabricate("sale")))
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#calculateOffsetTimes", function () {
    describe("client time preview", function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers()
        return this.model.set({
          is_auction: true,
          start_at: moment().add("minutes", 1).format("YYYY-MM-DD HH:mm:ss ZZ"),
          end_at: moment().add("minutes", 3).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
      })

      afterEach(function () {
        return this.clock.restore()
      })

      it("reflects server preview state", function () {
        this.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(this.model.get("start_at")).unix())
        this.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.model.get("end_at")).unix())
        return this.model.get("clockState").should.equal("preview")
      })

      it("reflects server open state", function () {
        this.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add("minutes", 2).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.model.get("start_at")).subtract("minutes", 2).unix()
          )
        this.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(this.model.get("end_at")).subtract("minutes", 2).unix()
          )
        return this.model.get("clockState").should.equal("open")
      })

      it("reflects server closed state", function () {
        this.model.set({ auction_state: "closed" })
        this.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add("minutes", 4).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.model.get("start_at")).subtract("minutes", 4).unix()
          )
        this.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(this.model.get("end_at")).subtract("minutes", 4).unix()
          )
        return this.model.get("clockState").should.equal("closed")
      })

      return it("reflects server live state", function () {
        this.model.set({
          live_start_at: moment()
            .add("minutes", 5)
            .format("YYYY-MM-DD HH:mm:ss ZZ"),
          end_at: moment().add("minutes", 10).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add("minutes", 4).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model
          .get("offsetLiveStartAtMoment")
          .should.eql(
            moment(this.model.get("live_start_at")).subtract("minutes", 4)
          )
        return this.model.get("clockState").should.equal("live")
      })
    })

    describe("client time open", function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers()
        this.model.set({
          is_auction: true,
          start_at: moment().add("minutes", 1).format("YYYY-MM-DD HH:mm:ss ZZ"),
          end_at: moment().add("minutes", 3).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        return this.clock.tick(120000)
      })

      afterEach(function () {
        return this.clock.restore()
      })

      it("reflects server preview state", function () {
        this.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment()
            .subtract("minutes", 2)
            .format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.model.get("start_at")).add("minutes", 2).unix()
          )
        this.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.model.get("end_at")).add("minutes", 2).unix())
        return this.model.get("clockState").should.equal("preview")
      })

      it("reflects server open state", function () {
        this.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model.get("clockState").should.equal("open")
        this.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(this.model.get("start_at")).unix())
        return this.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.model.get("end_at")).unix())
      })

      it("reflects server closed state", function () {
        this.model.set({ auction_state: "closed" })
        this.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add("minutes", 2).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.model.get("start_at")).subtract("minutes", 2).unix()
          )
        this.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(this.model.get("end_at")).subtract("minutes", 2).unix()
          )
        return this.model.get("clockState").should.equal("closed")
      })

      return it("reflects live open", function () {
        this.model.set({
          live_start_at: moment()
            .subtract(1, "minutes")
            .format("YYYY-MM-DD HH:mm:ss ZZ"),
          end_at: null,
        })
        this.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model
          .get("offsetLiveStartAtMoment")
          .unix()
          .should.eql(moment(this.model.get("live_start_at")).unix())
        return this.model.get("clockState").should.equal("live-open")
      })
    })

    return describe("client time closed", function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers()
        this.model.set({
          is_auction: true,
          start_at: moment().add("minutes", 1).format("YYYY-MM-DD HH:mm:ss ZZ"),
          end_at: moment().add("minutes", 3).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        return this.clock.tick(240000)
      })

      afterEach(function () {
        return this.clock.restore()
      })

      it("reflects server preview state", function () {
        this.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment()
            .subtract("minutes", 4)
            .format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.model.get("start_at")).add("minutes", 4).unix()
          )
        this.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.model.get("end_at")).add("minutes", 4).unix())
        return this.model.get("clockState").should.equal("preview")
      })

      it("reflects server open state", function () {
        this.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment()
            .subtract("minutes", 2)
            .format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(this.model.get("start_at")).add("minutes", 2).unix()
          )
        this.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.model.get("end_at")).add("minutes", 2).unix())
        return this.model.get("clockState").should.equal("open")
      })

      return it("reflects server closed state", function () {
        this.model.set({ auction_state: "closed" })
        this.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        this.model.get("clockState").should.equal("closed")
        this.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(this.model.get("start_at")).unix())
        return this.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(this.model.get("end_at")).unix())
      })
    })
  })
})
