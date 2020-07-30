/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Validator = require("../validator")
const { template, confirmables } = require("./fixture")

describe("Validator", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.$form = $(template).prepend(confirmables)
    return (this.validator = new Validator({ $form: this.$form }))
  })

  return describe("#valid", function () {
    // Note: https://github.com/tmpvar/jsdom/issues/544
    it("should set a class on the form and call `checkValidity`", function () {
      this.$form[0].checkValidity = sinon.stub()
      this.validator.isValid()
      this.$form.hasClass("is-validated").should.be.true()
      return this.$form[0].checkValidity.called.should.be.true()
    })

    return describe("with confirmable fields", function () {
      beforeEach(function () {
        return (this.$form[0].checkValidity = sinon.stub())
      })

      return it("should check for confirmable fields and validate they match", function () {
        this.$form.find('input[name="password"]').val("foo")
        this.$form.find('input[name="password_confirmation"]').val("bar")
        this.$form.find(
          'input[name="password_confirmation"]'
        )[0].setCustomValidity = sinon.stub()
        this.validator.isValid()
        this.$form
          .find('input[name="password_confirmation"]')[0]
          .setCustomValidity.called.should.be.true()
        this.$form
          .find('input[name="password_confirmation"]')[0]
          .setCustomValidity.args[0][0].should.equal("Password must match")
        // Resolve the validation
        this.$form.find('input[name="password_confirmation"]').val("foo")
        this.validator.isValid()
        // Empty string clears the custom validation
        return _.last(
          this.$form.find('input[name="password_confirmation"]')[0]
            .setCustomValidity.args
        )[0].should.equal("")
      })
    })
  })
})
