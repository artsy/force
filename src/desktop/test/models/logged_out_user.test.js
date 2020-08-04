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
const rewire = require("rewire")
const LoggedOutUser = rewire("../../models/logged_out_user")

describe("LoggedOutUser", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  describe("auth related methods", function () {
    beforeEach(() =>
      sinon
        .stub(Backbone, "sync")
        .yieldsTo("success", { user: { accessToken: "secrets" } })
    )

    afterEach(() => Backbone.sync.restore())

    describe("#login", function () {
      it("logs the user in", function () {
        LoggedOutUser.__set__("sd", { AP: { loginPagePath: "/users/sign_in" } })
        LoggedOutUser.__set__("APP_URL", "artsy.net")
        const user = new LoggedOutUser({
          email: "foo@bar.com",
          password: "foobar",
        })
        user.isLoggedIn().should.be.false()
        user.login()
        Backbone.sync.args[0][0].should.equal("create")
        Backbone.sync.args[0][2].url.should.equal("artsy.net/users/sign_in")
        Backbone.sync.args[0][1].attributes.should.containEql({
          email: "foo@bar.com",
          password: "foobar",
        })
        _.include(
          _.keys(Backbone.sync.args[0][1].attributes),
          "_csrf"
        ).should.be.true()
        return user.isLoggedIn().should.be.true()
      })

      it("accepts options and overwrites the default success", function (done) {
        const user = new LoggedOutUser({
          email: "foo@bar.com",
          name: "Foo Bar",
        })
        return user.login({
          success() {
            true.should.be.true()
            return done()
          },
        })
      })

      it("sets the accessToken in ajax settings", function () {
        const user = new LoggedOutUser({
          email: "foo@bar.com",
          password: "foobar",
        })
        user.login()
        return $.ajaxSettings.headers["X-ACCESS-TOKEN"].should.equal("secrets")
      })

      return it("passes through the supplied OTP attempt", function () {
        const user = new LoggedOutUser({
          email: "foo@bar.com",
          password: "foobar",
          otp_attempt: "123456",
        })
        user.login()
        return Backbone.sync.args[0][1].attributes.should.containEql({
          otp_attempt: "123456",
        })
      })
    })

    describe("#signup", function () {
      it("registers the user model", function () {
        LoggedOutUser.__set__("sd", {
          AP: { signupPagePath: "/users/sign_in" },
        })
        const user = new LoggedOutUser({
          email: "foo@bar.com",
          name: "Foo Bar",
          password: "foobar",
        })
        user.signup()
        Backbone.sync.args[0][0].should.equal("create")
        Backbone.sync.args[0][2].url.should.containEql("/users/sign_in")
        return Backbone.sync.args[0][1].attributes.should.containEql({
          name: "Foo Bar",
          email: "foo@bar.com",
          password: "foobar",
        })
      })

      it("includes a signup intent", function () {
        LoggedOutUser.__set__("sd", {
          AP: { signupPagePath: "/users/sign_in" },
        })
        const user = new LoggedOutUser({
          signupIntent: "baz",
          email: "foo@bar.com",
          name: "Foo Bar",
          password: "foobar",
        })
        user.signup()
        return Backbone.sync.args[0][1].attributes.should.containEql({
          signupIntent: "baz",
        })
      })

      it("includes a signup referer", function () {
        LoggedOutUser.__set__("sd", {
          AP: { signupPagePath: "/users/sign_in" },
        })
        const user = new LoggedOutUser({
          signupReferer: "baz",
          email: "foo@bar.com",
          name: "Foo Bar",
          password: "foobar",
        })
        user.signup()
        return Backbone.sync.args[0][1].attributes.should.containEql({
          signupReferer: "baz",
        })
      })

      it("accepts options and overwrites the default success", function (done) {
        const user = new LoggedOutUser({
          email: "foo@bar.com",
          name: "Foo Bar",
          password: "foobar",
        })
        return user.signup({
          success() {
            true.should.be.true()
            return done()
          },
        })
      })

      it("sets the accessToken in ajax settings", function () {
        const user = new LoggedOutUser({
          email: "foo@bar.com",
          name: "Foo Bar",
          password: "foobar",
        })
        user.signup()
        return $.ajaxSettings.headers["X-ACCESS-TOKEN"].should.equal("secrets")
      })

      return it("aliases the method as #register", () =>
        LoggedOutUser.prototype.register === LoggedOutUser.prototype.signup)
    })

    return describe("#forgot", function () {
      it("submits a request for a password reset", function () {
        const user = new LoggedOutUser({ email: "foo@bar.com" })
        user.forgot()
        Backbone.sync.args[0][0].should.equal("create")
        Backbone.sync.args[0][2].url.should.containEql(
          "/api/v1/users/send_reset_password_instructions"
        )
        const { attributes } = Backbone.sync.args[0][1]
        attributes.should.containEql({ email: "foo@bar.com" })
        attributes.should.containEql({ mode: null })
        return attributes.should.containEql({
          reset_password_redirect_to: null,
        })
      })

      it("sends the redirect to in the request", function () {
        LoggedOutUser.__set__("sd", {
          RESET_PASSWORD_REDIRECT_TO: "https://cms.artsy.net",
        })
        const user = new LoggedOutUser({ email: "foo@bar.com" })
        user.forgot()
        const { attributes } = Backbone.sync.args[0][1]
        return attributes.should.containEql({
          reset_password_redirect_to: "https://cms.artsy.net",
        })
      })

      it("sets the mode to fair_set_password when set password is true", function () {
        LoggedOutUser.__set__("sd", { SET_PASSWORD: "true" })
        const user = new LoggedOutUser({ email: "foo@bar.com" })
        user.forgot()
        const { attributes } = Backbone.sync.args[0][1]
        return attributes.should.containEql({ mode: "fair_set_password" })
      })

      it('passes value of SET_PASSWORD when present and not "true"', function () {
        LoggedOutUser.__set__("sd", { SET_PASSWORD: "reset" })
        const user = new LoggedOutUser({ email: "foo@bar.com" })
        user.forgot()
        const { attributes } = Backbone.sync.args[0][1]
        return attributes.should.containEql({ mode: "reset" })
      })

      return it("accepts options and overwrites the default success", function (done) {
        const user = new LoggedOutUser({ email: "foo@bar.com" })
        return user.forgot({
          success() {
            true.should.be.true()
            return done()
          },
        })
      })
    })
  })

  describe("#save", function () {
    beforeEach(() => sinon.stub(Backbone, "sync"))

    afterEach(() => Backbone.sync.restore())

    describe("default behavior", () =>
      it("saves to the anonymous session", function () {
        const user = new LoggedOutUser()
        user.save({ foo: "bar" })
        Backbone.sync.args[0][1]
          .url()
          .should.containEql("/api/v1/me/anonymous_session")
        return Backbone.sync.args[0][1].attributes.foo.should.eql("bar")
      }))

    return describe("behavior immediately following login", function () {
      beforeEach(() =>
        sinon.stub(LoggedOutUser.prototype, "isLoggedIn").returns(true)
      )

      afterEach(() => LoggedOutUser.prototype.isLoggedIn.restore())

      return it("saves to the normal me endpoint", function () {
        const user = new LoggedOutUser()
        user.save({ foo: "bar" })
        Backbone.sync.args[0][1].url().should.containEql("/api/v1/me")
        return Backbone.sync.args[0][1].attributes.foo.should.eql("bar")
      })
    })
  })

  describe("#fetch", function () {
    beforeEach(function () {
      sinon.stub(Backbone, "sync")
      return (this.user = new LoggedOutUser({ email: "cab@example.com" }))
    })

    afterEach(() => Backbone.sync.restore())

    describe("default behavior", function () {
      it("tries to find the anonymous session on the first fetch", function () {
        this.user.fetch()
        Backbone.sync.args[0][2].url.should.containEql(
          "/api/v1/me/anonymous_sessions"
        )
        return Backbone.sync.args[0][2].data.should.have.keys("email")
      })

      it("yields to the success option and sets the attributes using the first model in the response", function (done) {
        this.user.fetch({
          success: () => {
            this.user.get("phone").should.equal("666-666-6666")
            return done()
          },
        })
        return Backbone.sync.args[0][2].success([
          { phone: "666-666-6666" },
          { phone: "555-555-5555" },
        ])
      })

      it("yields to the error option", function (done) {
        this.user.fetch({
          error(collection, response) {
            response.error.should.eql("existy")
            return done()
          },
        })
        return Backbone.sync.args[0][2].error({ error: "existy" })
      })

      return it("fetches the session directly once it has the ID", function (done) {
        this.user.fetch({
          success: () => {
            this.user.fetch({
              success() {
                true.should.be.true()
                return done()
              },
            })
            Backbone.sync.args[1][1]
              .url()
              .should.containEql("/api/v1/me/anonymous_session/foobar")
            return Backbone.sync.args[1][2].success()
          },
        })
        return Backbone.sync.args[0][2].success([{ id: "foobar" }])
      })
    })

    return describe("after login", function () {
      beforeEach(() =>
        sinon.stub(LoggedOutUser.prototype, "isLoggedIn").returns(true)
      )

      afterEach(function () {
        return this.user.isLoggedIn.restore()
      })

      return it("fetches through the /me endpoint if the user is logged in", function (done) {
        this.user.fetch({
          success: () => {
            this.user.id.should.equal("foobar")
            return done()
          },
        })
        Backbone.sync.args[0][1].url().should.containEql("/api/v1/me")
        return Backbone.sync.args[0][2].success({ id: "foobar" })
      })
    })
  })

  describe("#repossess", function () {
    beforeEach(function () {
      sinon.stub(Backbone, "sync")
      this.user = new LoggedOutUser({
        id: "anonymous-session-id",
        email: "cab@example.com",
      })
      return (this.user.__isLoggedIn__ = true)
    })

    afterEach(() => Backbone.sync.restore())

    return it("saves the anonymous_session explicitly setting the subsequent_user_id; returns a thennable", function (specDone) {
      const promise = this.user.repossess("some-user-id")

      Backbone.sync.args[0][2].url.should.containEql(
        "/api/v1/me/anonymous_session/anonymous-session-id"
      )

      return promise
        .finally(function () {
          true.should.be.true()
          return specDone()
        })
        .done()
    })
  })

  return describe("#prepareForInquiry", function () {
    beforeEach(function () {
      this.user = new LoggedOutUser()

      return sinon
        .stub(Backbone, "sync")
        .yieldsTo("success", {})
        .returns(Q.resolve())
    })

    afterEach(() => Backbone.sync.restore())

    return it("creates or persists everything needed to make an inquiry", function () {
      return this.user.prepareForInquiry().then(function () {
        Backbone.sync.callCount.should.equal(3)

        Backbone.sync.args[0][1]
          .url()
          .should.containEql("/api/v1/me/anonymous_session")
        Backbone.sync.args[1][1].url.should.containEql("/api/v1/user")
        return Backbone.sync.args[2][1].url.should.containEql(
          "/api/v1/me/collector_profile"
        )
      })
    })
  })
})
