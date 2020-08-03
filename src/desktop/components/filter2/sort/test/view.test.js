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

describe("Filter / Sort", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      const SortView = benv.require(resolve(__dirname, "../view"))
      this.view = new SortView({
        el: $("<div></div>"),
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

  return it("updates the params to sort", function () {
    this.view.setSort({ target: $("<div data-sort='-foo'></div>") })
    return this.view.params.get("sort").should.equal("-foo")
  })
})
