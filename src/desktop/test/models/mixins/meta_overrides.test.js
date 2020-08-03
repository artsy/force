/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const MetaOverrides = require("../../../models/mixins/meta_overrides.coffee")
const _ = require("underscore")

class Model extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, MetaOverrides)
  }
}
Model.initClass()

describe("Meta Overrides", function () {
  describe("#metaOverrides", () =>
    it("returns a hard-coded meta description", function () {
      const model = new Model({ id: "nada-new-york-2015" })
      return model
        .metaOverrides("description")
        .should.equal(
          "Explore young galleries and artists to watch at NADA New York on Artsy.net."
        )
    }))
  describe("#toPageDescription", function () {
    it("returns a hard-coded meta description", function () {
      const model = new Model({ id: "nada-new-york-2015" })
      return model
        .toPageDescription()
        .should.equal(
          "Explore young galleries and artists to watch at NADA New York on Artsy.net."
        )
    })
    return it("has a sensible default", function () {
      const model = new Model({ name: "Foo" })
      return model.toPageDescription().should.equal("Foo")
    })
  })
  return describe("#toPageTitle", () =>
    it("has a sensible default", function () {
      const model = new Model({ name: "Foo" })
      return model.toPageTitle().should.equal("Foo | Artsy")
    }))
})
