/* eslint-disable no-restricted-imports */
const sinon = require("sinon")
const lifecycle = require("../../lib/app/lifecycle")

import options from "Server/passport/lib/options"
import request from "superagent"
import passport from "passport"

jest.mock("Server/passport/lib/options", () => ({
  loginPagePath: "/login",
  afterSignupPagePath: "/",
  APP_URL: "https://www.artsy.net",
  ARTSY_URL: "https://api.artsy.net",
}))
jest.mock("superagent")
jest.mock("passport", () => {
  const sinon = require("sinon")
  return {
    authenticate: sinon.stub().returns((req, res, next) => next()),
  }
})

describe("lifecycle", function () {
  let req
  let res
  let next
  let err
  let send

  beforeEach(function () {
    next = sinon.stub()
    send = sinon.stub()

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
      send,
      status: sinon.stub().returns({
        send,
      }),
    }

    for (let method of ["get", "end", "set", "post", "send", "status"]) {
      request[method] = sinon.stub().returns(request)
    }
  })

  afterEach(() => {
    sinon.restore()
    jest.resetAllMocks()
  })

  describe("#onLocalLogin", function () {
    describe("when successful", function () {
      it("authenticates locally and passes on - local", function () {
        options.APP_URL = "localhost"
        lifecycle.onLocalLogin(req, res, next)
        expect(passport.authenticate.args[0][0]).toEqual("local-with-otp")
        expect(next.called).toBeTruthy()
      })

      it("authenticates locally and passes on", function () {
        options.APP_URL = "localhost"
        req.query["redirect-to"] = "/foobar"
        lifecycle.onLocalLogin(req, res, next)
        expect(next.called).toBeTruthy()
      })
    })

    describe("when erroring", function () {
      beforeEach(function () {
        passport.authenticate.returns((req, res, next) => next(err))
      })

      it("redirects invalid passwords to login", function () {
        err = {
          response: {
            body: { error_description: "invalid email or password" },
          },
        }
        lifecycle.onLocalLogin(req, res, next)
        expect(res.redirect.args[0][0]).toEqual(
          "/login?error=Invalid email or password."
        )
      })

      it("sends generic error to the error handler", function () {
        err = new Error("moo")
        lifecycle.onLocalLogin(req, res, next)
        expect(next.args[0][0].message).toEqual("moo")
      })
    })
  })

  describe("#onError", function () {
    it("Nexts on error", function () {
      lifecycle.onError(new Error("access denied"), req, res, next)
      expect(next.called).toBeTruthy()
    })
  })

  describe("#onLocalSignup", function () {
    it("sends 500s as json for xhr requests", function () {
      req.xhr = true
      err = {
        response: {
          body: {
            message:
              "Password must include at least one lowercase letter, one uppercase letter, and one digit.",
          },
        },
      }
      lifecycle.onLocalSignup(req, res, next)
      request.end.args[0][0](err)
      expect(send.args[0][0].error).toEqual(
        "Password must include at least one lowercase letter, one uppercase letter, and one digit."
      )
    })

    it("passes the recaptcha_token through signup", function () {
      req.body.recaptcha_token = "recaptcha_token"
      lifecycle.onLocalSignup(req, res, next)
      expect(request.send.args[0][0].recaptcha_token).toEqual("recaptcha_token")
    })

    it("passes the user agent through signup", function () {
      req.get.returns("foo-agent")
      lifecycle.onLocalSignup(req, res, next)
      expect(request.set.args[0][0]["User-Agent"]).toEqual("foo-agent")
    })
  })

  describe("#beforeSocialAuth", function () {
    it("sets session redirect", function () {
      req.query["redirect-to"] = "/foobar"
      lifecycle.beforeSocialAuth("facebook")(req, res, next)
      expect(req.session.redirectTo).toEqual("/foobar")
      expect(passport.authenticate.args[4][1].scope).toEqual("email")
    })

    it("sets the session to skip onboarding", function () {
      passport.authenticate.returns((req, res, next) => next())
      req.query["skip-onboarding"] = true
      lifecycle.beforeSocialAuth("facebook")(req, res, next)
      expect(req.session.skipOnboarding).toEqual(true)
    })
  })

  describe("#afterSocialAuth", function () {
    it("doesnt redirect to / if skip-onboarding is set", function () {
      req.artsyPassportSignedUp = true
      req.session.skipOnboarding = true
      passport.authenticate.returns((req, res, next) => next())
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect.called).toBeFalsy()
    })

    it("surfaces blocked by facebook errors", function () {
      passport.authenticate.returns((req, res, next) =>
        next(new Error("Unauthorized source IP address"))
      )
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect.args[0][0]).toEqual(
        "/login?error_code=IP_BLOCKED&provider=facebook"
      )
    })

    it("passes random errors to be rendered on the login screen", function () {
      passport.authenticate.returns((req, res, next) =>
        next(new Error("Facebook authorization failed"))
      )
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect.args[0][0]).toEqual(
        "/login?error_code=UNKNOWN&error=Facebook authorization failed"
      )
    })
  })

  describe("#ensureLoggedInOnAfterSignupPage", function () {
    it("redirects to the login page, and back, without a user", function () {
      lifecycle.ensureLoggedInOnAfterSignupPage(req, res, next)
      expect(res.redirect.args[0][0]).toEqual("/login?redirect-to=/")
    })
  })

  describe("#ssoAndRedirectBack", function () {
    it("redirects signups to /", function () {
      req.user = { accessToken: "token" }
      req.artsyPassportSignedUp = true
      lifecycle.ssoAndRedirectBack(req, res, next)
      expect(res.redirect.args[0][0]).toContainEqual("/")
    })

    it("passes on for xhrs", function () {
      req.xhr = true
      req.user = { toJSON() {} }
      lifecycle.ssoAndRedirectBack(req, res, next)
      expect(res.send.args[0][0].success).toEqual(true)
    })

    // FIXME: figure out this test
    it.skip("single signs on to gravity", function () {
      req.user = { accessToken: "token" }
      req.query["redirect-to"] = "/artwork/andy-warhol-skull"
      lifecycle.ssoAndRedirectBack(req, res, next)
      expect(request.post.args[0][0]).toContainEqual("me/trust_token")
      request.end(null, { body: { trust_token: "foo-trust-token" } })
      expect(res.redirect.args[0][0]).toEqual(
        "https://api.artsy.net/users/sign_in" +
          "?trust_token=foo-trust-token" +
          "&redirect_uri=https://www.artsy.net/artwork/andy-warhol-skull"
      )
    })
  })
})
