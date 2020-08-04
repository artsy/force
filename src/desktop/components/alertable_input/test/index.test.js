/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const alertable = require("../index")

describe("alertable", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(() =>
    $("body").html(`\
<input name="email"> \
<button>Submit</button>\
`)
  )

  describe("not triggering alertable", function () {
    beforeEach(function () {
      this.$input = $('input[name="email"]').val("barbaz@example.com")

      return alertable(
        { $input: this.$input, message: "Please change your email." },
        value => value === "foobar@example.com"
      )
    })

    return it("does nothing", function () {
      $(".alertable-input").should.have.lengthOf(0)

      return $("body").html().should.not.containEql(`\
<div class="alertable-input" data-alert="Please change your email."><input name="email"></div>\
`)
    })
  })

  describe("triggering alertable", function () {
    beforeEach(function () {
      this.$input = $('input[name="email"]').val("foobar@example.com")

      return alertable(
        { $input: this.$input, message: "Please change your email." },
        value => value === "foobar@example.com"
      )
    })

    it("alerts you if the predicate passes, by wrapping the input and inserting the message", () =>
      $("body").html().should.containEql(`\
<div class="alertable-input" data-alert="Please change your email."><input name="email"></div>\
`))

    return xit("unwraps (and dismisses) the alert when the input is subsequently focused", () =>
      console.log("JSDOM + focus/blur is annoying. It works, trust me."))
  })

  return describe("with submit button", () =>
    it("alters the button label", function () {
      const $input = $('input[name="email"]').val("foobar@example.com")

      const $submit = $("button")

      $submit.text().should.equal("Submit")

      alertable(
        {
          $input,
          message: "Please change your email.",
          $submit,
          label: "Are you sure?",
        },
        value => value === "foobar@example.com"
      )

      return $submit.text().should.equal("Are you sure?")
    }))
})
