import {
  apiAuthWithRedirectUrl,
  getRedirect,
  handleSubmit,
  setCookies,
} from "../helpers"
import { ModalType } from "v2/Components/Authentication/Types"
import { ContextModule, Intent } from "@artsy/cohesion"
import { mockLocation } from "v2/DevTools/mockLocation"
import { mediator } from "lib/mediator"

jest.mock("cookies-js", () => ({
  get: jest.fn().mockReturnValue("csrf-token"),
  set: jest.fn(),
}))
const CookiesSet = require("cookies-js").set as jest.Mock

jest.mock("sharify", () => {
  return {
    data: {
      AP: {
        loginPagePath: "/login",
        signupPagePath: "/signup",
      },
      API_URL: "https://api.artsy.net",
      APP_URL: "https://artsy.net",
      RESET_PASSWORD_REDIRECT_TO: "/fairs",
      SESSION_ID: "session-id",
      SET_PASSWORD: "true",
    },
  }
})

describe("Authentication Helpers", () => {
  beforeEach(() => {
    mockLocation({
      href: "/articles",
      pathname: "/articles",
    })
    CookiesSet.mockClear()
    window.analytics = { track: jest.fn() } as any
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            expires_in: "some-datetime",
            issued_at: "some-datetime",
            trust_token: "a-trust-token",
          }),
        ok: true,
        status: 200,
      })
    )
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

    it("Sets a cookie with expiration for destination", () => {
      setCookies({
        destination: "/foo",
      })
      const cookie = CookiesSet.mock.calls[0]

      expect(cookie[0]).toBe("destination")
      expect(cookie[1]).toMatch("/foo")
      expect(cookie[2].expires).toBe(86400)
    })
  })

  describe("#handleSubmit", () => {
    let formikBag
    beforeEach(() => {
      formikBag = {
        setStatus: jest.fn(),
        setSubmitting: jest.fn(),
      }
      jest.spyOn(mediator, "trigger")
    })

    it("can login a user", async () => {
      // @ts-ignore
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              success: true,
            }),
          ok: true,
          status: 200,
        })
      )
      await handleSubmit(
        ModalType.login,
        {
          contextModule: ContextModule.popUpModal,
          destination: "/articles",
          intent: Intent.viewEditorial,
          triggerSeconds: 2,
        },
        {
          email: "foo@foo.com",
          otp_attempt: 123456,
          password: "password",
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
          password: "password",
          session_id: "session-id",
        })
        expect(formikBag.setSubmitting).toBeCalledWith(false)
        expect(window.analytics.track).toBeCalledWith("successfullyLoggedIn", {
          auth_redirect: "/articles",
          context_module: "popUpModal",
          intent: "viewEditorial",
          modal_copy: undefined,
          service: "email",
          trigger: "timed",
          trigger_seconds: 2,
          type: "login",
          user_id: undefined,
        })
        expect(window.location.assign).toBeCalledWith(
          "https://artsy.net/articles"
        )
      })
    })

    it("can signup a user", async () => {
      // @ts-ignore
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              success: true,
            }),
          ok: true,
          status: 200,
        })
      )
      await handleSubmit(
        ModalType.signup,
        {
          contextModule: ContextModule.popUpModal,
          destination: "/articles",
          intent: Intent.viewEditorial,
          triggerSeconds: 2,
        },
        {
          accepted_terms_of_service: true,
          email: "foo@foo.com",
          name: "foo",
          password: "password",
        },
        formikBag
      ).then(() => {
        // @ts-ignore
        const [url, request] = global.fetch.mock.calls[0]

        expect(url).toBe("https://artsy.net/signup")
        expect(JSON.parse(request.body)).toEqual({
          _csrf: "csrf-token",
          accepted_terms_of_service: true,
          agreed_to_receive_emails: true,
          email: "foo@foo.com",
          name: "foo",
          password: "password",
          session_id: "session-id",
          signupIntent: "viewEditorial",
        })
        expect(formikBag.setSubmitting).toBeCalledWith(false)
        expect(window.analytics.track).toBeCalledWith("createdAccount", {
          auth_redirect: "/articles",
          context_module: "popUpModal",
          intent: "viewEditorial",
          modal_copy: undefined,
          onboarding: true,
          service: "email",
          trigger: "timed",
          trigger_seconds: 2,
          type: "signup",
          user_id: undefined,
        })
        expect(window.location.assign).toBeCalledWith(
          "https://artsy.net/personalize"
        )
      })
    })

    it("can handle forgotten passwords", async () => {
      // @ts-ignore
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              status: "success",
            }),
          ok: true,
          status: 200,
        })
      )
      await handleSubmit(
        ModalType.forgot,
        {
          contextModule: ContextModule.popUpModal,
          destination: "/articles",
          intent: Intent.viewEditorial,
          triggerSeconds: 2,
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
          mode: "fair_set_password",
          reset_password_redirect_to: "/fairs",
          session_id: "session-id",
        })
        expect(formikBag.setSubmitting).toBeCalledWith(false)
        expect(window.analytics.track).toBeCalledWith("resetYourPassword", {
          auth_redirect: "/articles",
          context_module: "popUpModal",
          intent: "viewEditorial",
          modal_copy: undefined,
          service: "email",
          trigger: "timed",
          trigger_seconds: 2,
          type: "forgot",
        })
        expect(window.location.assign).toBeCalledWith(
          "https://artsy.net/articles"
        )
      })
    })

    it("can handle errors", async () => {
      // @ts-ignore
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              message: "Incorrect email or password",
            }),
          ok: true,
          status: 200,
        })
      )
      await handleSubmit(
        ModalType.login,
        {
          contextModule: ContextModule.popUpModal,
          destination: "/articles",
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
              "https://api.artsy.net/users/sign_in?redirect_uri=https%3A%2F%2Fartsy.net%2Fany-path&trust_token=a-trust-token"
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
              json: () =>
                Promise.resolve({
                  error: "Unauthorized",
                  text: "The access token is invalid or has expired.",
                }),
              ok: false,
              status: 401,
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

    it("Returns /personalize if type is signup", () => {
      const redirectTo = getRedirect("signup")
      expect(redirectTo.toString()).toBe("https://artsy.net/personalize")
    })

    it("Returns window.location by default", () => {
      const redirectTo = getRedirect("login")
      expect(redirectTo.toString()).toBe("https://artsy.net/articles")
    })
  })
})
