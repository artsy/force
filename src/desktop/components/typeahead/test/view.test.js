/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const Suggestion = require("../../../models/suggestion")
let TypeaheadView = null

describe("TypeaheadView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      TypeaheadView = benv.requireWithJadeify(require.resolve("../view"), [
        "templates.index",
        "templates.empty",
        "templates.suggestion",
      ])
      Backbone.$ = $
      $.fn.typeahead = function () {
        return this
      }
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.view = new TypeaheadView({ placeholder: "Search Foobars..." })
    return this.view.render()
  })

  afterEach(function () {
    return this.view.remove()
  })

  describe("#initialize", () =>
    it("sets up a reasonable set of defaults (that may be overwritten)", function () {
      return this.view.options.should.eql({
        placeholder: "Search Foobars...",
        autofocus: false,
        autoselect: true,
        headers: {},
        highlight: false,
        hint: true,
        nameAttr: "name",
        param: "term",
        path: null,
        wildcard: ":query",
        url: null,
        kind: null,
        selected: [],
      })
    }))

  describe("#exclude", function () {
    it("adds an ID to the list of previously selected IDs", function () {
      this.view.selected.should.eql([])
      this.view.exclude("one")
      this.view.selected.should.eql(["one"])
      this.view.exclude("one")
      this.view.selected.should.eql(["one"])
      this.view.exclude("two")
      return this.view.selected.should.eql(["one", "two"])
    })

    return it("adds a list of IDs to the list of previously selected IDs", function () {
      this.view.selected.should.eql([])
      this.view.exclude("one", "two")
      this.view.selected.should.eql(["one", "two"])
      this.view.exclude("one", "two", "three", "four")
      return this.view.selected.should.eql(["one", "two", "three", "four"])
    })
  })

  describe("#withoutSelected", () =>
    it("returns the suggestions sans the previously selected suggestions", function () {
      this.view.exclude("one", "four")
      return this.view
        .withoutSelected([
          { id: "one" },
          { id: "two" },
          { id: "three" },
          { id: "four" },
        ])
        .should.eql([{ id: "two" }, { id: "three" }])
    }))

  describe("#render", () =>
    it("renders the template", function () {
      this.view.$("input").should.have.lengthOf(1)
      return this.view
        .$("input")
        .attr("placeholder")
        .should.equal("Search Foobars...")
    }))

  describe("selecting a suggestion", function () {
    it("triggers the `selected` event", function (done) {
      this.view.once("selected", function (suggestion) {
        suggestion.id.should.equal("foobar")
        return done()
      })
      return this.view.input().trigger("typeahead:selected", { id: "foobar" })
    })

    return it("excludes the selected ID", function () {
      this.view.selected.should.eql([])
      this.view.input().trigger("typeahead:selected", { id: "foobar" })
      return this.view.selected.should.eql(["foobar"])
    })
  })

  return describe("parsing results", () =>
    it("accepts a `path` and a `nameAttr` option for pulling out result sets", function () {
      const view = new TypeaheadView({
        nameAttr: "display",
        path: "_embedded.galleries",
      })

      const models = view.parse({
        _embedded: {
          galleries: [
            { id: "some-gallery", display: "Some Gallery" },
            { id: "some-other-gallery", display: "Some Other Gallery" },
          ],
        },
      })

      models[0].get("name").should.equal("Some Gallery")
      return models[1].get("name").should.equal("Some Other Gallery")
    }))
})
