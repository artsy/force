/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { setup } = require("./setup")
const InstitutionalAffiliations = benv.requireWithJadeify(
  require.resolve("../../views/institutional_affiliations"),
  ["template"]
)

describe(
  "InstitutionalAffiliations",
  setup(function () {
    beforeEach(function () {
      return (this.view = new InstitutionalAffiliations({
        user: this.currentUser,
        artwork: this.artwork,
        state: this.state,
      }))
    })

    describe("#render", function () {
      beforeEach(function () {
        this.artwork.related().partner.set("pre_qualify", true)
        return this.view.render()
      })

      return it("renders the form", function () {
        return this.view
          .$(".iq-headline")
          .text()
          .should.equal("Any institutional affiliations?")
      })
    })

    return describe("next", () =>
      describe("success", function () {
        beforeEach(function () {
          sinon.stub(Backbone, "sync").yieldsTo("success")

          this.state.set("steps", [
            "institutional_affiliations",
            "after_institutional_affiliations",
          ])
          return this.view.render()
        })

        afterEach(() => Backbone.sync.restore())

        return it("saves the form data onto the user and nexts the state", function () {
          Backbone.sync.called.should.be.false()

          this.view
            .$('textarea[name="institutional_affiliations"]')
            .val("27 Club")
          this.view.$("button").click()

          Backbone.sync.callCount.should.equal(1)
          Backbone.sync.called.should.be.true()
          Backbone.sync.args[0][0].should.equal("update")
          Backbone.sync.args[0][1].url.should.containEql(
            "/api/v1/me/collector_profile"
          )
          Backbone.sync.args[0][1].attributes.institutional_affiliations.should.equal(
            "27 Club"
          )

          return this.view.state
            .current()
            .should.equal("after_institutional_affiliations")
        })
      }))
  })
)
