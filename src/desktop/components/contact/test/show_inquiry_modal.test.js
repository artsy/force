/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const Partner = require("../../../models/partner")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

describe("ShowInquiryModal", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        sd: {},
      })
      Backbone.$ = $
      this.ShowInquiryView = benv.require(
        resolve(__dirname, "../show_inquiry_modal")
      )
      this.ContactView = this.ShowInquiryView.__get__("ContactView")
      sinon.stub(this.ContactView.prototype, "onSubmit")
      sinon.stub(this.ShowInquiryView.prototype, "openInquiryQuestionnaire")
      sinon.stub(this.ShowInquiryView.prototype, "initialize")
      this.view = new this.ShowInquiryView()
      this.view.show = new Backbone.Model(fabricate("show"))
      this.view.partner = new Partner(fabricate("partner"))
      this.view.partner.related().locations.add(fabricate("location"))
      this.view.model = new Backbone.Model()
      this.view.model.url = ""
      return done()
    })
  })

  afterEach(function () {
    benv.teardown()
    this.ShowInquiryView.prototype.openInquiryQuestionnaire.restore()
    this.ContactView.prototype.onSubmit.restore()
    return this.ShowInquiryView.prototype.initialize.restore()
  })

  describe("#submit", () =>
    it("opens the inquiry questionnaire an inquiry about the show", function () {
      this.view.show.set({ id: "foo-gallery-show" })
      this.view.onSubmit({ preventDefault() {} })
      this.view.model.toJSON().inquireable_id.should.equal("foo-gallery-show")
      this.view.model.toJSON().inquireable_type.should.equal("partner_show")
      this.view.model.toJSON().contact_gallery.should.equal(true)
      return this.ShowInquiryView.prototype.openInquiryQuestionnaire.called.should.be.ok()
    }))

  return describe("#renderLocation", () =>
    it("renders the partners locations", function () {
      this.view.$el.html("<div class='contact-location'></div>")
      this.view.renderLocation()
      return this.view.$el.html().should.containEql("New York")
    }))
})
