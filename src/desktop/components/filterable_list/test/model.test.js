/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Filter = require("../model")

describe("Filter", function () {
  beforeEach(function () {
    const types = ["catalogue", "catalogue", "review", "interview", "review"]
    return (this.filter = new Filter({
      collection: new Backbone.Collection(
        _.times(5, i => fabricate("show", { type: types[i] }))
      ),
      filter_by: "type",
      filters: {
        catalogue: "Exhibition Catalogues",
        review: "Exhibition Reviews",
        interview: "Interviews",
        monograph: "Monographs",
        biography: "Biographies",
      },
    }))
  })

  describe("defaults", () =>
    it("sets some sensible defaults", function () {
      this.filter.get("active").should.equal("all")
      return this.filter.get("filter_by").should.equal("type")
    }))

  return describe("#relevant", () =>
    it("returns only the filters needed from the requested filters", function () {
      return this.filter.relevant().should.eql({
        catalogue: "Exhibition Catalogues",
        review: "Exhibition Reviews",
        interview: "Interviews",
      })
    }))
})
