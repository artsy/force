/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const moment = require("moment")
const { fabricate } = require("@artsy/antigravity")
const Fair = require("../../models/fair")
const Fairs = require("../../collections/fairs")

describe("Fairs", () =>
  describe("#pastYearRoundFairs", function () {
    beforeEach(function () {
      return (this.clock = sinon.useFakeTimers())
    })

    afterEach(function () {
      return this.clock.restore()
    })

    return it("should not display upcoming fairs", function () {
      const fairs = new Fairs([
        fabricate("fair", {
          id: "fair1",
          end_at: moment().subtract(7, "days"),
          has_full_feature: true,
        }),
        fabricate("fair", {
          id: "fair2",
          end_at: moment().add(7, "days"),
          has_full_feature: true,
        }),
        fabricate("fair", {
          id: "fair3",
          end_at: moment().add(7, "days"),
          has_full_feature: true,
        }),
      ])

      const pastFairs = fairs.pastYearRoundFairs()
      return pastFairs.length.should.eql(1)
    })
  }))
