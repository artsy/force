/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const CurrentUser = require("../../../../../models/current_user")
const DeleteMyAccountFormView = benv.requireWithJadeify(
  require.resolve("../view"),
  ["template"]
)

describe("DeleteMyAccountFormView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    sinon.stub($, "ajax")
    DeleteMyAccountFormView.__set__(
      "FlashMessage",
      (this.FlashMessage = sinon.stub())
    )

    this.user = new CurrentUser(fabricate("user"))
    return (this.view = new DeleteMyAccountFormView({ user: this.user }))
  })

  afterEach(() => $.ajax.restore())

  describe("#render", () =>
    it("renders the template", function () {
      return this.view
        .render()
        .$el.html()
        .should.containEql("Please Tell Us Why")
    }))

  describe("form contents", function () {
    beforeEach(function () {
      return this.view.render()
    })

    it("disables the submit button until a confirmation is checked", function () {
      this.view.$('input[name="confirm"]').is(":checked").should.be.false()
      this.view.$("button").is(":disabled").should.be.true()
      this.view.$('input[name="confirm"]').click()
      return this.view
        .$('input[name="confirm"]')
        .is(":checked")
        .should.be.true()
    })

    return it("allows the user to enter a reason for deleting", function () {
      this.view.$("textarea").val("Removing an extra test account.")
      this.view.$('input[name="confirm"]').click()
      this.view.$("button").prop("disabled", false).click()
      return $.ajax.args[0][0].data.explanation.should.equal(
        this.view.$("textarea").val()
      )
    })
  })

  return describe("#submit", function () {
    beforeEach(function () {
      this.view.render()
      return this.view.$('input[name="confirm"]').click()
    })

    it("DELETEs the user", function () {
      return this.view.submit($.Event()).then(() => {
        $.ajax.args[0][0].method.should.equal("DELETE")
        $.ajax.args[0][0].data.explanation.should.equal("")
        $.ajax.args[0][0].data.url.should.equal("/user/delete") // Referring path
        return $.ajax.args[0][0].url.should.equal(this.user.url())
      })
    })

    it("logs the user out", function () {
      return this.view.submit($.Event()).then(function () {
        $.ajax.args[1][0].method.should.equal("DELETE")
        return $.ajax.args[1][0].url.should.equal("/users/sign_out")
      })
    })

    it("flashes a success notification", function () {
      return this.view.submit($.Event()).then(() => {
        this.FlashMessage.called.should.be.true()
        this.FlashMessage.args[0][0].href.should.eql("/")
        return this.FlashMessage.args[0][0].message.should.containEql(
          "Your account has been deleted, click here to continue"
        )
      })
    })

    it("adds the access token to the request", function () {
      this.user.set("accessToken", "xxx")
      return this.view.submit($.Event()).then(function () {
        $.ajax.args[0][0].method.should.equal("DELETE")
        return $.ajax.args[0][0].data.access_token.should.equal("xxx")
      })
    })

    return xdescribe("error", function () {
      // FIXME: promise mocking does not catch error
      beforeEach(() =>
        $.ajax
          .onCall(0)
          .returns(Promise.reject("There was an error"))
          .returns(
            Promise.reject({
              responseJSON: {
                message: "Sorry, this account cannot be deleted.",
              },
            })
          )
      )
      return it("displays the error message", function () {
        return this.view.submit($.Event()).then(() => {
          this.view
            .$(".js-form-errors")
            .text()
            .should.containEql("There was an error")
          return this.FlashMessage.args[0][0].message.should.containEql(
            "Sorry, this account cannot be deleted."
          )
        })
      })
    })
  })
})
