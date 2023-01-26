import {
  apiAuthWithRedirectUrl,
  getRedirect,
  handleSubmit,
  isAbleToTriggerOnboarding,
  maybeUpdateRedirectTo,
  setCookies,
  updateURLWithOnboardingParam,
} from "Apps/Authentication/Legacy/Utils/helpers"
import {
  COMMERCIAL_AUTH_INTENTS,
  ModalType,
} from "Components/Authentication/Types"
import { ContextModule, Intent } from "@artsy/cohesion"
import { mockLocation } from "DevTools/mockLocation"
import { mediator } from "Server/mediator"
import { getENV } from "Utils/getENV"

jest.mock("cookies-js", () => ({
  set: jest.fn(),
  get: jest.fn().mockReturnValue("csrf-token"),
}))
const CookiesSet = require("cookies-js").set as jest.Mock
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

jest.mock("sharify", () => {
  return {
    data: {
      API_URL: "https://api.artsy.net",
      APP_URL: "https://artsy.net",
      AP: {
        loginPagePath: "/login",
        signupPagePath: "/signup",
      },
      SESSION_ID: "session-id",
      SET_PASSWORD: "true",
      RESET_PASSWORD_REDIRECT_TO: "/fairs",
    },
  }
})

describe("Authentication Helpers", () => {
  describe("isAbleToTriggerOnboarding", () => {
    it("returns true if the user is able to trigger onboarding", () => {
      expect(isAbleToTriggerOnboarding({ type: ModalType.signup })).toBe(true)

      expect(isAbleToTriggerOnboarding({ type: ModalType.login })).toBe(false)

      expect(isAbleToTriggerOnboarding({ type: ModalType.forgot })).toBe(false)

      expect(
        isAbleToTriggerOnboarding({
          type: ModalType.signup,
          intent: Intent.buyNow,
        })
      ).toBe(false)

      expect(
        isAbleToTriggerOnboarding({
          type: ModalType.login,
          intent: Intent.buyNow,
        })
      ).toBe(false)

      expect(
        isAbleToTriggerOnboarding({
          type: ModalType.signup,
          intent: Intent.followGene,
        })
      ).toBe(true)

      COMMERCIAL_AUTH_INTENTS.forEach(intent => {
        expect(
          isAbleToTriggerOnboarding({
            type: ModalType.signup,
            intent,
          })
        ).toBe(false)
      })
    })
  })

  const mockGetENV = getENV as jest.Mock

  beforeEach(() => {
    mockLocation({
      pathname: "/articles",
      href: "/articles",
    })
    CookiesSet.mockClear()
    window.analytics = { track: jest.fn() } as any
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () =>
          Promise.resolve({
            trust_token: "a-trust-token",
            issued_at: "some-datetime",
            expires_in: "some-datetime",
          }),
      })
    )

    mockGetENV.mockImplementation(key => {
      switch (key) {
        case "APP_URL":
          return "https://artsy.net"
        case "ALLOWED_REDIRECT_HOSTS":
          return "off.artsy.net"
      }
    })
  })

  describe("#setCookies", () => {
    it("Sets a cookie for afterSignUpAction", () => {
      setCookies({
        afterSignUpAction: "an action",
      })
      const cookie = CookiesSet.mock.calls[0]

      expect(cookie[0]).toBe("afterSignUpAction")
      expect(cookie[1]).toMatch("an action")
    })
  })

  describe("#handleSubmit", () => {
    let formikBag
    beforeEach(() => {
      formikBag = {
        setSubmitting: jest.fn(),
        setStatus: jest.fn(),
      }
      jest.spyOn(mediator, "trigger")
    })

    it("can login a user", async () => {
      // @ts-ignore
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
            }),
        })
      )
      await handleSubmit(
        ModalType.login,
        {
          contextModule: ContextModule.popUpModal,
          intent: Intent.viewEditorial,
          triggerSeconds: 2,
          redirectTo: "/articles",
        },
        {
          email: "foo@foo.com",
          password: "password", // pragma: allowlist secret
          otp_attempt: 123456,
        },
        formikBag
      ).then(() => {
        // @ts-ignore
        const [url, request] = global.fetch.mock.calls[0]

        expect(url).toBe("https://artsy.net/login")
        expect(JSON.parse(request.body)).toEqual({
          _csrf: "csrf-token",
          email: "foo@foo.com",
          otp_attempt: 123456,
          password: "password", // pragma: allowlist secret
          session_id: "session-id",
        })
        expect(formikBag.setSubmitting).toBeCalledWith(false)
        expect((window.analytics?.track as jest.Mock).mock.calls[0])
          .toMatchInlineSnapshot(`
            Array [
              "successfullyLoggedIn",
              Object {
                "auth_redirect": "/articles",
                "context_module": "popUpModal",
                "intent": "viewEditorial",
                "modal_copy": undefined,
                "service": "email",
                "trigger": "timed",
                "trigger_seconds": 2,
                "type": "login",
                "user_id": undefined,
              },
              Object {},
            ]
          `)
        expect(window.location.assign).toBeCalledWith(
          "https://artsy.net/articles"
        )
      })
    })

    it("can signup a user", async () => {
      // @ts-ignore
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
            }),
        })
      )
      await handleSubmit(
        ModalType.signup,
        {
          contextModule: ContextModule.popUpModal,
          intent: Intent.viewEditorial,
          triggerSeconds: 2,
          redirectTo: "/articles",
        },
        {
          name: "foo",
          email: "foo@foo.com",
          password: "password", // pragma: allowlist secret
          accepted_terms_of_service: true,
          agreed_to_receive_emails: true,
        },
        formikBag
      ).then(() => {
        // @ts-ignore
        const [url, request] = global.fetch.mock.calls[0]

        expect(url).toBe("https://artsy.net/signup")
        expect(JSON.parse(request.body)).toEqual({
          _csrf: "csrf-token",
          name: "foo",
          email: "foo@foo.com",
          password: "password", // pragma: allowlist secret
          session_id: "session-id",
          signupIntent: "viewEditorial",
          accepted_terms_of_service: true,
          agreed_to_receive_emails: true,
        })
        expect(formikBag.setSubmitting).toBeCalledWith(false)
        expect((window.analytics?.track as jest.Mock).mock.calls[0])
          .toMatchInlineSnapshot(`
            Array [
              "createdAccount",
              Object {
                "auth_redirect": "/articles",
                "context_module": "popUpModal",
                "intent": "viewEditorial",
                "modal_copy": undefined,
                "onboarding": true,
                "service": "email",
                "trigger": "timed",
                "trigger_seconds": 2,
                "type": "signup",
                "user_id": undefined,
              },
              Object {},
            ]
          `)
        expect(window.location.assign).toBeCalledWith(
          "https://artsy.net/articles?onboarding=true"
        )
      })
    })

    it("can handle forgotten passwords", async () => {
      // @ts-ignore
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          ok: true,
          json: () =>
            Promise.resolve({
              status: "success",
            }),
        })
      )
      await handleSubmit(
        ModalType.forgot,
        {
          contextModule: ContextModule.popUpModal,
          intent: Intent.viewEditorial,
          triggerSeconds: 2,
          redirectTo: "/articles",
        },
        {
          email: "foo@foo.com",
        },
        formikBag
      ).then(() => {
        // @ts-ignore
        const [url, request] = global.fetch.mock.calls[0]

        expect(url).toBe(
          "https://api.artsy.net/api/v1/users/send_reset_password_instructions"
        )
        expect(JSON.parse(request.body)).toEqual({
          email: "foo@foo.com",
          session_id: "session-id",
          mode: "fair_set_password",
          reset_password_redirect_to: "/fairs",
        })
        expect(formikBag.setSubmitting).toBeCalledWith(false)
        expect((window.analytics?.track as jest.Mock).mock.calls[0])
          .toMatchInlineSnapshot(`
            Array [
              "resetYourPassword",
              Object {
                "auth_redirect": "/articles",
                "context_module": "popUpModal",
                "intent": "viewEditorial",
                "modal_copy": undefined,
                "service": "email",
                "trigger": "timed",
                "trigger_seconds": 2,
                "type": "forgot",
              },
              Object {},
            ]
          `)

        expect(window.location.assign).toBeCalledWith(
          "https://artsy.net/articles"
        )
      })
    })

    it("can handle errors", async () => {
      // @ts-ignore
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          ok: true,
          json: () =>
            Promise.resolve({
              message: "Incorrect email or password",
            }),
        })
      )
      await handleSubmit(
        ModalType.login,
        {
          contextModule: ContextModule.popUpModal,
          intent: Intent.viewEditorial,
          triggerSeconds: 2,
        },
        {
          email: "foo@foo.com",
        },
        formikBag
      ).then(() => {
        expect(formikBag.setStatus).toBeCalledWith({
          message: "Incorrect email or password",
        })
        expect(formikBag.setSubmitting).toBeCalledWith(false)
        expect(mediator.trigger).toBeCalledWith(
          "auth:error",
          "Incorrect email or password"
        )
      })
    })

    it("can handle a redirectTo that is outside of artsy.net", async () => {
      // @ts-ignore
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
            }),
        })
      )
      await handleSubmit(
        ModalType.login,
        {
          contextModule: ContextModule.popUpModal,
          intent: Intent.viewEditorial,
          redirectTo:
            "https://api.artsy.net/oauth2/authorize?response_type=code&redirect_uri=https%3A%2F%2Flive-staging.artsy.net%2Fauth-callback&client_id=foo",
        },
        {
          email: "foo@foo.com",
          password: "password", // pragma: allowlist secret
          otp_attempt: 123456,
        },
        formikBag
      ).then(() => {
        // @ts-ignore
        const [url, request] = global.fetch.mock.calls[0]

        expect(url).toBe("https://artsy.net/login")
        expect(JSON.parse(request.body)).toEqual({
          _csrf: "csrf-token",
          email: "foo@foo.com",
          otp_attempt: 123456,
          password: "password", // pragma: allowlist secret
          session_id: "session-id",
        })
        expect(formikBag.setSubmitting).toBeCalledWith(false)
        expect((window.analytics?.track as jest.Mock).mock.calls[0])
          .toMatchInlineSnapshot(`
            Array [
              "successfullyLoggedIn",
              Object {
                "auth_redirect": "https://api.artsy.net/oauth2/authorize?response_type=code&redirect_uri=https%3A%2F%2Flive-staging.artsy.net%2Fauth-callback&client_id=foo",
                "context_module": "popUpModal",
                "intent": "viewEditorial",
                "modal_copy": undefined,
                "service": "email",
                "trigger": "timed",
                "trigger_seconds": undefined,
                "type": "login",
                "user_id": undefined,
              },
              Object {},
            ]
          `)
        expect(window.location.assign).toBeCalledWith(
          "/auth-redirect?redirectTo=https%3A%2F%2Fapi.artsy.net%2Foauth2%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Flive-staging.artsy.net%252Fauth-callback%26client_id%3Dfoo"
        )
      })
    })
  })

  describe("#apiAuthWithRedirectUrl", () => {
    describe("when there isn't a current user", () => {
      it("returns the app url, not an api url", () => {
        const response: any = {}
        const redirectPath = new URL("/any-path", "https://artsy.net")

        return apiAuthWithRedirectUrl(response, redirectPath).then(actual => {
          expect(actual.toString()).toMatch("https://artsy.net/any-path")
        })
      })
    })

    describe("when there is a current user", () => {
      describe("when we can get a trust token from the api", () => {
        it("returns an API URL", () => {
          const response: any = { user: { accessToken: "some-access-token" } }
          const redirectPath = new URL("/any-path", "https://artsy.net")

          return apiAuthWithRedirectUrl(response, redirectPath).then(actual => {
            expect(actual.toString()).toMatch(
              "https://api.artsy.net/users/sign_in?trust_token=a-trust-token&redirect_uri=https%3A%2F%2Fartsy.net%2Fany-path"
            )
          })
        })

        it("returns with an application URL as the redirect uri", () => {
          const response: any = { user: { accessToken: "some-access-token" } }
          const redirectPath = new URL(
            "/any-path?withQueryParams=true",
            "https://artsy.net"
          )
          const expectedRedirectUri = encodeURIComponent(
            "https://artsy.net/any-path?withQueryParams=true"
          )

          return apiAuthWithRedirectUrl(response, redirectPath).then(actual => {
            expect(actual.toString()).toMatch(
              `redirect_uri=${expectedRedirectUri}`
            )
          })
        })

        it("returns with the trust token from the api", () => {
          const response: any = { user: { accessToken: "some-access-token" } }
          const redirectPath = new URL("/any-path", "https://artsy.net")

          return apiAuthWithRedirectUrl(response, redirectPath).then(actual => {
            expect(actual.toString()).toMatch("trust_token=a-trust-token")
          })
        })
      })

      describe("when we aren't authorized to get a trust token from the api", () => {
        beforeEach(() => {
          // @ts-ignore
          global.fetch = jest.fn(() =>
            Promise.resolve({
              status: 401,
              ok: false,
              json: () =>
                Promise.resolve({
                  error: "Unauthorized",
                  text: "The access token is invalid or has expired.",
                }),
            })
          )
        })

        it("returns the app URL, not the api url", () => {
          const response: any = { user: { accessToken: "some-access-token" } }
          const redirectPath = new URL("/any-path", "https://artsy.net")

          return apiAuthWithRedirectUrl(response, redirectPath).then(actual => {
            expect(actual.toString()).toMatch("https://artsy.net/any-path")
          })
        })
      })

      describe("when the api is down", () => {
        beforeEach(() => {
          // @ts-ignore
          global.fetch = jest.fn(() =>
            Promise.resolve(new Error("gravity is down"))
          )
        })

        it("returns the app URL, not the api url", () => {
          const response: any = { user: { accessToken: "some-access-token" } }
          const redirectPath = new URL("/any-path", "https://artsy.net")

          return apiAuthWithRedirectUrl(response, redirectPath).then(actual => {
            expect(actual.toString()).toMatch("https://artsy.net/any-path")
          })
        })
      })
    })
  })

  describe("#getRedirect", () => {
    it("Returns home if type is login and path is login", () => {
      mockLocation({
        href: "/login",
        pathname: "/login",
      })
      const redirectTo = getRedirect("login")
      expect(redirectTo.toString()).toBe("https://artsy.net/")
    })

    it("Returns home if type is forgot", () => {
      mockLocation({
        href: "/forgot",
        pathname: "/forgot",
      })
      const redirectTo = getRedirect("forgot")
      expect(redirectTo.toString()).toBe("https://artsy.net/")
    })

    it("Returns with `onboarding=true` if type is signup", () => {
      const redirectTo = getRedirect("signup")
      expect(redirectTo.toString()).toBe("https://artsy.net/?onboarding=true")
    })

    it("Returns window.location by default", () => {
      const redirectTo = getRedirect("login")
      expect(redirectTo.toString()).toBe("https://artsy.net/articles")
    })
  })

  describe("#maybeUpdateRedirectTo", () => {
    const originalRedirect = "http://test.com"

    it.each([ModalType.forgot, ModalType.login])(
      "returns original redirectTo if not signup",
      type => {
        const redirectTo = maybeUpdateRedirectTo(
          type,
          "http://test.com",
          Intent.followArtist
        )
        expect(redirectTo).toEqual(originalRedirect)
      }
    )

    it.each(COMMERCIAL_AUTH_INTENTS)(
      "returns original redirectTo if signup and commercial intent",
      intent => {
        const redirectTo = maybeUpdateRedirectTo(
          ModalType.signup,
          "http://test.com",
          intent
        )
        expect(redirectTo).toEqual(originalRedirect)
      }
    )

    it("returns redirectTo with onboarding flag if signup and non-commercial intent", () => {
      const redirectTo = maybeUpdateRedirectTo(
        ModalType.signup,
        "http://test.com",
        Intent.followArtist
      )
      expect(redirectTo).toEqual(originalRedirect + "?onboarding=true")
    })

    it("preserves existing query params", () => {
      let redirectTo = maybeUpdateRedirectTo(
        ModalType.signup,
        "http://test.com",
        Intent.followArtist
      )
      expect(redirectTo).toEqual(originalRedirect + "?onboarding=true")

      redirectTo = maybeUpdateRedirectTo(
        ModalType.signup,
        "http://test.com?foo=true",
        Intent.followArtist
      )
      expect(redirectTo).toEqual(originalRedirect + "?foo=true&onboarding=true")

      redirectTo = maybeUpdateRedirectTo(
        ModalType.signup,
        "http://test.com?foo=true&bar=true",
        Intent.followArtist
      )
      expect(redirectTo).toEqual(
        originalRedirect + "?foo=true&bar=true&onboarding=true"
      )
    })
  })

  describe("#updateURLWithOnboardingParam", () => {
    it("adds the onboarding param to the url", () => {
      expect(updateURLWithOnboardingParam("https://artsy.net")).toEqual(
        "https://artsy.net?onboarding=true"
      )
    })

    it("preserves existing query params", () => {
      expect(
        updateURLWithOnboardingParam("https://artsy.net?foo=true")
      ).toEqual("https://artsy.net?foo=true&onboarding=true")

      expect(
        updateURLWithOnboardingParam("https://artsy.net?foo=true&bar=true")
      ).toEqual("https://artsy.net?foo=true&bar=true&onboarding=true")
    })
  })
})
