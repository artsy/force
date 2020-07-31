/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const benv = require("benv")
const sinon = require("sinon")

const Mailcheck = require("../index.coffee")

describe("Mailcheck", function () {
  beforeEach(done =>
    benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      $.fn.mailcheck = sinon.stub()
      $("body")
        .append(`<input id='js-mailcheck-input' name='email' type='email'> \
<div id='js-mailcheck-hint'></div>`)
      return done()
    })
  )

  afterEach(() => benv.teardown())

  describe("on blur", function () {
    it("shows a suggestion when a provided email is misspelled", function () {
      Mailcheck.run("#js-mailcheck-input", "#js-mailcheck-hint", false)
      $("#js-mailcheck-input").val("kana@gnail.com")
      $("#js-mailcheck-input").blur()
      $.fn.mailcheck.args[0][0].suggested("", {
        address: "kana",
        domain: "gmail.com",
        full: "kana@gmail.com",
      })
      return $("#js-mailcheck-hint").html().length.should.not.equal(0)
    })

    return it("shows a suggestion with <br> when flagged", function () {
      Mailcheck.run("#js-mailcheck-input", "#js-mailcheck-hint", true)
      $("#js-mailcheck-input").val("kana@gnail.com")
      $("#js-mailcheck-input").blur()
      $.fn.mailcheck.args[0][0].suggested("", {
        address: "kana",
        domain: "gmail.com",
        full: "kana@gmail.com",
      })
      return $("#js-mailcheck-hint").html().should.containEql("<br>")
    })
  })

  return describe("on click", () =>
    it("changes the input value to the suggested value", function () {
      Mailcheck.run("#js-mailcheck-input", "#js-mailcheck-hint", true)
      $("#js-mailcheck-input").val("kana@gnail.com")
      $("#js-mailcheck-input").blur()
      $.fn.mailcheck.args[0][0].suggested("", {
        address: "kana",
        domain: "gmail.com",
        full: "kana@gmail.com",
      })
      $(".js-suggestion").click()
      return $("#js-mailcheck-input").val().should.containEql("kana@gmail.com")
    }))
})
