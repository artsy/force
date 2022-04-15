const sinon = require("sinon")
const rewire = require("rewire")
const lifecycle = rewire("../../lib/app/lifecycle")

describe("lifecycle", function () {
  let req
  let res
  let request
  let passport

  beforeEach(function () {
    req = {
      body: {},
      params: {},
      query: {},
      session: {},
      get: sinon.stub(),
      connection: { remoteAddress: "99.99.99.99" },
    }
    res = {
      redirect: sinon.stub(),
      send: sinon.stub(),
      status: sinon.stub().returns({
        send: (this.send = sinon.stub()),
      }),
    }
    this.next = sinon.stub()
    passport = {}
    passport.authenticate = sinon.stub()
    passport.authenticate.returns((req, res, next) => next())
    request = sinon.stub().returns(request)
    for (let method of ["get", "end", "set", "post", "send", "status"]) {
      request[method] = sinon.stub().returns(request)
    }
    lifecycle.__set__("request", request)
    lifecycle.__set__("passport", passport)
    lifecycle.__set__(
      "opts",
      (this.opts = {
        loginPagePath: "/login",
        afterSignupPagePath: "/",
        APP_URL: "https://www.artsy.net",
        ARTSY_URL: "https://api.artsy.net",
      })
    )
  })

  describe("#onLocalLogin", function () {
    context("when successful", function () {
      beforeEach(function () {
        passport.authenticate.returns((req, res, next) => next())
      })

      it("authenticates locally and passes on - local", function () {
        this.opts.APP_URL = "localhost"
        lifecycle.onLocalLogin(req, res, this.next)
        passport.authenticate.args[0][0].should.equal("local-with-otp")
        this.next.called.should.be.ok()
      })

      it("authenticates locally and passes on", function () {
        this.opts.APP_URL = "localhost"
        req.query["redirect-to"] = "/foobar"
        lifecycle.onLocalLogin(req, res, this.next)
        this.next.called.should.be.ok()
      })
    })

    context("when erroring", function () {
      beforeEach(function () {
        passport.authenticate.returns((req, res, next) => next(this.err))
      })

      it("redirects invalid passwords to login", function () {
        this.err = {
          response: {
            body: { error_description: "invalid email or password" },
          },
        }
        lifecycle.onLocalLogin(req, res, this.next)
        res.redirect.args[0][0].should.equal(
          "/login?error=Invalid email or password."
        )
      })

      it("sends generic error to the error handler", function () {
        this.err = new Error("moo")
        lifecycle.onLocalLogin(req, res, this.next)
        this.next.args[0][0].message.should.equal("moo")
      })
    })
  })

  describe("#onError", function () {
    it("Nexts on error", function () {
      lifecycle.onError(new Error("access denied"), req, res, this.next)
      this.next.should.be.called
    })
  })

  describe("#onLocalSignup", function () {
    it("sends 500s as json for xhr requests", function () {
      req.xhr = true
      this.err = {
        response: {
          body: {
            message:
              "Password must include at least one lowercase letter, one uppercase letter, and one digit.",
          },
        },
      }
      lifecycle.onLocalSignup(req, res, this.next)
      request.end.args[0][0](this.err)
      this.send.args[0][0].error.should.equal(
        "Password must include at least one lowercase letter, one uppercase letter, and one digit."
      )
    })

    it("passes the recaptcha_token through signup", function () {
      req.body.recaptcha_token = "recaptcha_token"
      lifecycle.onLocalSignup(req, res, this.next)
      request.send.args[0][0].recaptcha_token.should.equal("recaptcha_token")
    })

    it("passes the user agent through signup", function () {
      req.get.returns("foo-agent")
      lifecycle.onLocalSignup(req, res, this.next)
      request.set.args[0][0]["User-Agent"].should.equal("foo-agent")
    })
  })

  describe("#beforeSocialAuth", function () {
    it("sets session redirect", function () {
      req.query["redirect-to"] = "/foobar"
      passport.authenticate.returns((req, res, next) => next())
      lifecycle.beforeSocialAuth("facebook")(req, res, this.next)
      req.session.redirectTo.should.equal("/foobar")
      passport.authenticate.args[0][1].scope.should.equal("email")
    })

    it("sets the session to skip onboarding", function () {
      passport.authenticate.returns((req, res, next) => next())
      req.query["skip-onboarding"] = true
      lifecycle.beforeSocialAuth("facebook")(req, res, this.next)
      req.session.skipOnboarding.should.equal(true)
    })
  })

  describe("#afterSocialAuth", function () {
    it("doesnt redirect to / if skip-onboarding is set", function () {
      req.artsyPassportSignedUp = true
      req.session.skipOnboarding = true
      passport.authenticate.returns((req, res, next) => next())
      lifecycle.afterSocialAuth("facebook")(req, res, this.next)
      res.redirect.called.should.not.be.ok()
    })

    it("surfaces blocked by facebook errors", function () {
      passport.authenticate.returns((req, res, next) =>
        next(new Error("Unauthorized source IP address"))
      )
      lifecycle.afterSocialAuth("facebook")(req, res, this.next)
      res.redirect.args[0][0].should.equal(
        "/login?error=Your IP address was blocked by Facebook."
      )
    })

    it("passes random errors to be rendered on the login screen", function () {
      passport.authenticate.returns((req, res, next) =>
        next(new Error("Facebook authorization failed"))
      )
      lifecycle.afterSocialAuth("facebook")(req, res, this.next)
      res.redirect.args[0][0].should.equal(
        "/login?error=Facebook authorization failed"
      )
    })

    context("with an error", function () {
      // TODO: Reimplement these tests
    })
    context("when successful", function () {
      // TODO: Reimplement these tests
    })
  })

  describe("#ensureLoggedInOnAfterSignupPage", function () {
    it("redirects to the login page, and back, without a user", function () {
      lifecycle.ensureLoggedInOnAfterSignupPage(req, res, this.next)
      res.redirect.args[0][0].should.equal("/login?redirect-to=/")
    })
  })

  describe("#ssoAndRedirectBack", function () {
    it("redirects signups to /", function () {
      req.user = {
        get() {
          return "token"
        },
      }
      req.artsyPassportSignedUp = true
      lifecycle.ssoAndRedirectBack(req, res, this.next)
      request.end.args[0][0](null, { body: { trust_token: "foo-trust-token" } })
      res.redirect.args[0][0].should.containEql("/")
    })

    it("passes on for xhrs", function () {
      req.xhr = true
      req.user = { toJSON() {} }
      lifecycle.ssoAndRedirectBack(req, res, this.next)
      res.send.args[0][0].success.should.equal(true)
    })

    it("single signs on to gravity", function () {
      req.user = {
        get() {
          return "token"
        },
      }
      req.query["redirect-to"] = "/artwork/andy-warhol-skull"
      lifecycle.ssoAndRedirectBack(req, res, this.next)
      request.post.args[0][0].should.containEql("me/trust_token")
      request.end.args[0][0](null, { body: { trust_token: "foo-trust-token" } })
      res.redirect.args[0][0].should.equal(
        "https://api.artsy.net/users/sign_in" +
          "?trust_token=foo-trust-token" +
          "&redirect_uri=https://www.artsy.net/artwork/andy-warhol-skull"
      )
    })
  })
})
