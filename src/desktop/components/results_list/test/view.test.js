/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const rewire = require("rewire")
const Backbone = require("backbone")
let TypeaheadView = null
let ResultsListView = null

describe("ResultsListView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      TypeaheadView = benv.requireWithJadeify(
        require.resolve("../../typeahead/view"),
        ["templates.index", "templates.empty", "templates.suggestion"]
      )
      const ResultsView = benv.requireWithJadeify(
        require.resolve("../views/results"),
        ["template"]
      )
      ResultsListView = rewire("../view")
      ResultsListView.__set__("ResultsView", ResultsView)
      $.fn.typeahead = function () {
        return this
      }
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    return (this.view = new ResultsListView({
      typeahead: new TypeaheadView(),
    }))
  })

  return describe("#render", function () {
    beforeEach(function () {
      return this.view.render()
    })

    it("composes the typeahead and results list and renders both", function () {
      this.view.$(".typeahead").should.have.lengthOf(1)
      return this.view.$(".results-list").should.have.lengthOf(1)
    })

    return it("re-renders the collection when appropriate", function () {
      this.view.typeahead.trigger(
        "selected",
        new Backbone.Model({ name: "Foo Bar" })
      )
      this.view.$(".results-list-item").should.have.lengthOf(1)
      return this.view.$(".results-list-item").text().should.equal("Foo Bar")
    })
  })
})
