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

describe("Filter / Dropdown", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        _s: require("underscore.string"),
        filterLabelMap: require("../label_map.coffee"),
      })
      Backbone.$ = $
      const DropdownView = benv.requireWithJadeify(
        resolve(__dirname, "../view"),
        ["template"]
      )
      this.view = new DropdownView({
        el: $("<div></div>"),
        params: new Backbone.Model(),
        collection: new FilterArtworks(fabricate2("filter_artworks"), {
          parse: true,
        }),
        facets: ["price_range", "dimension_range", "medium"],
        facet: "price_range",
        filterRoot: "/browse",
      })

      return done()
    })
  })

  afterEach(() => benv.teardown())

  return it("renders properly", function () {
    this.view.renderCounts(this.view.collection)

    this.view.$(".filter-nav-main-text").text().should.equal("price")
    this.view.$(".filter-nav-active-text").text().should.equal("")
    this.view
      .$(".filter-dropdown-nav > a")
      .first()
      .text()
      .should.equal("All prices")
    this.view
      .$(".filter-dropdown-nav > a:nth-child(2) .filter-dropdown-text")
      .text()
      .should.equal("Under $1,000")
    return this.view
      .$(".filter-dropdown-nav > a:nth-child(2) .filter-dropdown-count")
      .text()
      .should.equal("(535)")
  })
})
