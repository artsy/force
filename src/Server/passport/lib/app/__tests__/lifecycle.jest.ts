import * as lifecycle from "Server/passport/lib/app/lifecycle"
import options from "Server/passport/lib/options"
import passport from "passport"
// biome-ignore lint/style/noRestrictedImports: Test file legacy dependency
import request, { type SuperAgentRequest } from "superagent"

jest.mock("Server/passport/lib/options", () => ({
  loginPagePath: "/login",
  settingsPagePath: "/settings",
  afterSignupPagePath: "/",
  APP_URL: "https://www.artsy.net",
  ARTSY_URL: "https://api.artsy.net",
}))

jest.mock("superagent")
jest.mock("passport", () => {
  return {
    authenticate: jest.fn().mockReturnValue((_req, _res, next) => next()),
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

    for (const method of ["get", "end", "set", "post", "send", "status"]) {
      ;(request as unknown as SuperAgentRequest)[method] = jest
        .fn()
        .mockReturnValue(request as unknown as SuperAgentRequest)
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
        passport.authenticate.mockReturnValueOnce((_req, _res, next) =>
          next(err),
        )
      })

      it("redirects invalid passwords to login", () => {
        err = {
          response: {
            body: { error_description: "invalid email or password" },
          },
        }
        lifecycle.onLocalLogin(req, res, next)
        expect(res.redirect).toHaveBeenCalledWith(
          "/login?error=Invalid email or password.",
        )
      })

      it("sends generic error to the error handler", () => {
        err = new Error("moo")
        lifecycle.onLocalLogin(req, res, next)
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({ message: "moo" }),
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
      ;(request as unknown as any).end.mock.calls[0][0](err)
      expect(send).toHaveBeenCalledWith({
        error:
          "Password must include at least one lowercase letter, one uppercase letter, and one digit.",
        success: false,
      })
    })

    it("passes the recaptcha_token through signup", () => {
      req.body.recaptcha_token = "recaptcha_token"
      lifecycle.onLocalSignup(req, res, next)
      expect(
        (request as unknown as SuperAgentRequest).send,
      ).toHaveBeenCalledWith(
        expect.objectContaining({ recaptcha_token: "recaptcha_token" }),
      )
    })

    it("passes the user agent through signup", () => {
      req.get.mockReturnValue("foo-agent")
      lifecycle.onLocalSignup(req, res, next)
      expect(
        (request as unknown as SuperAgentRequest).set,
      ).toHaveBeenCalledWith(
        expect.objectContaining({ "User-Agent": "foo-agent" }),
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
        expect.objectContaining({ scope: "email" }),
      )
    })

    it("sets the session to skip onboarding", () => {
      passport.authenticate.mockReturnValueOnce((_req, _res, next) => next())
      req.query["skip-onboarding"] = true
      lifecycle.beforeSocialAuth("facebook")(req, res, next)
      expect(req.session.skipOnboarding).toBe(true)
    })
  })

  describe("#afterSocialAuth", () => {
    it("doesn't redirect to / if skip-onboarding is set", () => {
      req.artsyPassportSignedUp = true
      req.session.skipOnboarding = true
      passport.authenticate.mockReturnValueOnce((_req, _res, next) => next())
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect).not.toHaveBeenCalled()
    })

    it("surfaces blocked by facebook errors", () => {
      passport.authenticate.mockReturnValueOnce((_req, _res, next) =>
        next(new Error("Unauthorized source IP address")),
      )
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith(
        "/login?error_code=IP_BLOCKED&provider=facebook",
      )
    })

    it("passes random errors to be rendered on the login screen", () => {
      passport.authenticate.mockReturnValueOnce((_req, _res, next) =>
        next(new Error("Facebook authorization failed")),
      )
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith(
        "/login?error_code=UNKNOWN&error=Facebook authorization failed",
      )
    })

    it("passes errors that may be buried in the error response", () => {
      req.user = { accessToken: "token" }
      passport.authenticate.mockReturnValueOnce((_req, _res, next) => {
        const err = {
          message: "Bad Request",
          response: {
            body: {
              message:
                "Unable to link third-party authentication if account has Artsy two-factor authentication enabled",
            },
          },
        }
        next(err)
      })

      lifecycle.afterSocialAuth("facebook")(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(
        "/settings?error_code=UNKNOWN&error=Unable to link third-party authentication if account has Artsy two-factor authentication enabled",
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
        expect.objectContaining({ success: true }),
      )
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("single signs on to gravity", () => {
      req.user = { accessToken: "token" }
      req.query["redirect-to"] = "/artwork/andy-warhol-skull"
      lifecycle.ssoAndRedirectBack(req, res, next)
      expect(request.post).toHaveBeenCalledWith(
        expect.stringContaining("me/trust_token"),
      )
      const endCallback = (request as unknown as jest.Mocked<SuperAgentRequest>)
        .end.mock.calls[0][0] as unknown as (err: any, res: any) => void
      if (endCallback) {
        endCallback(null, { body: { trust_token: "foo-trust-token" } })
      }
      expect(res.redirect).toHaveBeenCalledWith(
        "https://api.artsy.net/users/sign_in" +
          "?trust_token=foo-trust-token" +
          "&redirect_uri=https://www.artsy.net/artwork/andy-warhol-skull",
      )
    })
  })
})
