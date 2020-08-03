/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const rewire = require("rewire")
const Backbone = require("backbone")
const { setup } = require("./setup")

let Affiliated = null
let ResultsView = null
let TypeaheadView = null
let ResultsListView = null

describe(
  "Affiliated",
  setup(function () {
    beforeEach(function () {
      $.fn.typeahead = function () {
        return this
      }

      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      window.jQuery = $

      Affiliated = benv.requireWithJadeify(
        require.resolve("../../views/affiliated"),
        ["template"]
      )
      ResultsView = benv.requireWithJadeify(
        require.resolve("../../../results_list/views/results"),
        ["template"]
      )
      TypeaheadView = benv.requireWithJadeify(
        require.resolve("../../../typeahead/view"),
        ["templates.index"]
      )

      ResultsListView = rewire("../../../results_list/view")
      ResultsListView.__set__("ResultsView", ResultsView)
      Affiliated.__set__("TypeaheadView", TypeaheadView)
      Affiliated.__set__("ResultsListView", ResultsListView)

      class TestAffiliated extends Affiliated {
        static initClass() {
          this.prototype.title = "This is only a test."
          this.prototype.collectorProfileAttribute = "affiliated_test_ids"
          this.prototype.galaxyPath = "_embedded.tests"
          this.prototype.galaxyEndpoint = "tests"
        }
      }
      TestAffiliated.initClass()

      sinon.stub($, "ajax").yieldsTo("success", {
        _embedded: {
          tests: [{ id: "foorbar", name: "Foobar" }],
        },
      })

      this.currentUser
        .related()
        .collectorProfile.set("affiliated_test_ids", ["foobar"])

      this.artwork.related().partner.set("pre_qualify", false)

      return (this.view = new TestAffiliated({
        user: this.currentUser,
        artwork: this.artwork,
        state: this.state,
      }))
    })

    afterEach(() => $.ajax.restore())

    describe("#setup", () =>
      it("fetches the affiliated thing through Galaxy", function () {
        const fetch = $.ajax.args[0][0]

        fetch.headers.should.eql({
          Accept: "application/vnd.galaxy-public+json",
        })
        fetch.url.should.containEql("/tests?token=")
        return fetch.data.should.eql({ ids: ["foobar"] })
      }))

    return describe("#render", function () {
      beforeEach(function () {
        return this.view.render()
      })

      return it("renders the template", function () {
        this.view
          .$(".iq-headline")
          .text()
          .should.equal("This is only a test.(Optional)")
        this.view.$(".results-list-item").should.have.lengthOf(1)
        return this.view.$(".results-list-item").text().should.equal("Foobar")
      })
    })
  })
)
