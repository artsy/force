/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Messenger = require("../messenger")
const { template } = require("./fixture")

describe("Messenger", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    $("body").html(template)
    return (this.messenger = new Messenger({
      $form: (this.$form = $("form")),
      $errors: (this.$errors = this.$form.find(".js-form-errors")),
    }))
  })

  describe("#custom", function () {
    beforeEach(function () {
      return (this.el = this.$form.find('[name="email"]')[0])
    })

    it("handles a `valueMissing` validity state", function () {
      this.el.validity = { valueMissing: true }
      return this.messenger
        .custom(this.el)
        .should.equal("Please enter your email")
    })

    it("handles a `patternMismatch` validity state", function () {
      this.el.validity = { patternMismatch: true }
      return this.messenger
        .custom(this.el)
        .should.equal("Please match the requested format")
    })

    return it("handles a `typeMismatch` validity state", function () {
      this.el.validity = { typeMismatch: true }
      return this.messenger
        .custom(this.el)
        .should.equal("Please enter a valid email")
    })
  })

  describe("#fallback", function () {
    it("kills the trailing period", function () {
      return this.messenger
        .fallback({ validationMessage: "Please fill out this field." })
        .should.equal("Please fill out this field")
    })

    return it("humanizes the message", function () {
      return this.messenger
        .fallback({ validationMessage: "type_mismatch" })
        .should.equal("Type mismatch")
    })
  })

  describe("#message", function () {
    it("constructs a complete validation feedback message", function () {
      const el = this.$form.find('[name="name"]')[0]
      el.validity = { valueMissing: true }
      return this.messenger
        .message(el)
        .should.equal("Please enter your name: (6 characters minimum)")
    })

    return it("falls back if there is no custom error", function () {
      const el = $("<div></div>")[0]
      el.validity = { fooBar: true }
      el.validationMessage = "A fallback message."
      return this.messenger.message(el).should.equal("A fallback message.")
    })
  })

  return describe("#render", function () {
    beforeEach(function () {
      let $invalids, $name
      const $fields = this.$form.find("input, textarea")

      $.extend($.expr[":"], {
        valid(el) {
          return $fields.has(el)
        },
      })

      $fields.each(function () {
        return ($(this)[0].validity = {})
      })

      ;($invalids = $fields.filter("[required]")).each(function () {
        return ($(this)[0].validity = { valueMissing: true })
      })

      $invalids.add(($name = $fields.filter('[name="name"]')))
      $name[0].validity = { patternMismatch: true }
      $invalids = $invalids.add($name)

      return this.messenger.render($invalids)
    })

    it("renders the validation feedback messages", function () {
      // Aggregated block level validation errors
      this.messenger.$errors
        .text()
        .should.containEql("Please enter your email.")
      this.messenger.$errors
        .text()
        .should.containEql("Please enter your comment.")
      this.messenger.$errors
        .text()
        .should.not.containEql(
          "Please match the requested format: (6 characters minimum)"
        )

      // Inline validation errors
      return $('label[for="name"]')
        .html()
        .should.containEql(
          '<span class="is-error">Please match the requested format: (6 characters minimum)</span>'
        )
    })

    return describe("#clear", () =>
      it("removes the errors", function () {
        let html = $("body").html()
        html.should.containEql("Please enter your email.")
        html.should.containEql("Please enter your comment")
        $(".is-error").should.have.lengthOf(1)

        this.messenger.clear()

        html = $("body").html()
        html.should.not.containEql("Please enter your email.")
        html.should.not.containEql("Please enter your comment")
        return $(".is-error").should.have.lengthOf(0)
      }))
  })
})
