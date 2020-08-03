/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const Artwork = require("../../../models/artwork")
const Partner = require("../../../models/partner")
const rewire = require("rewire")
const { fabricate } = require("@artsy/antigravity")
const { resolve } = require("path")

describe("ContactPartnerView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      this.artwork = new Artwork(fabricate("artwork"))
      this.partner = new Partner(fabricate("partner", { locations: null }))
      return benv.render(
        resolve(__dirname, "../templates/index.jade"),
        {},
        () => {
          const ContactPartnerView = benv.requireWithJadeify(
            resolve(__dirname, "../contact_partner"),
            ["formTemplate", "headerTemplate"]
          )
          ContactPartnerView.__set__("Cookies", { set() {}, get() {} })
          sinon.stub(ContactPartnerView.prototype, "isLoading")
          sinon.stub(ContactPartnerView.prototype, "isLoaded")
          sinon.stub(ContactPartnerView.prototype, "open")
          sinon.stub(ContactPartnerView.prototype, "updatePosition")
          ContactPartnerView.__set__("SESSION_ID", "1111")
          this.view = new ContactPartnerView({
            artwork: this.artwork,
            partner: this.partner,
            el: $("body"),
          })
          _.last(Backbone.sync.args)[2].complete([fabricate("location")])
          return done()
        }
      )
    })
  })

  afterEach(function () {
    Backbone.sync.restore()
    return benv.teardown()
  })

  describe("#submit", function () {
    describe("Logged out", function () {
      beforeEach(function () {
        this.view.postRender()
        this.view.$('input[name="name"]').val("Foo Bar")
        this.view.$('input[name="email"]').val("foo@bar.com")
        this.view.$('textarea[name="message"]').val("My message")
        return this.view.$("form").submit()
      })

      it("POSTs to the correct endpoint", function () {
        _.last(Backbone.sync.args)[0].should.equal("create")
        return _.last(Backbone.sync.args)[1].url.should.containEql(
          "api/v1/me/artwork_inquiry_request"
        )
      })

      it("sends the correct fields", function () {
        const keys = _.keys(_.last(Backbone.sync.args)[1].attributes)

        return [
          "artwork",
          "contact_gallery",
          "session_id",
          "name",
          "email",
          "message",
        ].map(field => keys.should.containEql(field))
      })

      return it("has the correct data", function () {
        const { attributes } = _.last(Backbone.sync.args)[1]
        attributes.name.should.equal("Foo Bar")
        attributes.email.should.equal("foo@bar.com")
        attributes.message.should.equal("My message")
        attributes.artwork.should.equal(this.view.artwork.id)
        return attributes.contact_gallery.should.be.ok()
      })
    }) // Should contact gallery

    return describe("Logged in", function () {
      beforeEach(function () {
        this.view.user = this.user = new Backbone.Model(fabricate("user"))
        this.view.user.isLoggedIn = () => true
        this.view.$el.html(this.view.formTemplate(this.view.templateData))
        this.view.$('textarea[name="message"]').val("My message")
        return this.view.$("form").submit()
      })

      return it("has the correct data", function () {
        const { attributes } = _.last(Backbone.sync.args)[1]
        attributes.name.should.equal(this.user.get("name"))
        attributes.email.should.equal(this.user.get("email"))
        attributes.message.should.equal("My message")
        attributes.artwork.should.equal(this.view.artwork.id)
        return attributes.contact_gallery.should.be.ok()
      })
    })
  }) // Should contact gallery

  describe("#events", () =>
    it("disables click on backdrop", function () {
      return (
        this.view.events()["click.handler .modal-backdrop"] != null
      ).should.not.be.ok()
    }))

  return describe("template", () =>
    it("renders the template correctly", function () {
      this.view.$el.html(this.view.formTemplate(this.view.templateData))
      return this.view.$el
        .html()
        .should.containEql(
          "Could you please provide more information about the piece?"
        )
    }))
})
