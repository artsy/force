/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const fixture = require("../../../../test/helpers/fixtures.coffee")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const path = require("path")
const SearchResult = require("../../../../models/search_result.coffee")
const _s = require("underscore.string")

describe("SearchResultsView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      return benv.render(
        path.resolve(__dirname, "../../templates/template.jade"),
        {
          sd: {},
          asset() {},
          results: [new SearchResult(fixture.searchResult)],
          term: "skull",
          crop: sinon.stub(),
          _s,
        },
        () => {
          benv.expose({
            $: benv.require("jquery"),
            jQuery: benv.require("jquery"),
          })
          Backbone.$ = $
          sinon.stub(Backbone, "sync")
          const { SearchResultsView } = benv.requireWithJadeify(
            path.resolve(__dirname, "../../client/index.coffee"),
            ["imageTemplate", "resolvedImage"]
          )
          this.view = new SearchResultsView({
            results: [fixture.searchResult],
          })
          return done()
        }
      )
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  return it("fills in artwork images", function () {
    this.view.refreshRenderArtworks(fixture.searchResult)
    Backbone.sync.args[1][2].success(
      fabricate("artwork", { id: "maya-hayuk-untitled" })
    )
    return this.view.$el
      .html()
      .should.containEql(
        "https://i.embed.ly/1/display/crop?url=%2Flocal%2Fadditional_images%2F4e7cb83e1c80dd00010038e2%2F1%2Fsmall.jpg"
      )
  })
})
