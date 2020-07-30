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
const { fabricate2 } = require("@artsy/antigravity")
const FilterArtworks = require("../../../../collections/filter_artworks.coffee")

describe("Filter / Count", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      const CountView = benv.require(resolve(__dirname, "../view"))
      this.view = new CountView({
        el: $("<div><div class='filter-sort-count-total'></div></div>"),
        params: new Backbone.Model(),
        collection: new FilterArtworks(fabricate2("filter_artworks"), {
          parse: true,
        }),
        facets: ["price_range", "dimension_range", "medium"],
      })

      return done()
    })
  })

  afterEach(() => benv.teardown())

  it("renders the counts", function () {
    this.view.updateCounts()
    return this.view.$el.html().should.containEql("12,958")
  })

  return it("renders singulars like a bawse", function () {
    this.view.collection.counts.total.value = 1
    this.view.updateCounts()
    return this.view.$el.html().should.not.containEql("Works")
  })
})
