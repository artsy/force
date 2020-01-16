import benv from "benv"
import sinon from "sinon"
import Backbone from "backbone"
import { setup } from "./setup"
import { resolve } from "path"
import rewire from "rewire"
import { fabricate } from "@artsy/antigravity"
const LoggedOutUser = require("../../../../models/logged_out_user.coffee")
const Artwork = require("../../../../models/artwork.coffee")
const ArtworkInquiry = require("../../../../models/artwork_inquiry.coffee")
const State = require("../../../branching_state/index.coffee")
const Form = rewire("../../../form/index.coffee")

const Account = benv.requireWithJadeify(
  resolve(__dirname, "../../views/account"),
  ["templates.login", "templates.register", "templates.forgot"]
)

describe(
  "Account",
  setup(() => {
    let view
    beforeEach(() => {
      view = new Account({
        user: new LoggedOutUser(fabricate("user")),
        artwork: new Artwork(fabricate("artwork")),
        state: new State(),
        inquiry: new ArtworkInquiry(),
      })
    })

    describe("#render", () => {
      beforeEach(() => {
        view.render()
      })

      it("renders the login page the first time it renders", () => {
        view
          .$(".iq-headline")
          .text()
          .should.containEql("Create an account to send your message")
        view
          .$("input")
          .map(function() {
            // @ts-ignore
            return $(this).attr("name")
          })
          .get()
          .should.eql(["name", "email", "password"])
      })

      it("re-renders when the mode changes", () => {
        view.active.set("mode", "forgot")
        view
          .$(".iq-headline")
          .text()
          .should.containEql("Please check your email")

        view.active.set("mode", "login")
        view
          .$(".iq-headline")
          .text()
          .should.containEql(
            "Please log in to save information to your profile"
          )

        view.active.set("mode", "register")
        view
          .$(".iq-headline")
          .text()
          .should.containEql("Create an account to send your message")
      })
    })

    describe("#onSubmit", () => {
      beforeEach(() => {
        sinon.stub(Backbone, "sync")
        Form.prototype.isReady = sinon.stub().returns(true)
        Account.__set__("Form", Form)
        view.render()
      })

      afterEach(() => {
        Backbone.sync.restore()
      })

      it("prevents default", () => {
        const submitEvent = { preventDefault: sinon.stub() }
        view.onSubmit(submitEvent)
        submitEvent.preventDefault.called.should.eql(true)
      })

      it("returns if form is not ready", done => {
        Form.prototype.isReady = sinon.stub().returns(false)
        Account.__set__("Form", Form)
        const submitFunc = sinon.stub()
        const errorView = new Account({
          user: new LoggedOutUser(fabricate("user")),
          artwork: new Artwork(fabricate("artwork")),
          state: new State(),
          inquiry: new ArtworkInquiry(),
        })
        errorView.submit = submitFunc
        errorView.render()
        errorView.onSubmit({ preventDefault: sinon.stub() })

        setTimeout(() => {
          Form.prototype.isReady.called.should.eql(true)
          submitFunc.called.should.eql(false)
          done()
        }, 1)
      })

      it("changes form state to loading", done => {
        const submitFunc = sinon.stub()
        view.submit = submitFunc
        view.onSubmit({ preventDefault: sinon.stub() })
        // FIXME: better ways to wait?
        setTimeout(() => {
          view.$("button[data-state=loading]").length.should.eql(1)
          done()
        }, 1)
      })

      it("calls #submit with recaptcha token", done => {
        const submitFunc = sinon.stub()
        view.submit = submitFunc
        view.onSubmit({ preventDefault: sinon.stub() })
        setTimeout(() => {
          submitFunc.called.should.eql(true)
          done()
        }, 1)
      })
    })

    describe("#submit", () => {
      beforeEach(() => {
        sinon
          .stub(Backbone, "sync")
          .onCall(0)
          .yieldsTo("success", { user: view.user })
        view.render()
      })

      afterEach(() => Backbone.sync.restore())

      it("sets form data on user", done => {
        view.$('input[name="name"]').val("Human")
        view.$('input[type="email"]').val("human@email.com")
        view.$('input[type="password"]').val("fake-password")
        view.$("button").click()

        setTimeout(() => {
          view.user.get("name").should.eql("Human")
          view.user.get("email").should.eql("human@email.com")
          view.user.get("password").should.eql("fake-password")
          view.user.get("recaptcha_token").should.eql("test-token")
          done()
        }, 1)
      })

      it("displays form errors if present", done => {
        Backbone.sync.restore()
        sinon
          .stub(Backbone, "sync")
          .onCall(0)
          .yieldsTo("error")
        view.render()
        view.$('input[name="name"]').val("")
        view.$('input[type="email"]').val("human@email.com")
        view.$('input[type="password"]').val("fake")
        view.$("button").click()

        setTimeout(() => {
          view
            .$(".js-form-errors")
            .text()
            .should.eql("There was an error")
          done()
        }, 1)
      })
    })

    describe("#forgot", () => {
      beforeEach(() => {
        sinon.stub(Backbone, "sync")
        view.render()
      })

      afterEach(() => Backbone.sync.restore())

      it("sends the password reset email a single time", () => {
        view.active.get("mode").should.equal("auth")
        Backbone.sync.called.should.be.false()

        view.active.set("mode", "forgot")
        Backbone.sync.called.should.be.true()
        Backbone.sync.callCount.should.equal(1)
        Backbone.sync.args[0][2].url.should.containEql(
          "/api/v1/users/send_reset_password_instructions"
        )

        view.active.set("mode", "login")
        view.active.set("mode", "forgot")

        Backbone.sync.callCount.should.equal(1)
      })
    })
  })
)
