/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const _ = require("underscore")
const _s = require("underscore.string")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Search = require("../../../collections/search")
const SearchResult = require("../../../models/search_result")
const sinon = require("sinon")
const fixture = require("../../../test/helpers/fixtures.coffee")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Search results template", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    return (this.search = new Search())
  })

  describe("No results", function () {
    beforeEach(function () {
      return (this.template = render("template")({
        sd: {},
        asset() {},
        results: this.search.models,
        term: "foobar",
        crop: sinon.stub(),
        _s,
      }))
    })

    return it("displays a message to the user that nothing can be found", function () {
      return this.template.should.containEql("Nothing found")
    })
  })

  describe("Has results", function () {
    beforeEach(function () {
      this.results = _.times(3, () => new SearchResult(fixture.searchResult))

      const template = render("template")({
        sd: {},
        asset() {},
        results: this.results,
        term: "skull",
        crop: sinon.stub(),
        _s,
      })
      return (this.$template = $(template))
    })

    it("renders the search results", function () {
      return this.$template.find(".search-result").length.should.equal(3)
    })

    return it("highlights the search term", function () {
      return this.$template.find(".is-highlighted").should.be.ok()
    })
  })

  return describe("Creates img tag with empty string", function () {
    beforeEach(function () {
      this.result = new SearchResult(fixture.searchResult)

      const template = render("search_result")({
        sd: {},
        result: this.result,
        term: "skull",
        crop: sinon.stub(),
        _s,
      })

      return (this.$template = $(template))
    })

    return it("creates img tag", function () {
      return this.$template
        .find(".search-result-thumbnail-fallback img")
        .length.should.equal(1)
    })
  })
})
