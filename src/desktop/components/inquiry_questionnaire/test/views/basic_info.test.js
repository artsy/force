/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { setup } = require("./setup")
const BasicInfo = benv.requireWithJadeify(
  require.resolve("../../views/basic_info"),
  ["template"]
)

describe(
  "BasicInfo",
  setup(function () {
    beforeEach(function () {
      sinon.stub(BasicInfo.prototype, "postRender")
      return (this.view = new BasicInfo({
        user: this.currentUser,
        artwork: this.artwork,
        state: this.state,
      }))
    })

    afterEach(function () {
      return this.view.postRender.restore()
    })

    describe("#render", function () {
      beforeEach(function () {
        this.artwork.related().partner.set("pre_qualify", true)
        return this.view.render()
      })

      return it("renders the form", function () {
        this.view
          .$(".iq-headline")
          .text()
          .should.containEql(
            "Gagosian Gallery asks for some additional information before placing an inquiry."
          )
        return this.view
          .$("input")
          .map(function () {
            return $(this).attr("name")
          })
          .get()
          .should.eql(["profession", "phone", "share_follows"])
      })
    })

    return describe("next", function () {
      describe("success", function () {
        beforeEach(function () {
          sinon.stub(Backbone, "sync").yieldsTo("success")

          this.state.set("steps", ["basic_info", "after_basic_info"])
          return this.view.render()
        })

        afterEach(() => Backbone.sync.restore())

        return it("saves the form data onto the user and nexts the state", function () {
          Backbone.sync.called.should.be.false()

          this.view.$('input[name="profession"]').val("Human")
          this.view.$('input[name="phone"]').val("555-555-5555")
          this.view.$("button").click()

          Backbone.sync.callCount.should.equal(1)
          Backbone.sync.called.should.be.true()
          Backbone.sync.args[0][0].should.equal("update")
          Backbone.sync.args[0][1].url().should.containEql("/api/v1/me")
          Backbone.sync.args[0][1].attributes.profession.should.equal("Human")
          Backbone.sync.args[0][1].attributes.phone.should.equal("555-555-5555")

          return this.view.state.current().should.equal("after_basic_info")
        })
      })

      return describe("error", function () {
        beforeEach(function () {
          sinon.stub(Backbone, "sync").yieldsTo("error")

          this.state.set("steps", ["basic_info", "after_basic_info"])
          return this.view.render()
        })

        afterEach(() => Backbone.sync.restore())

        return it("renders the error", function () {
          this.view.$('input[name="profession"]').val("Human")
          this.view.$('input[name="phone"]').val("notvalid")
          this.view.$("button").click()

          this.view
            .$(".js-form-errors")
            .text()
            // The actual API returns a more useful error message; this is a fallback
            .should.equal("There was an error")

          return this.view.state.current().should.equal("basic_info")
        })
      })
    })
  })
)
