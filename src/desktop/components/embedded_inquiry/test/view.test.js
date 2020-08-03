/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Q = require("bluebird-q")
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Artwork = require("../../../models/artwork")
const CurrentUser = require("../../../models/current_user")
let EmbeddedInquiryView = null

describe("EmbeddedInquiryView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      EmbeddedInquiryView = benv.requireWithJadeify(
        require.resolve("../view"),
        ["template", "confirmation"]
      )
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.questionnaire = sinon.stub().returns({ view: new Backbone.View() })

    return EmbeddedInquiryView.__set__(
      "openInquiryQuestionnaireFor",
      this.questionnaire
    )
  })

  describe("logged in", function () {
    beforeEach(function () {
      this.user = new CurrentUser(
        fabricate("user", { name: "Bar Baz", email: "barbaz@example.com" })
      )
      this.artwork = new Artwork(fabricate("artwork"))
      this.view = new EmbeddedInquiryView({
        user: this.user,
        artwork: this.artwork,
      })
      return this.view.render()
    })

    describe("#render", () =>
      it("renders the template correctly", function () {
        this.view
          .$("input, textarea")
          .map(function () {
            return $(this).attr("name")
          })
          .get()
          .should.eql(["artwork", "message"])

        return this.view.$("button").text().should.equal("Contact Gallery")
      }))

    return describe("submit", function () {
      it("sets the form data on the appropriate models, saves everything, and opens the questionnaire", function () {
        this.view
          .$('textarea[name="message"]')
          .val("I want to buy this artwork")
        this.view.$("button").click()

        this.view.inquiry.get("artwork").should.equal(this.artwork.id)
        this.view.inquiry
          .get("message")
          .should.equal("I want to buy this artwork")

        this.view.user.get("name").should.equal("Bar Baz")
        this.view.user.get("email").should.equal("barbaz@example.com")

        this.view.inquiry.get("notification_delay").should.equal(600)

        this.questionnaire.called.should.be.true()

        return Object.keys(this.questionnaire.args[0][0]).should.eql([
          "user",
          "inquiry",
          "artwork",
        ])
      })

      it("ultimately renders a success message once the inquiry is synced", function () {
        sinon.stub(Backbone, "sync").yieldsTo("success")

        this.view
          .$('textarea[name="message"]')
          .val("I want to buy this artwork")
        this.view.$("button").click()

        this.view.$el.html().should.not.containEql("Inquiry Sent")

        this.view.inquiry.save() // Saved somewhere out of band

        const html = this.view.$el.html()
        html.should.containEql("Inquiry Sent")
        html.should.containEql(
          "You will receive an email receipt of your inquiry shortly."
        )
        html.should.containEql(
          "If you want to follow up with the gallery, simply reply to this email."
        )

        return Backbone.sync.restore()
      })

      it("re-enables the form if the modal is aborted or errors (and subsequently closes)", function (done) {
        this.view.$("button").is(":disabled").should.be.false()
        this.view
          .$('textarea[name="message"]')
          .val("I want to buy this artwork")

        this.view.$("button").click()

        return _.defer(() => {
          this.view.$("button").is(":disabled").should.be.true()
          this.view.modal.view.trigger("closed")
          this.view.$("button").is(":disabled").should.be.false()

          return done()
        })
      })

      return it("stops the button spinner once the modal opens", function () {
        this.view
          .$('textarea[name="message"]')
          .val("I want to buy this artwork")
        this.view.$("button").click()

        this.view.$("button").attr("data-state").should.equal("loading")

        this.view.modal.view.trigger("opened")

        return this.view.$("button").attr("data-state").should.equal("default")
      })
    })
  })

  describe("logged out", function () {
    beforeEach(function () {
      this.artwork = new Artwork(fabricate("artwork"))
      this.view = new EmbeddedInquiryView({ artwork: this.artwork })
      return this.view.render()
    })

    describe("#render", () =>
      it("renders the template correctly", function () {
        this.view
          .$("input, textarea")
          .map(function () {
            return $(this).attr("name")
          })
          .get()
          .should.eql(["artwork", "name", "email", "message"])

        return this.view.$("button").text().should.equal("Contact Gallery")
      }))

    return describe("#submit", () =>
      it("sets the form data on the appropriate models and opens the questionnaire", function () {
        this.questionnaire.called.should.be.false()

        this.view.$('input[name="name"]').val("Foo Bar")
        this.view.$('input[name="email"]').val("foobar@example.com")
        this.view
          .$('textarea[name="message"]')
          .val("I want to buy this artwork")
        this.view.$("button").click()

        this.view.inquiry.get("artwork").should.equal(this.artwork.id)
        this.view.inquiry
          .get("message")
          .should.equal("I want to buy this artwork")

        this.view.user.get("name").should.equal("Foo Bar")
        this.view.user.get("email").should.equal("foobar@example.com")

        this.view.inquiry.get("notification_delay").should.equal(600)

        this.questionnaire.called.should.be.true()

        return Object.keys(this.questionnaire.args[0][0]).should.eql([
          "user",
          "inquiry",
          "artwork",
        ])
      }))
  })

  describe("alternate partner types", () =>
    it("renders the correct button copy", function () {
      const artwork = new Artwork(
        fabricate("artwork", { partner: { type: "Auction" } })
      )
      const view = new EmbeddedInquiryView({ artwork })
      return view
        .render()
        .$("button")
        .text()
        .should.equal("Contact Auction House")
    }))

  return describe("fair context", function () {
    beforeEach(function () {
      this.artwork = new Artwork(fabricate("artwork"))
      this.artwork.related().fairs.add(fabricate("fair"))
      return (this.view = new EmbeddedInquiryView({ artwork: this.artwork }))
    })

    it("renders the attendance checkbox for an open fair", function () {
      const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      this.artwork.related().fairs.first().set("end_at", tomorrow.toISOString())
      this.artwork.related().fairs.first().isOver()
      this.view.render()
      const html = this.view.$el.html()
      html.should.containEql("I will attend Armory Show")
      return html.should.containEql(
        "This artwork is part of the art fair—Armory Show."
      )
    })

    it("renders the attendance checkbox for an closed fair", function () {
      const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
      this.artwork
        .related()
        .fairs.first()
        .set("end_at", yesterday.toISOString())
      this.view.render()
      const html = this.view.$el.html()
      html.should.containEql("I attended Armory Show")
      return html.should.containEql(
        "This artwork is part of the art fair—Armory Show."
      )
    })

    it("renders if the sync comes post-render", function () {
      const artwork = new Artwork(fabricate("artwork"))

      const view = new EmbeddedInquiryView({ artwork })
      view.render().$el.html().should.not.containEql("Async Fair")

      artwork.related().fairs.add(fabricate("fair", { name: "Async Fair" }))
      artwork.related().fairs.trigger("sync")

      return view.$el.html().should.containEql("Async Fair")
    })

    describe("user is not attending", () =>
      it("does not add a user fair action", function () {
        let userFairAction
        this.view.render()
        this.view.$('input[name="name"]').val("Not Attending")
        this.view.$("button").click()

        this.view.user.get("name").should.equal("Not Attending")

        return (userFairAction = this.view.user
          .related()
          .collectorProfile.related()
          .userFairActions.should.have.lengthOf(0))
      }))

    return describe("user is attending", () =>
      it("adds a user fair action, when the box is checked", function () {
        this.view.render()
        this.view.$('input[name="name"]').val("Is Attending")
        this.view.$('input[type="checkbox"]').click()
        this.view.$("button").click()

        this.view.user.get("name").should.equal("Is Attending")

        const userFairAction = this.view.user
          .related()
          .collectorProfile.related()
          .userFairActions.first()

        return userFairAction.attributes.should.eql({
          action: "Attendee",
          fair_id: "armory-show-2013",
        })
      }))
  })
})
