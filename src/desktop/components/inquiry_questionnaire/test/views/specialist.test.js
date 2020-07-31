/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Q = require("bluebird-q")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const { setup } = require("./setup")
const Specialist = benv.requireWithJadeify(
  require.resolve("../../views/specialist"),
  ["template"]
)

describe(
  "Specialist",
  setup(function () {
    beforeEach(function () {
      this.representative = {
        owner_type: "Admin",
        owner: fabricate("profile", { name: "Foo Bar" }),
      }

      return sinon
        .stub(Backbone, "sync")
        .onCall(0)
        .yieldsTo("success", [this.representative])
        .returns(Q.resolve([this.representative]))
    })

    afterEach(() => Backbone.sync.restore())

    describe("#render", function () {
      describe("user with email and name", function () {
        beforeEach(function () {
          this.view = new Specialist({
            user: this.currentUser,
            artwork: this.artwork,
            inquiry: this.inquiry,
            state: this.state,
          })

          return this.view.render()
        })

        return it("loads the representative then renders the template", function () {
          return this.view.__representatives__.then(() => {
            Backbone.sync.args[0][1].url.should.containEql(
              "/api/v1/admins/available_representatives"
            )

            this.view.$("h1").text().should.equal("Send message to Artsy")
            this.view
              .$(".scontact-description")
              .text()
              .should.equal(
                "Foo Bar, an Artsy Specialist, is available to answer your questions and help you collect through Artsy."
              )
            this.view
              .$('input[type="text"][name="name"]')
              .should.have.lengthOf(0)
            this.view
              .$('input[type="email"][name="email"]')
              .should.have.lengthOf(0)
            return this.view
              .$(".scontact-from")
              .text()
              .should.equal("From: Craig Spaeth (craigspaeth@gmail.com)")
          })
        })
      })

      return describe("user without contact details", function () {
        beforeEach(function () {
          this.loggedOutUser.unset("name")
          this.loggedOutUser.unset("email")

          this.view = new Specialist({
            user: this.loggedOutUser,
            artwork: this.artwork,
            inquiry: this.inquiry,
            state: this.state,
          })

          return this.view.render()
        })

        return it("renders the template", function () {
          this.view.$("h1").text().should.equal("Send message to Artsy")
          this.view.$('input[type="text"][name="name"]').should.have.lengthOf(1)
          this.view
            .$('input[type="email"][name="email"]')
            .should.have.lengthOf(1)
          return this.view.$(".scontact-from").text().should.be.empty()
        })
      })
    })

    return describe("next", function () {
      beforeEach(function () {
        this.state.set("steps", ["specialist", "after_specialist"])

        this.loggedOutUser.unset("name")
        this.loggedOutUser.unset("email")

        this.view = new Specialist({
          user: this.loggedOutUser,
          artwork: this.artwork,
          inquiry: this.inquiry,
          state: this.state,
        })

        return this.view.render()
      })

      return it("sets up the inquiry and ensures the user has contact details", function () {
        this.view.$('input[name="name"]').val("Foo Bar")
        this.view.$('input[name="email"]').val("foo@bar.com")
        this.view.$('textarea[name="message"]').val("I wish to buy the foo bar")
        this.view.$("button").click()

        return this.view.__serialize__.then(() => {
          // Sets up the inquiry
          this.inquiry.get("message").should.equal("I wish to buy the foo bar")
          this.inquiry.get("contact_gallery").should.be.false()
          this.inquiry.get("artwork").should.equal(this.artwork.id)

          // Sets up the user
          this.loggedOutUser.get("name").should.equal("Foo Bar")
          this.loggedOutUser.get("email").should.equal("foo@bar.com")

          Backbone.sync.callCount.should.equal(3)

          Backbone.sync.args[0][1].url.should.containEql(
            "/api/v1/admins/available_representatives"
          )
          Backbone.sync.args[1][1]
            .url()
            .should.containEql(
              `/api/v1/me/anonymous_session/${this.loggedOutUser.id}`
            )
          Backbone.sync.args[2][1].url().should.containEql("/api/v1/profile")

          // Next
          return this.view.state.current().should.equal("after_specialist")
        })
      })
    })
  })
)
