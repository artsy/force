/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Eventable = require("../../../models/mixins/eventable")

class Model extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, Eventable)
  }
}
Model.initClass()

describe("Eventable Mixin", function () {
  beforeEach(function () {
    return (this.model = new Model({
      start_at: "2000-01-01T00:01:00+00:00",
      end_at: "2000-01-01T10:01:00+00:00",
    }))
  })

  describe("start and end happen on the same day", () =>
    it("formats the date range", function () {
      return this.model
        .formatDateRange("start_at", "end_at")
        .should.equal("Saturday, Jan 1st, 12:01am – 10:01am")
    }))

  return describe("start and end happen on different days", () =>
    it("formats the date range", function () {
      this.model.set("end_at", "2000-01-03T10:01:00+00:00")
      return this.model
        .formatDateRange("start_at", "end_at")
        .should.equal("Saturday, Jan 1st, 12:01am – Monday, Jan 3rd, 10:01am")
    }))
})
