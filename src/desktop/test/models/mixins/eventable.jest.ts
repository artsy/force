import _ from "underscore"
import Backbone from "backbone"
const { Eventable } = require("../../../models/mixins/eventable")

class Model extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, Eventable)
  }
}
Model.initClass()

describe("Eventable Mixin", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    // @ts-ignore
    testContext.model = new Model({
      end_at: "2000-01-01T10:01:00+00:00",
      start_at: "2000-01-01T00:01:00+00:00",
    })
  })

  describe("start and end happen on the same day", () => {
    it("formats the date range", () => {
      testContext.model
        .formatDateRange("start_at", "end_at")
        .should.equal("Saturday, Jan 1st, 12:01am – 10:01am")
    })
  })

  describe("start and end happen on different days", () => {
    it("formats the date range", () => {
      testContext.model.set("end_at", "2000-01-03T10:01:00+00:00")
      testContext.model
        .formatDateRange("start_at", "end_at")
        .should.equal("Saturday, Jan 1st, 12:01am – Monday, Jan 3rd, 10:01am")
    })
  })
})
