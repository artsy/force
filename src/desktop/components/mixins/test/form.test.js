/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const Form = require("../form.coffee")
const errorResponses = require("./error_responses")

class FormView extends Backbone.View {
  static initClass() {
    _.extend(this.prototype, Form)

    this.prototype.events = { "submit form": "submit" }
  }

  template() {
    return `\
<form>
  <input name='name'>
  <input name='email' required>
  <textarea name='comment' required></textarea>
  <input name='yes' type='checkbox' checked>
  <input name='no' type='checkbox'>
  <button>Submit</button>
</form>\
`
  }

  confirmables() {
    return `\
<input type='password' name='password'>
<input type='password' name='password_confirmation' data-confirm='password'>
<input type='foobar' name='foobar'>
<input type='foobar' name='foobar_confirmation' data-confirm='foobar'>\
`
  }

  submitStub() {} // Stubbed in beforeEach hook
  submit() {
    if (this.formIsSubmitting()) {
      return
    }
    return this.submitStub()
  }

  render() {
    this.$el.html(this.template())
    return this
  }
}
FormView.initClass()

describe("Form", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
      })
      Backbone.$ = $
      this.view = new FormView().render()
      sinon.stub(FormView.prototype, "submitStub")
      window.HTMLFormElement.prototype.submit = sinon.stub()
      return done()
    })
  })

  afterEach(function () {
    this.view.submitStub.restore()
    return benv.teardown()
  })

  describe("#formIsSubmitting", function () {
    it("returns false the first time it is called, true every time after", function () {
      this.view.formIsSubmitting().should.be.false()
      this.view.formIsSubmitting().should.be.true()
      this.view.formIsSubmitting().should.be.true()
      return this.view.formIsSubmitting().should.be.true()
    })

    it("disables the button", function () {
      this.view.formIsSubmitting()
      return this.view.$("button").prop("disabled").should.be.true()
    })

    return it("should work with an actual form submission", function () {
      this.view.submitStub.called.should.be.false()
      this.view.$("form").submit()
      this.view.submitStub.called.should.be.true()
      this.view.$("form").submit()
      this.view.$("form").submit()
      return this.view.submitStub.callCount.should.equal(1)
    })
  })

  describe("#reenableForm", function () {
    it("reenables the form", function () {
      this.view.formIsSubmitting().should.be.false()
      this.view.formIsSubmitting().should.be.true()
      this.view.reenableForm()
      this.view.formIsSubmitting().should.be.false()
      return this.view.formIsSubmitting().should.be.true()
    })

    return it("removes the disabled attr from the button", function () {
      this.view.formIsSubmitting()
      this.view.$("button").prop("disabled").should.be.true()
      this.view.reenableForm()
      return this.view.$("button").prop("disabled").should.be.false()
    })
  })

  describe("#serializeForm", function () {
    it("should return all named inputs as keys regardless of values", function () {
      return this.view
        .serializeForm()
        .should.have.keys("name", "email", "comment", "yes", "no")
    })

    it("should return all values corresponding to keys", function () {
      const values = {
        name: "Foo Bar",
        email: "foo@bar.com",
        comment: "Baz Qux Whatever",
        yes: true,
        no: false,
      }
      this.view.$("form").find("input[name=name]").val(values["name"])
      this.view.$("form").find("input[name=email]").val(values["email"])
      this.view.$("form").find("textarea[name=comment]").val(values["comment"])
      return this.view.serializeForm().should.containEql(values)
    })

    it("should work with an actual form submission", function () {
      this.view.$("form").submit()
      this.view.reenableForm()
      this.view.$("form").submit()
      this.view.$("form").submit()
      return this.view.submitStub.callCount.should.equal(2)
    })

    return describe("multi-selects", function () {
      beforeEach(() =>
        sinon.stub($.fn, "serializeArray").returns([
          { name: "foo", value: "bar" },
          { name: "foo", value: "baz" },
          { name: "foo", value: "qux" },
        ])
      )

      afterEach(() => $.fn.serializeArray.restore())

      return it("properly handles multiple values on the same key", function () {
        return this.view.serializeForm().foo.should.eql(["bar", "baz", "qux"])
      })
    })
  })

  describe("#validateForm", function () {
    // Note: https://github.com/tmpvar/jsdom/issues/544
    it("should set a class on the form and call the #checkValidity on the form", function () {
      this.view.$("form")[0].checkValidity = sinon.stub()
      this.view.validateForm()
      this.view.$("form").hasClass("is-validated").should.be.ok()
      return this.view.$("form")[0].checkValidity.called.should.be.ok()
    })

    return describe("with confirmable fields", function () {
      beforeEach(function () {
        this.view.$("form")[0].checkValidity = sinon.stub()
        return this.view.$("form").prepend(this.view.confirmables())
      })

      return it("should check for confirmable fields and validate they match", function () {
        this.view.$('input[name="password"]').val("foo")
        this.view.$('input[name="password_confirmation"]').val("bar")
        this.view.$(
          'input[name="password_confirmation"]'
        )[0].setCustomValidity = sinon.stub()
        this.view.validateForm()
        this.view
          .$('input[name="password_confirmation"]')[0]
          .setCustomValidity.called.should.be.true()
        this.view
          .$('input[name="password_confirmation"]')[0]
          .setCustomValidity.args[0][0].should.equal("Password must match")
        // Resolve the validation
        this.view.$('input[name="password_confirmation"]').val("foo")
        this.view.validateForm()
        // Empty string clears the custom validation
        return _.last(
          this.view.$('input[name="password_confirmation"]')[0]
            .setCustomValidity.args
        )[0].should.equal("")
      })
    })
  })

  return describe("#errorMessage", function () {
    _.each(errorResponses, responseObj =>
      it("should handle a real world error response", function () {
        return this.view
          .errorMessage({ responseText: responseObj.error })
          .should.equal(responseObj.message)
      })
    )

    return it("should set the error state on inputs when there is a param_error", function () {
      this.view.errorMessage({ responseText: errorResponses[0].error })
      return this.view
        .$("input[name=email]")
        .data("state")
        .should.equal("error")
    })
  })
})
