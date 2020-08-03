/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")
const FilterRouter = rewire("../index.coffee")

describe("FilterRouter", function () {
  beforeEach(function () {
    return (this.router = new FilterRouter({ params: new Backbone.Model() }))
  })

  afterEach(() => benv.teardown())

  describe("#navigate", function () {
    it("reflects the filter params as query params in the url", function () {
      this.router.navigate = sinon.stub()
      this.router.params.set({ foo: "bar" })
      return this.router.navigate.args[0][0].should.containEql(
        "/artworks?foo=bar"
      )
    })

    it("does not include page in the url params", function () {
      this.router.navigate = sinon.stub()
      this.router.params.set({ page: "10", foo: "bar" })
      return this.router.navigate.args[0][0].should.containEql(
        "/artworks?foo=bar"
      )
    })

    return it("does not route if no params in the url", function () {
      this.router.navigate = sinon.stub()
      this.router.params.set({ page: "10" })
      return this.router.navigate.callCount.should.equal(0)
    })
  })

  return describe("#artworks", () =>
    it("sets the filter params", function () {
      FilterRouter.__set__("location", { search: "?foo=bar" })
      this.router.artworks()
      return this.router.params.get("foo").should.equal("bar")
    }))
})
