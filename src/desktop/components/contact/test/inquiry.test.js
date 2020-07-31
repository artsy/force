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
const rewire = require("rewire")
const { fabricate } = require("@artsy/antigravity")
const { resolve } = require("path")
const Artwork = require("../../../models/artwork")

describe("Inquiry", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function (done) {
    sinon.stub(Backbone, "sync")
    this.artwork = new Artwork(fabricate("artwork"))
    this.partner = fabricate("partner")
    return benv.render(
      resolve(__dirname, "../templates/index.jade"),
      {},
      () => {
        const Inquiry = benv.requireWithJadeify(
          resolve(__dirname, "../inquiry"),
          ["formTemplate"]
        )
        sinon.stub(Inquiry.prototype, "open")
        sinon.stub(Inquiry.prototype, "updatePosition")
        sinon.stub(Inquiry.prototype, "isLoaded")
        this.view = new Inquiry({
          artwork: this.artwork,
          partner: this.partner,
          el: $("body"),
        })
        this.view.renderTemplates()
        return done()
      }
    )
  })

  afterEach(() => Backbone.sync.restore())

  describe("#renderTemplates", () =>
    it("has the correct header", function () {
      const html = this.view.$el.html()
      return html.should.containEql("Ask a Specialist")
    }))

  describe("#submit", function () {
    describe("Logged out", function () {
      beforeEach(function () {
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

      it("has the correct data", function () {
        const { attributes } = _.last(Backbone.sync.args)[1]
        attributes.name.should.equal("Foo Bar")
        attributes.email.should.equal("foo@bar.com")
        attributes.message.should.equal("My message")
        attributes.artwork.should.equal(this.view.artwork.id)
        return attributes.contact_gallery.should.not.be.ok()
      }) // Should not contact gallery

      it(
        "sends inquiries to galleries if the work is in an auction and " +
          "partner is directly contactable",
        function () {
          this.view.sales = new Backbone.Collection([
            fabricate("sale", { is_auction: true }),
          ])
          this.view.partner = new Backbone.Model(
            fabricate("partner", { directly_contactable: true })
          )
          this.view.onSubmit()
          return this.view.model.get("contact_gallery").should.be.ok()
        }
      )

      return it(
        "does not sends inquiries to artsy if the work is in an auction and " +
          "partner is not directly contactable",
        function () {
          this.view.sales = new Backbone.Collection([
            fabricate("sale", { is_auction: true }),
          ])
          this.view.partner = new Backbone.Model(
            fabricate("partner", { directly_contactable: false })
          )
          this.view.onSubmit()
          return this.view.model.get("contact_gallery").should.not.be.ok()
        }
      )
    })

    return describe("Logged in", function () {
      beforeEach(function () {
        this.view.user = this.user = new Backbone.Model(fabricate("user"))
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
        return attributes.contact_gallery.should.not.be.ok()
      })
    })
  }) // Should not contact gallery

  return describe("#events", () =>
    it("disables click on backdrop", function () {
      return (
        this.view.events()["click.handler .modal-backdrop"] != null
      ).should.not.be.ok()
    }))
})
