/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const { resolve } = require("path")
const SearchResult = require("../../../models/search_result")
let SearchBarView = null

describe("SearchBarView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
        sd: {},
      })
      Backbone.$ = $
      SearchBarView = benv.require(require.resolve("../view"))
      const Bloodhound = () => ({
        ttAdapter: sinon.stub(),
        initialize: sinon.stub(),
      })
      Bloodhound.tokenizers = { obj: { whitespace: sinon.stub() } }
      SearchBarView.__set__("Bloodhound", Bloodhound)
      location.assign = sinon.stub()
      return benv.render(
        resolve(__dirname, "../templates/index.jade"),
        {},
        () => {
          this.$input = $("#main-layout-search-bar-input")
          this.$input.typeahead = sinon.stub()
          this.view = new SearchBarView({
            el: $("#main-layout-search-bar-container"),
            $input: this.$input,
            mode: "suggest",
          })
          return done()
        }
      )
    })
  })

  afterEach(() => benv.teardown())

  describe("#initialize", function () {
    it("listens to the relevant events", function () {
      return this.view._events.should.have.keys(
        "search:start",
        "search:complete",
        "search:opened",
        "search:closed",
        "search:cursorchanged"
      )
    })

    return describe("#setupTypeahead", function () {
      it("triggers events that happen on the input on the view", function (done) {
        const finish = _.after(4, () => done())
        this.view.once("search:opened", finish)
        this.view.once("search:closed", finish)
        this.view.once("search:selected", finish)
        this.view.once("search:cursorchanged", finish)
        this.$input.trigger("typeahead:opened")
        this.$input.trigger("typeahead:closed")
        this.$input.trigger("typeahead:selected")
        return this.$input.trigger("typeahead:cursorchanged")
      })

      return it("sets up typeahead", function () {
        this.$input.typeahead.args[0][1].name.should.be.an.instanceOf(String)
        this.$input.typeahead.args[0][1].templates.suggestion.should.be.an.instanceOf(
          Function
        )
        this.$input.typeahead.args[0][1].template.should.equal("custom")
        return this.$input.typeahead.args[0][1].displayKey.should.equal("value")
      })
    })
  })

  describe("#selectResult", () =>
    it("takes a search result model and sets window.location to the models location", function () {
      const model = new SearchResult(fabricate("artwork", { model: "artwork" }))
      model.collection = { models: [] }
      this.view.selectResult({}, model)
      return location.assign.args[0][0].should.equal(model.get("location"))
    }))

  describe("#indicateLoading", function () {
    beforeEach(function () {
      return this.view.trigger("search:start")
    })

    it("triggers the loading state of the component", function () {
      return this.view.$el.attr("class").should.containEql("is-loading")
    })

    return it("restores the feedback to the original state", function () {
      return this.view.$el.html().should.containEql("Search Artsy")
    })
  })

  describe("#concealLoading", () =>
    it("removes the loading state", function () {
      this.view.trigger("search:start")
      this.view.$el.attr("class").should.containEql("is-loading")
      this.view.trigger("search:complete")
      return _.isEmpty(this.view.$el.attr("class")).should.be.ok()
    }))

  describe("#displaySuggestions", function () {
    it("displays the feedback when the input is empty", function () {
      this.view.$(".autocomplete-feedback").text("")
      _.isEmpty(this.view.$("input").text()).should.be.true()
      this.view.trigger("search:opened")
      this.view.$el.html().should.containEql("Search Artsy")
      return this.view.$el
        .attr("class")
        .should.containEql("is-display-suggestions")
    })

    return it("does not display the feedback when the input has text", function () {
      this.view.$("input").val("Foo Bar")
      this.view.trigger("search:opened")
      return _.isEmpty(this.view.$el.attr("class")).should.be.true()
    })
  })

  describe("#hideSuggestions", () =>
    it("removes the open state", function () {
      this.view.trigger("search:opened")
      this.view.$el.attr("class").should.containEql("is-display-suggestions")
      this.view.trigger("search:closed")
      return _.isEmpty(this.view.$el.attr("class")).should.be.true()
    }))

  describe("#displayFeedback", function () {
    it("does not render a message when there are results", function () {
      this.view.search.results.add(fabricate("artist"))
      this.view.search.results.length.should.equal(1)
      this.view.trigger("search:complete")
      this.view.$el.html().should.not.containEql("No results found")
      return _.isEmpty(this.view.$el.attr("class")).should.be.true()
    })

    return it("hides the message if there are results after there had previously been none", function () {
      this.view.trigger("search:complete")
      this.view.search.results.add(fabricate("artist"))
      this.view.trigger("search:complete")
      return _.isEmpty(this.view.$el.attr("class")).should.be.true()
    })
  })

  return describe("#feedbackString", function () {
    it("uses the mode if there is one available", function () {
      this.view.mode = "artists"
      return this.view.feedbackString().should.equal("Search for Artists…")
    })

    return it("falls back to the default string", function () {
      return this.view.feedbackString().should.equal("Search Artsy")
    })
  })
})
