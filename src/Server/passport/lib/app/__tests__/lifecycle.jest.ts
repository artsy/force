import * as lifecycle from "Server/passport/lib/app/lifecycle"
import options from "Server/passport/lib/options"
import passport from "passport"
import { requestGravity } from "../../http"

jest.mock("Server/passport/lib/options", () => ({
  loginPagePath: "/login",
  signupPagePath: "/sign_up",
  settingsPagePath: "/settings",
  afterSignupPagePath: "/",
  APP_URL: "https://www.artsy.net",
  ARTSY_URL: "https://api.artsy.net",
}))

jest.mock("../../http")
jest.mock("passport", () => {
  return {
    authenticate: jest.fn().mockReturnValue((req, res, next) => next()),
  }
})

const mockRequestGravity = requestGravity as jest.Mock

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
      cookie: jest.fn(),
      redirect: jest.fn(),
      send,
      status: jest.fn().mockReturnValue({ send }),
    }

    mockRequestGravity.mockResolvedValue({ body: {}, ok: true })
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
    it("passes on after creating a user", async () => {
      await lifecycle.onLocalSignup(req, res, next)

      expect(req.artsyPassportSignedUp).toBe(true)
      expect(next).toHaveBeenCalled()
    })

    it("sends 500s as json for xhr requests", async () => {
      req.xhr = true
      err = {
        response: {
          body: {
            message:
              "Password must include at least one lowercase letter, one uppercase letter, and one digit.",
          },
        },
      }
      mockRequestGravity.mockRejectedValue(err)
      await lifecycle.onLocalSignup(req, res, next)
      expect(send).toHaveBeenCalledWith({
        error:
          "Password must include at least one lowercase letter, one uppercase letter, and one digit.",
        success: false,
      })
    })

    it("passes the recaptcha_token through signup", async () => {
      req.body.recaptcha_token = "recaptcha_token"
      await lifecycle.onLocalSignup(req, res, next)
      expect(mockRequestGravity).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({ recaptcha_token: "recaptcha_token" }),
        }),
      )
    })

    it("passes the user agent through signup", async () => {
      req.get.mockReturnValue("foo-agent")
      await lifecycle.onLocalSignup(req, res, next)
      expect(mockRequestGravity).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({ "User-Agent": "foo-agent" }),
        }),
      )
    })

    it("sends invalid email errors as json for xhr requests", async () => {
      req.xhr = true
      mockRequestGravity.mockRejectedValue({
        message: "Bad Request",
        response: {
          body: { error: "Email is invalid." },
          status: 400,
        },
      })

      await lifecycle.onLocalSignup(req, res, next)

      expect(res.status).toHaveBeenCalledWith(403)
      expect(send).toHaveBeenCalledWith({
        error: "Email is invalid.",
        success: false,
      })
    })

    it("redirects invalid email errors for full-page signup requests", async () => {
      mockRequestGravity.mockRejectedValue({
        message: "Bad Request",
        response: {
          body: { error: "Email is invalid." },
          status: 400,
        },
      })

      await lifecycle.onLocalSignup(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(
        "/sign_up?error=Email is invalid.",
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
      passport.authenticate.mockReturnValueOnce((req, res, next) => next())
      req.query["skip-onboarding"] = true
      lifecycle.beforeSocialAuth("facebook")(req, res, next)
      expect(req.session.skipOnboarding).toBe(true)
    })

    it("sets social signup metadata on the session", () => {
      req.query["signup-intent"] = "buy art"
      req.query["signup-referer"] = "auction"
      req.query.accepted_terms_of_service = true
      req.query.agreed_to_receive_emails = false

      lifecycle.beforeSocialAuth("facebook")(req, res, next)

      expect(req.session).toMatchObject({
        accepted_terms_of_service: true,
        agreed_to_receive_emails: false,
        sign_up_intent: "buy art",
        sign_up_referer: "auction",
      })
    })

    it("sets google auth scopes", () => {
      lifecycle.beforeSocialAuth("google")(req, res, next)

      expect(passport.authenticate).toHaveBeenCalledWith("google", {
        scope: ["email", "profile"],
      })
    })

    it("sets apple auth options", () => {
      lifecycle.beforeSocialAuth("apple")(req, res, next)

      expect(passport.authenticate).toHaveBeenCalledWith("apple", {})
    })
  })

  describe("#afterSocialAuth", () => {
    it("passes provider denials to the error handler", () => {
      req.query.denied = true

      lifecycle.afterSocialAuth("facebook")(req, res, next)

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ message: "facebook denied" }),
      )
      expect(passport.authenticate).not.toHaveBeenCalledWith("facebook")
    })

    it("doesn't redirect to / if skip-onboarding is set", () => {
      req.artsyPassportSignedUp = true
      req.session.skipOnboarding = true
      passport.authenticate.mockReturnValueOnce((req, res, next) => next())
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect).not.toHaveBeenCalled()
    })

    it("surfaces blocked by facebook errors", () => {
      passport.authenticate.mockReturnValueOnce((req, res, next) =>
        next(new Error("Unauthorized source IP address")),
      )
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith(
        "/login?error_code=IP_BLOCKED&provider=facebook",
      )
    })

    it("passes random errors to be rendered on the login screen", () => {
      const warn = jest.spyOn(console, "warn").mockImplementation(() => {})
      passport.authenticate.mockReturnValueOnce((req, res, next) =>
        next(new Error("Facebook authorization failed")),
      )
      lifecycle.afterSocialAuth("facebook")(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith(
        "/login?error=An+unknown+error+occurred.+Please+try+again.&error_code=UNKNOWN",
      )
      expect(warn).toHaveBeenCalledWith(
        "Error authenticating with facebook: Facebook authorization failed",
      )
      warn.mockRestore()
    })

    it("surfaces two-factor errors during social login", () => {
      passport.authenticate.mockReturnValueOnce((req, res, next) => {
        next(new Error("missing two-factor authentication code"))
      })

      lifecycle.afterSocialAuth("facebook")(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(
        "/login?error=Please+log+in+with+email+and+password+to+use+two-factor+authentication.&error_code=TWO_FACTOR_AUTHENTICATION_REQUIRED&provider=facebook",
      )
    })

    it("surfaces two-factor errors that may be buried in the error response", () => {
      req.user = { accessToken: "token" }
      passport.authenticate.mockReturnValueOnce((req, res, next) => {
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
        "/settings?error=Social+account+linking+is+not+available+while+two-factor+authentication+is+enabled+on+your+Artsy+account.&error_code=TWO_FACTOR_AUTHENTICATION_ENABLED&provider=facebook",
      )
    })

    it("encodes provider error redirect params", () => {
      req.socialProfileEmail = "user+social@example.com"
      passport.authenticate.mockReturnValueOnce((req, res, next) => {
        const err = {
          response: {
            body: {
              error: "User Already Exists",
            },
          },
        }
        next(err)
      })

      lifecycle.afterSocialAuth("facebook")(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(
        "/login?email=user%2Bsocial%40example.com&error_code=ALREADY_EXISTS&provider=facebook",
      )
    })

    it("redirects previously linked provider errors to login settings guidance", () => {
      passport.authenticate.mockReturnValueOnce((req, res, next) => {
        const err = {
          response: {
            body: {
              error: "User Already Exists",
            },
          },
        }
        next(err)
      })

      lifecycle.afterSocialAuth("google")(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(
        "/login?error_code=PREVIOUSLY_LINKED_SETTINGS&provider=google",
      )
    })

    it("redirects provider accounts linked to another Artsy account", () => {
      req.user = { accessToken: "token" }
      passport.authenticate.mockReturnValueOnce((req, res, next) => {
        const err = {
          response: {
            body: {
              error: "Another Account Already Linked",
            },
          },
        }
        next(err)
      })

      lifecycle.afterSocialAuth("facebook")(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(
        "/settings?error_code=PREVIOUSLY_LINKED&provider=facebook",
      )
    })

    it("redirects back to settings after successful account linking", () => {
      req.user = { accessToken: "token" }
      passport.authenticate.mockReturnValueOnce((req, res, next) => next())

      lifecycle.afterSocialAuth("facebook")(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith("/settings")
      expect(next).not.toHaveBeenCalled()
    })

    describe('with mode "one-tap"', () => {
      it('delegates to the "google-one-tap" passport strategy', () => {
        lifecycle.afterSocialAuth("google", "one-tap")(req, res, next)
        expect(passport.authenticate).toHaveBeenCalledWith("google-one-tap")
      })

      it("sets the suppress cookie on auth error", () => {
        passport.authenticate.mockReturnValueOnce((_req, _res, next) =>
          next(new Error("auth error")),
        )
        lifecycle.afterSocialAuth("google", "one-tap")(req, res, next)
        expect(res.cookie).toHaveBeenCalledWith(
          "g_one_tap_suppress",
          "1",
          expect.objectContaining({ maxAge: expect.any(Number) }),
        )
      })

      it("does not set the suppress cookie on success", () => {
        passport.authenticate.mockReturnValueOnce((_req, _res, next) => next())
        lifecycle.afterSocialAuth("google", "one-tap")(req, res, next)
        expect(res.cookie).not.toHaveBeenCalled()
      })

      it("uses google as the provider in error redirects", () => {
        passport.authenticate.mockReturnValueOnce((_req, _res, next) => {
          next(new Error("Unauthorized source IP address"))
        })
        lifecycle.afterSocialAuth("google", "one-tap")(req, res, next)
        expect(res.redirect).toHaveBeenCalledWith(
          "/login?error_code=IP_BLOCKED&provider=google",
        )
      })
    })
  })

  describe("#ensureLoggedInOnAfterSignupPage", () => {
    it("redirects to the login page, and back, without a user", () => {
      lifecycle.ensureLoggedInOnAfterSignupPage(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith("/login?redirect-to=/")
    })
  })

  describe("#ssoAndRedirectBack", () => {
    beforeEach(() => {
      options.APP_URL = "https://www.artsy.net"
      options.ARTSY_URL = "https://api.artsy.net"
    })

    it("redirects signups to /", async () => {
      req.user = { accessToken: "token" }
      req.artsyPassportSignedUp = true
      mockRequestGravity.mockResolvedValue({
        body: { trust_token: "foo-trust-token" },
      })

      await lifecycle.ssoAndRedirectBack(req, res, next)

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

    it("single signs on to gravity", async () => {
      req.user = { accessToken: "token" }
      req.query["redirect-to"] = "/artwork/andy-warhol-skull"
      mockRequestGravity.mockResolvedValue({
        body: { trust_token: "foo-trust-token" },
      })

      await lifecycle.ssoAndRedirectBack(req, res, next)

      expect(mockRequestGravity).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining("me/trust_token"),
        }),
      )
      expect(res.redirect).toHaveBeenCalledWith(
        "https://api.artsy.net/users/sign_in" +
          "?redirect_uri=https%3A%2F%2Fwww.artsy.net%2Fartwork%2Fandy-warhol-skull" +
          "&trust_token=foo-trust-token",
      )
    })

    it("encodes the redirect uri when single signing on to gravity", async () => {
      req.user = { accessToken: "token" }
      req.query["redirect-to"] = "/artwork/andy-warhol-skull?foo=bar&baz=qux"
      mockRequestGravity.mockResolvedValue({
        body: { trust_token: "foo-trust-token" },
      })

      await lifecycle.ssoAndRedirectBack(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(
        "https://api.artsy.net/users/sign_in" +
          "?redirect_uri=https%3A%2F%2Fwww.artsy.net%2Fartwork%2Fandy-warhol-skull%3Ffoo%3Dbar%26baz%3Dqux" +
          "&trust_token=foo-trust-token",
      )
    })

    it("redirects directly when the SSO trust token request fails", async () => {
      req.user = { accessToken: "token" }
      req.query["redirect-to"] = "/artwork/andy-warhol-skull"
      mockRequestGravity.mockRejectedValue(new Error("fail"))

      await lifecycle.ssoAndRedirectBack(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(
        "https://www.artsy.net/artwork/andy-warhol-skull",
      )
      expect(req.session.redirectTo).toBeUndefined()
      expect(req.session.skipOnboarding).toBeUndefined()
    })

    it("skips SSO for non-Artsy redirect domains", async () => {
      options.APP_URL = "https://force.example"
      req.user = { accessToken: "token" }
      req.query["redirect-to"] = "/about"

      await lifecycle.ssoAndRedirectBack(req, res, next)

      expect(mockRequestGravity).not.toHaveBeenCalled()
      expect(res.redirect).toHaveBeenCalledWith("/about")
    })
  })
})
