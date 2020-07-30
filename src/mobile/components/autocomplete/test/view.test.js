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
const AutoCompleteView = benv.requireWithJadeify(
  resolve(__dirname, "../view"),
  ["template", "emptyTemplate", "resultTemplate"]
)

describe("AutoCompleteView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
      })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.view = new AutoCompleteView()
    this.view.render()
    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  describe("#render", () =>
    it("renders the form template", function () {
      this.view.$(".autocomplete-input").should.have.lengthOf(1)
      return this.view.$(".autocomplete-results").should.have.lengthOf(1)
    }))

  describe("#search", function () {
    beforeEach(function () {
      this.view.$("input").val("Test")
      return this.view.__search__()
    })

    it("searches for the term", () =>
      Backbone.sync.args[0][2].data.term.should.equal("Test"))

    return it("renders the results", function () {
      Backbone.sync.args[0][2].success([
        { display: "Test Result (1)" },
        { display: "Test Result (2)" },
      ])
      this.view.$(".search-result").should.have.lengthOf(2)
      return this.view
        .$(".search-result-display")
        .map(function () {
          return $(this).text()
        })
        .get()
        .should.eql(["Test Result (1)", "Test Result (2)"])
    })
  })

  return describe("#trap", function () {
    beforeEach(function () {
      this.view.$(".js-autocomplete-input-shield").click()
      this.view.$(".autocomplete-input").val("Test")
      this.view.__search__()
      return Backbone.sync.args[0][2].success([
        { display: "Test Result (1)" },
        { display: "Test Result (2)" },
      ])
    })

    it("allows links to be tapped without deactivating the component from losing focus", function () {
      this.view.$el.hasClass("is-active").should.be.true()
      this.view.$(".search-result").click()
      this.view.trapping.should.be.true()
      return this.view.$el.hasClass("is-active").should.be.true()
    })

    return it("allows the input to be closed anyway", function (done) {
      this.view.$el.hasClass("is-active").should.be.true()
      this.view.$(".js-autocomplete-close").click()
      return _.defer(() =>
        _.defer(() => {
          this.view.$el.hasClass("is-active").should.be.false()
          return done()
        })
      )
    })
  })
})
