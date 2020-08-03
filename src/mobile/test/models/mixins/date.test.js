/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const _ = require("underscore")
const Backbone = require("backbone")
const dateMixin = require("../../../models/mixins/date")

class Model extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, dateMixin)
  }
}
Model.initClass()

describe("Date Mixin", function () {
  beforeEach(function () {
    return (this.model = new Model())
  })

  describe("#formattedDateRange", function () {
    it("formats start_at and end_at", function () {
      this.model.set({
        start_at: new Date(2000, 1, 27),
        end_at: new Date(2000, 2, 2),
      })
      return this.model
        .formattedDateRange()
        .should.equal("Feb. 27th &ndash; Mar. 2nd")
    })

    return it("omits the end at month if it matches the start at month", function () {
      this.model.set({
        start_at: new Date(2000, 1, 1),
        end_at: new Date(2000, 1, 3),
      })
      return this.model
        .formattedDateRange()
        .should.equal("Feb. 1st &ndash; 3rd")
    })
  })

  return describe("#fromNow", () =>
    it("returns the attribute in from now lingo", function () {
      return this.model
        .set({ start_at: new Date(3000, 1, 1) })
        .fromNow("start_at")
        .should.match(/in (.*) years/)
    }))
})
