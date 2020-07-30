/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Params = require("../filter_params.coffee")

describe("FilterParams", function () {
  beforeEach(function () {
    return (this.params = new Params({
      location: "new-york",
      category: "painting",
      type: "gallery",
    }))
  })

  describe("#currentSelection", () =>
    it("selects the keys that represent search facets", function () {
      this.params
        .currentSelection()
        .should.deepEqual({ location: "new-york", category: "painting" })
      this.params.unset("category")
      this.params.currentSelection().should.deepEqual({ location: "new-york" })
      this.params.unset("location")
      return this.params.currentSelection().should.be.empty()
    }))

  describe("#hasSelection", () =>
    it("reflects the presence of facet keys", function () {
      this.params.hasSelection().should.be.true()
      this.params.unset("category")
      this.params.hasSelection().should.be.true()
      this.params.unset("location")
      return this.params.hasSelection().should.be.false()
    }))

  return describe("#urlQueryString", () =>
    it("converts facet parameters to url query string", function () {
      this.params
        .urlQueryString()
        .should.equal("location=new-york&category=painting")
      this.params.unset("category")
      this.params.urlQueryString().should.equal("location=new-york")
      this.params.unset("location")
      return this.params.urlQueryString().should.equal("")
    }))
})
