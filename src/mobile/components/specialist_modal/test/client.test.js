/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const benv = require("benv")
const { resolve } = require("path")

describe("SpecialistView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      sinon.stub($, "ajax")

      const SpecialistView = benv.requireWithJadeify(
        resolve(__dirname, "../client/specialist_view"),
        ["template", "successTemplate"]
      )

      this.view = new SpecialistView({
        collection: new Backbone.Collection([fabricate("representative")]),
        el: $("body"),
      })

      this.view.validateForm = () => true
      this.view.formIsSubmitting = () => false
      return done()
    })
  })

  afterEach(function () {
    Backbone.sync.restore()
    $.ajax.restore()
    return benv.teardown()
  })

  return describe("#submitForm", function () {
    beforeEach(function () {
      return this.view.render()
    })
    return it("displays successTemplate", function (done) {
      $("#modal-contact-submit").click()
      $.ajax.args[0][0].success()

      this.view.$el.html().should.containEql("Thank you.")
      return done()
    })
  })
})
