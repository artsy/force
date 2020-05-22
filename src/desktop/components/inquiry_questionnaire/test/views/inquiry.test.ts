import benv from "benv"
import sinon from "sinon"
import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
import { setup } from "./setup"
const Inquiry = benv.requireWithJadeify(
  require.resolve("../../views/inquiry"),
  ["template"]
)

describe(
  "Inquiry",
  // FIXME: Reaction migration
  // @ts-ignore
  setup(() => {
    let view
    beforeEach(() => sinon.stub(Backbone, "sync"))

    afterEach(() => Backbone.sync.restore())

    describe("#render", () => {
      describe("user with email and name", () => {
        beforeEach(function() {
          view = new Inquiry({
            user: this.currentUser,
            artwork: this.artwork,
            inquiry: this.inquiry,
            state: this.state,
          })

          view.render()
        })

        it("renders the template", () => {
          view
            .$("h1")
            .text()
            .should.equal("Send message to gallery")
          view
            .$(".scontact-description")
            .text()
            .should.equal("To: Gagosian Gallery")
          view.$('input[type="text"][name="name"]').should.have.lengthOf(0)
          view.$('input[type="email"][name="email"]').should.have.lengthOf(0)
          view
            .$(".scontact-from")
            .text()
            .should.equal("From: Craig Spaeth (craigspaeth@gmail.com)")
        })

        it("fires a recaptcha impression", () => {
          // @ts-ignore
          window.grecaptcha.execute.args[0][0].should.equal("RECAPTCHA_KEY")
          // @ts-ignore
          window.grecaptcha.execute.args[0][1].action.should.equal(
            "inquiry_impression"
          )
        })
      })

      describe("user without contact details", () => {
        beforeEach(function() {
          this.loggedOutUser.unset("name")
          this.loggedOutUser.unset("email")

          view = new Inquiry({
            user: this.loggedOutUser,
            artwork: this.artwork,
            inquiry: this.inquiry,
            state: this.state,
          })

          view.render()
        })

        it("renders the template", () => {
          view
            .$("h1")
            .text()
            .should.equal("Send message to gallery")
          view
            .$(".scontact-description")
            .text()
            .should.equal("To: Gagosian Gallery")
          view.$('input[type="text"][name="name"]').should.have.lengthOf(1)
          view.$('input[type="email"][name="email"]').should.have.lengthOf(1)
          view
            .$(".scontact-from")
            .text()
            .should.be.empty()
        })
      })
    })

    describe("#next (with user)", () => {
      beforeEach(function() {
        this.state.set("steps", ["inquiry", "after_inquiry"])

        view = new Inquiry({
          user: this.currentUser,
          artwork: this.artwork,
          inquiry: this.inquiry,
          state: this.state,
        })

        view.render()
      })

      it("sets up the inquiry and ensures the user has contact details", async () => {
        view.$('input[name="name"]').val("Craig Spaeth")
        view.$('input[name="email"]').val("craigspaeth@gmail.com")
        view.$('textarea[name="message"]').val("I wish to buy the foo bar")
        view.$("button").click()

        view.__serialize__.then(() => {
          // Sets up the inquiry
          this.inquiry.get("message").should.equal("I wish to buy the foo bar")
          this.inquiry.get("contact_gallery").should.be.true()
          this.inquiry.get("artwork").should.equal(this.artwork.id)

          // Sets up the user
          this.currentUser.get("name").should.equal("Craig Spaeth")
          this.currentUser.get("email").should.equal("craigspaeth@gmail.com")

          Backbone.sync.callCount.should.equal(3)

          Backbone.sync.args[0][1]
            .url()
            .should.containEql("/api/v1/me/artwork_inquiry_request")
          Backbone.sync.args[1][1].url().should.containEql("/api/v1/me")
          Backbone.sync.args[2][1].url.should.containEql = "/api/v1/user"

          // Next
          view.state.current().should.equal("after_inquiry")
        })
      })
    })

    describe("#next", () => {
      beforeEach(function() {
        this.state.set("steps", ["inquiry", "after_inquiry"])

        this.loggedOutUser.unset("name")
        this.loggedOutUser.unset("email")

        view = new Inquiry({
          user: this.loggedOutUser,
          artwork: this.artwork,
          inquiry: this.inquiry,
          state: this.state,
        })

        view.render()
      })

      it("sets up the inquiry and ensures the user has contact details", async () => {
        view.$('input[name="name"]').val("Foo Bar")
        view.$('input[name="email"]').val("foo@bar.com")
        view.$('textarea[name="message"]').val("I wish to buy the foo bar")
        view.$("button").click()

        view.__serialize__.then(() => {
          // Sets up the inquiry
          this.inquiry.get("message").should.equal("I wish to buy the foo bar")
          this.inquiry.get("contact_gallery").should.be.true()
          this.inquiry.get("artwork").should.equal(this.artwork.id)

          // Sets up the user
          this.loggedOutUser.get("name").should.equal("Foo Bar")
          this.loggedOutUser.get("email").should.equal("foo@bar.com")

          Backbone.sync.callCount.should.equal(2)

          Backbone.sync.args[0][1]
            .url()
            .should.containEql(
              `/api/v1/me/anonymous_session/${this.loggedOutUser.id}`
            )
          Backbone.sync.args[1][1].url.should.containEql("/api/v1/user")

          // Next
          view.state.current().should.equal("after_inquiry")
        })
      })

      it("prevents an initial send (but not subsequent) when submitting the default message", function() {
        sinon.stub(Inquiry.prototype, "nudged").returns(false)

        view
          .$('textarea[name="message"]')
          .val()
          .should.containEql(
            "Hi, I’m interested in purchasing this work. Could you please provide more information about the piece?"
          )

        view.$("button").click()

        view.nudged.returns(true)

        Backbone.sync.callCount.should.equal(0)

        view
          .$(".alertable-input")
          .data("alert")
          .should.equal(
            "We recommend personalizing your message to get a faster answer from the gallery."
          )

        view
          .$("button")
          .text()
          .should.equal("Send Anyway?")
        view.$("button").click()

        Backbone.sync.callCount.should.equal(2)

        view.nudged.restore()
      })
    })

    describe("in a fair context", () => {
      beforeEach(function() {
        this.state.set("steps", ["inquiry", "after_inquiry"])

        this.loggedOutUser.unset("name")
        this.loggedOutUser.unset("email")

        this.artwork.related().fairs.add(fabricate("fair"))

        view = new Inquiry({
          user: this.loggedOutUser,
          artwork: this.artwork,
          inquiry: this.inquiry,
          state: this.state,
        })
      })

      describe("#render", () => {
        it("renders the attendance checkbox for open fair", function() {
          const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          this.artwork
            .related()
            .fairs.first()
            .set("end_at", tomorrow.toISOString())
          view.render()
          view.$el.html().should.containEql("I will attend Armory Show")
        })

        it("renders the attendance checkbox for closed fair", function() {
          const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          this.artwork
            .related()
            .fairs.first()
            .set("end_at", yesterday.toISOString())
          view.render()
          view.$el.html().should.containEql("I attended Armory Show")
        })
      })

      describe("#next", () => {
        beforeEach(() => {
          view.render()
        })

        it("saves the user fair action", async () => {
          view.$('input[name="name"]').val("Foo Bar")
          view.$('input[name="email"]').val("foo@bar.com")
          view.$('textarea[name="message"]').val("I wish to buy the foo bar")
          view.$('input[name="attending"]').prop("checked", true)
          view.$("button").click()

          view.__serialize__.then(() => {
            Backbone.sync.callCount.should.equal(3)

            Backbone.sync.args[2][1]
              .url()
              .should.containEql("/api/v1/me/user_fair_action")

            view.state.current().should.equal("after_inquiry")
          })
        })

        xit("continues on to the next state even when the UserFairAction errors", async () => {
          // FIXME: promise mocking does not catch error or make it to callback
          Backbone.sync
            .onCall(0)
            .returns(Promise.resolve())
            .onCall(1)
            .returns(Promise.resolve())
            .onCall(2)
            .returns(Promise.resolve())
            .onCall(3)
            .returns(Promise.reject("Action already taken"))

          view.$('input[name="name"]').val("Foo Bar")
          view.$('input[name="email"]').val("foo@bar.com")
          view.$('textarea[name="message"]').val("I wish to buy the foo bar")
          view.$('input[name="attending"]').prop("checked", true)
          view.$("button").click()

          view.__serialize__.then(() => {
            Backbone.sync.callCount.should.equal(3)
            view.state.current().should.equal("after_inquiry")
          })
        })
      })
    })
  })
)
