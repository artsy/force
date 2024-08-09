const lifecycle = require("../../lib/app/lifecycle")

import options from "Server/passport/lib/options"
// eslint-disable-next-line no-restricted-imports
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
  return {
    authenticate: jest.fn().mockReturnValue((req, res, next) => next()),
  }
})

describe("lifecycle", () => {
  let req
  let res
  let next
  let err
  let send

  beforeEach(() => {
    next = jest.fn()
    send = jest.fn()

    req = {
      body: {},
      params: {},
      query: {},
      session: {},
      get: jest.fn(),
      connection: { remoteAddress: "99.99.99.99" },
    }

    res = {
      redirect: jest.fn(),
      send,
      status: jest.fn().mockReturnValue({ send }),
    }

    for (let method of ["get", "end", "set", "post", "send", "status"]) {
      request[method] = jest.fn().mockReturnValue(request)
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("#onLocalLogin", () => {
    describe("when successful", () => {
      it("authenticates locally and passes on - local", () => {
        options.APP_URL = "localhost"
        lifecycle.onLocalLogin(req, res, next)
        expect(passport.authenticate).toHaveBeenCalledWith("local-with-otp")
        expect(next).toHaveBeenCalled()
      })

      it("authenticates locally and passes on", () => {
        options.APP_URL = "localhost"
        req.query["redirect-to"] = "/foobar"
        lifecycle.onLocalLogin(req, res, next)
        expect(next).toHaveBeenCalled()
      })
    })

    describe("when erroring", () => {
      beforeEach(() => {
        passport.authenticate.mockReturnValueOnce((req, res, next) => next(err))
      })

      it("redirects invalid passwords to login", () => {
        err = {
          response: {
            body: { error_description: "invalid email or password" },
          },
        }
        lifecycle.onLocalLogin(req, res, next)
        expect(res.redirect).toHaveBeenCalledWith(
          "/login?error=Invalid email or password."
        )
      })

      it("sends generic error to the error handler", () => {
        err = new Error("moo")
        lifecycle.onLocalLogin(req, res, next)
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({ message: "moo" })
        )
      })

      describe("status codes for login errors", () => {
        beforeEach(() => {
          req.xhr = true
        })

        it("invalid email or password", () => {
          err = {
            message: "invalid email or password",
          }
          lifecycle.onLocalLogin(req, res, next)
          expect(res.status).toHaveBeenCalledWith(401)
        })

        it("missing two-factor authentication code", () => {
          err = {
            message: "missing two-factor authentication code",
          }
          lifecycle.onLocalLogin(req, res, next)
          expect(res.status).toHaveBeenCalledWith(401)
        })

        it("invalid two-factor authentication code", () => {
          err = {
            message: "missing two-factor authentication code",
          }
          lifecycle.onLocalLogin(req, res, next)
          expect(res.status).toHaveBeenCalledWith(401)
        })

        it("account locked, try again in a few minutes", () => {
          err = {
            message: "account locked, try again in a few minutes",
          }
          lifecycle.onLocalLogin(req, res, next)
          expect(res.status).toHaveBeenCalledWith(403)
        })

        it("Unexpected token", () => {
          err = {
            message: "Unexpected token",
          }
          lifecycle.onLocalLogin(req, res, next)
          expect(res.status).toHaveBeenCalledWith(500)
        })

        it("generic errors", () => {
          err = new Error("generic error")
          lifecycle.onLocalLogin(req, res, next)
          expect(res.status).toHaveBeenCalledWith(500)
        })
      })
    })
  })

  describe("#onError", () => {
    it("Nexts on error", () => {
      lifecycle.onError(new Error("access denied"), req, res, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe("#onLocalSignup", () => {
    it("sends 500s as json for xhr requests", () => {
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
      request.end.mock.calls[0][0](err)
      expect(send).toHaveBeenCalledWith({
        error:
          "Password must include at least one lowercase letter, one uppercase letter, and one digit.",
        success: false,
      })
    })

    it("passes the recaptcha_token through signup", () => {
      req.body.recaptcha_token = "recaptcha_token"
      lifecycle.onLocalSignup(req, res, next)
      expect(request.send).toHaveBeenCalledWith(
        expect.objectContaining({ recaptcha_token: "recaptcha_token" })
      )
    })

    it("passes the user agent through signup", () => {
      req.get.mockReturnValue("foo-agent")
      lifecycle.onLocalSignup(req, res, next)
      expect(request.set).toHaveBeenCalledWith(
        expect.objectContaining({ "User-Agent": "foo-agent" })
      )
    })
  })

  describe("#beforeSocialAuth", () => {
    it("sets session redirect", () => {
      req.query["redirect-to"] = "/foobar"
      lifecycle.beforeSocialAuth("facebook")(req, res, next)
      expect(req.session.redirectTo).toEqual("/foobar")
      expect(passport.authenticate).toHaveBeenCalledWith(
        "facebook",
        expect.objectContaining({ scope: "email" })
      )
    })

    it("sets the session to skip onboarding", () => {
      passport.authenticate.mockReturnValueOnce((req, res, next) => next())
      req.query["skip-onboarding"] = true
      lifecycle.beforeSocialAuth("facebook")(req, res, next)
      expect(req.session.skipOnboarding).toBe(true)
    })
  })

  describe("#afterSocialAuth", () => {
    it("doesn't redirect to / if skip-onboarding is set", () => {
      req.artsyPassportSignedUp = true
      req.session.skipOnboarding = true
      passport.authenticate.mockReturnValueOnce((req, res, next) => next())
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect).not.toHaveBeenCalled()
    })

    it("surfaces blocked by facebook errors", () => {
      passport.authenticate.mockReturnValueOnce((req, res, next) =>
        next(new Error("Unauthorized source IP address"))
      )
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith(
        "/login?error_code=IP_BLOCKED&provider=facebook"
      )
    })

    it("passes random errors to be rendered on the login screen", () => {
      passport.authenticate.mockReturnValueOnce((req, res, next) =>
        next(new Error("Facebook authorization failed"))
      )
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith(
        "/login?error_code=UNKNOWN&error=Facebook authorization failed"
      )
    })
  })

  describe("#ensureLoggedInOnAfterSignupPage", () => {
    it("redirects to the login page, and back, without a user", () => {
      lifecycle.ensureLoggedInOnAfterSignupPage(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith("/login?redirect-to=/")
    })
  })

  describe("#ssoAndRedirectBack", () => {
    it("redirects signups to /", () => {
      req.user = { accessToken: "token" }
      req.artsyPassportSignedUp = true
      lifecycle.ssoAndRedirectBack(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith(expect.stringContaining("/"))
    })

    it("passes on for xhrs", () => {
      req.xhr = true
      req.user = { toJSON: jest.fn() }
      lifecycle.ssoAndRedirectBack(req, res, next)
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      )
    })

    it.skip("single signs on to gravity", () => {
      req.user = { accessToken: "token" }
      req.query["redirect-to"] = "/artwork/andy-warhol-skull"
      lifecycle.ssoAndRedirectBack(req, res, next)
      expect(request.post).toHaveBeenCalledWith(
        expect.stringContaining("me/trust_token")
      )
      request.end.mock.calls[0][1]({ body: { trust_token: "foo-trust-token" } })
      expect(res.redirect).toHaveBeenCalledWith(
        "https://api.artsy.net/users/sign_in" +
          "?trust_token=foo-trust-token" +
          "&redirect_uri=https://www.artsy.net/artwork/andy-warhol-skull"
      )
    })
  })
})
