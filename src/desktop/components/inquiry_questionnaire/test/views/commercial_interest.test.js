/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Q = require("bluebird-q")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { setup } = require("./setup")
const CommercialInterest = benv.requireWithJadeify(
  require.resolve("../../views/commercial_interest"),
  ["template"]
)

describe(
  "CommercialInterest",
  setup(function () {
    beforeEach(function () {
      return (this.view = new CommercialInterest({
        user: this.currentUser,
        artwork: this.artwork,
        state: this.state,
      }))
    })

    describe("#render", function () {
      beforeEach(function () {
        return this.view.render()
      })

      return it("renders the template", function () {
        this.view
          .$(".iq-headline")
          .text()
          .should.equal(
            "Have you bought art from a gallery or auction house before?"
          )
        this.view.$("button:first").text().should.equal("Yes")
        return this.view.$("button:last").text().should.equal("Not yet")
      })
    })

    return describe("next", function () {
      beforeEach(function () {
        sinon.stub(Backbone, "sync").returns($.Deferred().resolve().promise())

        this.state.set("steps", [
          "commercial_interest",
          "after_commercial_interest",
        ])
        return this.view.render()
      })

      afterEach(() => Backbone.sync.restore())

      return it("saves the form data onto the CollectorProfile and nexts the state", function () {
        Backbone.sync.called.should.be.false()

        this.view.$("button:first").click() // Yes => 3

        Backbone.sync.callCount.should.equal(1)
        Backbone.sync.called.should.be.true()
        Backbone.sync.args[0][0].should.equal("update")
        Backbone.sync.args[0][1].url.should.containEql(
          "/api/v1/me/collector_profile"
        )
        Backbone.sync.args[0][1].attributes.should.eql({ collector_level: "3" })

        return this.view.state
          .current()
          .should.equal("after_commercial_interest")
      })
    })
  })
)
