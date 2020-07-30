/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { resolve } = require("path")

describe("FilterSortCount", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      const FilterSortCount = benv.require(resolve(__dirname, "../view"))
      this.view = new FilterSortCount({
        el: $("<div></div>"),
        counts: new Backbone.Model(),
        params: new Backbone.Model(),
      })
      return done()
    })
  })

  afterEach(() => benv.teardown())

  it("renders the counts", function () {
    this.view.counts = new Backbone.Model({ total: 1001 })
    this.view.$el = $("<div><div class='filter-sort-count-total'></div></div>")
    this.view.renderTotal()
    return this.view.$el.html().should.containEql("1,001")
  })

  it("updates the params to sort", function () {
    this.view.sort({ target: $("<div data-sort='-foo'></div>") })
    return this.view.params.get("sort").should.equal("-foo")
  })

  return it("renders singulars like a bawse", function () {
    this.view.counts.set({ total: 1 })
    this.view.renderTotal()
    return this.view.$el.html().should.not.containEql("Works")
  })
})
