import _ from "underscore"
import sinon from "sinon"
import Backbone from "backbone"
import moment from "moment"
const { fabricate } = require("@artsy/antigravity")
const { Clock } = require("../../../models/mixins/clock")

class Model extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, Clock)
  }
}
Model.initClass()

describe("Clock Mixin", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    // @ts-ignore
    testContext.model = new Model(fabricate("sale"))
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  describe("#calculateOffsetTimes", () => {
    describe("client time preview", () => {
      beforeEach(() => {
        testContext.clock = sinon.useFakeTimers()
        testContext.model.set({
          end_at: moment().add("minutes", 3).format("YYYY-MM-DD HH:mm:ss ZZ"),
          is_auction: true,
          start_at: moment().add("minutes", 1).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
      })

      afterEach(() => {
        testContext.clock.restore()
      })

      it("reflects server preview state", () => {
        testContext.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(testContext.model.get("start_at")).unix())
        testContext.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(testContext.model.get("end_at")).unix())
        testContext.model.get("clockState").should.equal("preview")
      })

      it("reflects server open state", () => {
        testContext.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add("minutes", 2).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("start_at"))
              .subtract("minutes", 2)
              .unix()
          )
        testContext.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("end_at"))
              .subtract("minutes", 2)
              .unix()
          )
        testContext.model.get("clockState").should.equal("open")
      })

      it("reflects server closed state", () => {
        testContext.model.set({ auction_state: "closed" })
        testContext.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add("minutes", 4).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("start_at"))
              .subtract("minutes", 4)
              .unix()
          )
        testContext.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("end_at"))
              .subtract("minutes", 4)
              .unix()
          )
        testContext.model.get("clockState").should.equal("closed")
      })

      it("reflects server live state", () => {
        testContext.model.set({
          end_at: moment().add("minutes", 10).format("YYYY-MM-DD HH:mm:ss ZZ"),
          live_start_at: moment()
            .add("minutes", 5)
            .format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add("minutes", 4).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model
          .get("offsetLiveStartAtMoment")
          .should.eql(
            moment(testContext.model.get("live_start_at")).subtract(
              "minutes",
              4
            )
          )
        testContext.model.get("clockState").should.equal("live")
      })
    })

    describe("client time open", () => {
      beforeEach(() => {
        testContext.clock = sinon.useFakeTimers()
        testContext.model.set({
          end_at: moment().add("minutes", 3).format("YYYY-MM-DD HH:mm:ss ZZ"),
          is_auction: true,
          start_at: moment().add("minutes", 1).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.clock.tick(120000)
      })

      afterEach(() => {
        testContext.clock.restore()
      })

      it("reflects server preview state", () => {
        testContext.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment()
            .subtract("minutes", 2)
            .format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("start_at")).add("minutes", 2).unix()
          )
        testContext.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("end_at")).add("minutes", 2).unix()
          )
        testContext.model.get("clockState").should.equal("preview")
      })

      it("reflects server open state", () => {
        testContext.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model.get("clockState").should.equal("open")
        testContext.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(testContext.model.get("start_at")).unix())
        testContext.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(testContext.model.get("end_at")).unix())
      })

      it("reflects server closed state", () => {
        testContext.model.set({ auction_state: "closed" })
        testContext.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().add("minutes", 2).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("start_at"))
              .subtract("minutes", 2)
              .unix()
          )
        testContext.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("end_at"))
              .subtract("minutes", 2)
              .unix()
          )
        testContext.model.get("clockState").should.equal("closed")
      })

      it("reflects live open", () => {
        testContext.model.set({
          end_at: null,
          live_start_at: moment()
            .subtract(1, "minutes")
            .format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model
          .get("offsetLiveStartAtMoment")
          .unix()
          .should.eql(moment(testContext.model.get("live_start_at")).unix())
        testContext.model.get("clockState").should.equal("live-open")
      })
    })

    describe("client time closed", () => {
      beforeEach(() => {
        testContext.clock = sinon.useFakeTimers()
        testContext.model.set({
          end_at: moment().add("minutes", 3).format("YYYY-MM-DD HH:mm:ss ZZ"),
          is_auction: true,
          start_at: moment().add("minutes", 1).format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.clock.tick(240000)
      })

      afterEach(() => {
        testContext.clock.restore()
      })

      it("reflects server preview state", () => {
        testContext.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment()
            .subtract("minutes", 4)
            .format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("start_at")).add("minutes", 4).unix()
          )
        testContext.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("end_at")).add("minutes", 4).unix()
          )
        testContext.model.get("clockState").should.equal("preview")
      })

      it("reflects server open state", () => {
        testContext.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment()
            .subtract("minutes", 2)
            .format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("start_at")).add("minutes", 2).unix()
          )
        testContext.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(
            moment(testContext.model.get("end_at")).add("minutes", 2).unix()
          )
        testContext.model.get("clockState").should.equal("open")
      })

      it("reflects server closed state", () => {
        testContext.model.set({ auction_state: "closed" })
        testContext.model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success({
          iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ"),
        })
        testContext.model.get("clockState").should.equal("closed")
        testContext.model
          .get("offsetStartAtMoment")
          .unix()
          .should.eql(moment(testContext.model.get("start_at")).unix())
        testContext.model
          .get("offsetEndAtMoment")
          .unix()
          .should.eql(moment(testContext.model.get("end_at")).unix())
      })
    })
  })
})
