/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const sd = require("sharify").data
const ErrorHandlingForm = require("../client/error_handling_form.coffee")

describe("FavoritesStatusModalView", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      const submit = $("body").html($("<div id='submit'></div>"))
      this.errorHandlingForm = new ErrorHandlingForm()
      this.errorHandlingForm.$submit = submit
      return done()
    })
  })

  after(() => benv.teardown())

  return describe("#showError", function () {
    afterEach(() => $(".error").html(""))

    it("handles API param_errors", function () {
      this.errorHandlingForm.showError("description", {
        responseText: '{ "type": "param_error", "message": "Meow meow meow" } ',
      })
      return $(".error").text().should.equal("Meow meow meow")
    })

    it("handles generic API errors", function () {
      this.errorHandlingForm.showError("description", {
        responseText: '{ "error": "This is a boring error message"}',
      })
      return $(".error").text().should.equal("This is a boring error message")
    })

    it("handles API errors", function () {
      this.errorHandlingForm.showError("description", {
        responseText: '{ "type": "payment_error" }',
      })
      return $(".error")
        .text()
        .should.equal(
          "Your payment could not be processed. Please try again or contact support."
        )
    })

    it("handles 400 errors", function () {
      this.errorHandlingForm.showError("description", { status: 400 })
      return $(".error")
        .text()
        .should.equal(
          "Your card appears to be missing or malformed. Please try another card or contact support."
        )
    })

    it("handles 401 errors", function () {
      this.errorHandlingForm.showError("description", { status: 401 })
      return $(".error").text().should.equal("description")
    })

    it("handles 402 errors", function () {
      this.errorHandlingForm.showError("description", { status: 402 })
      return $(".error")
        .text()
        .should.equal(
          "Your card could not be authorized. Please try another card or contact support."
        )
    })

    it("handles 403 errors", function () {
      this.errorHandlingForm.showError("description", { status: 403 })
      return $(".error")
        .text()
        .should.equal(
          "Your card appears to be missing or malformed. Please try another card or contact support."
        )
    })

    it("handles 404 errors", function () {
      this.errorHandlingForm.showError("description", { status: 404 })
      return $(".error")
        .text()
        .should.equal("Registration marketplace invalid.")
    })

    it("handles non-json responses", function () {
      this.errorHandlingForm.showError("description", {
        responseText: "<html><body>500!</body></html>",
      })
      return $(".error").text().should.equal("description")
    })

    it("handles timeouts", function () {
      this.errorHandlingForm.showError("description", { statusText: "timeout" })
      return $(".error").text().should.containEql("too long")
    })

    it("adds stripe errors", function () {
      this.errorHandlingForm.showError("description", {
        status: 400,
        error: { additional: "additional info" },
      })
      return $(".error")
        .text()
        .should.equal(
          "Your card appears to be missing or malformed. Please try another card or contact support. additional info"
        )
    })

    it("handles @errors properties that are a function (that return an errors object)", function () {
      this.errorHandlingForm.errors = () => ({
        "Meow meow meow": "Sorry, this endpoint is for cats",
      })
      this.errorHandlingForm.showError("description", {
        responseText: '{ "type": "param_error", "message": "Meow meow meow" } ',
      })
      return $(".error").text().should.equal("Sorry, this endpoint is for cats")
    })

    return it("handles error messages that are a string", function () {
      this.errorHandlingForm.errors["Stolen Credit Card"] =
        "You have encountered an error."
      this.errorHandlingForm.showError("foo", {
        responseText: '{ "error": "Stolen Credit Card"}',
      })
      return $(".error").text().should.equal("You have encountered an error.")
    })
  })
})
