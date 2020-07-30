/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const path = require("path")
const jade = require("jade")
const fs = require("fs")

describe("templates", function () {
  const render = function (template, options) {
    const file = path.resolve(__dirname, `../${template}.jade`)
    return jade.render(fs.readFileSync(file).toString(), options)
  }

  describe("pre-rendered template", function () {
    before(function () {
      const facet = { facetName: "some-parameter", displayName: "Things" }
      return (this.el = render("template", { facet }))
    })

    it("assigns correct class", function () {
      return this.el.should.containEql(
        '<div class="partners-facet-dropdown filter-partners-dropdown dropdown-some-parameter">'
      )
    })
    it("assigns initial placeholder", function () {
      return this.el.should.containEql(
        '<input placeholder="All Things" class="partners-facet-input no-selection"/>'
      )
    })
    return it("renders correct search icon", function () {
      return this.el.should.containEql('<span class="icon-chevron-down">')
    })
  })

  describe("suggestion template", function () {
    it("renders an item with no count specified", function () {
      const item = { name: "Foo Bar", id: "some-id" }
      const el = render("suggestion", { item })
      return el.should.equal(
        '<a class="js-partner-filter partner-search-filter-item">Foo Bar</a>'
      )
    })

    it("renders an item with a count of zero", function () {
      const item = { name: "Foo Bar", id: "some-id", count: 0 }
      const el = render("suggestion", { item })
      return el.should.equal(
        '<a class="js-partner-filter partner-search-filter-item is-disabled">Foo Bar (0)</a>'
      )
    })

    return it("renders an item with a results count", function () {
      const item = { name: "Foo Bar", id: "some-id", count: 1 }
      const el = render("suggestion", { item })
      return el.should.equal(
        '<a class="js-partner-filter partner-search-filter-item">Foo Bar (1)</a>'
      )
    })
  })

  return describe("search facet", function () {
    before(function () {
      const facet = {
        facetName: "some-parameter",
        displayName: "Things",
        search: true,
      }
      return (this.el = render("template", { facet }))
    })

    it("assigns correct class", function () {
      return this.el.should.containEql(
        '<div class="partners-facet-dropdown filter-partners-dropdown dropdown-some-parameter">'
      )
    })
    it("assigns initial placeholder", function () {
      return this.el.should.containEql(
        '<input placeholder="All Things" class="partners-facet-input no-selection"/>'
      )
    })
    return it("renders correct search icon", function () {
      return this.el.should.containEql('<span class="icon-search">')
    })
  })
})
