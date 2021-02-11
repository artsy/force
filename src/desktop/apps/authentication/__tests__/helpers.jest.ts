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
  set: jest.fn(),
  get: jest.fn().mockReturnValue("csrf-token"),
}))
const CookiesSet = require("cookies-js").set as jest.Mock

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
          destination: "/articles",
          triggerSeconds: 2,
        },
        {
          email: "foo@foo.com",
          password: "password",
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
          destination: "/articles",
          triggerSeconds: 2,
        },
        {
          name: "foo",
          email: "foo@foo.com",
          password: "password",
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
          password: "password",
          session_id: "session-id",
          signupIntent: "viewEditorial",
          accepted_terms_of_service: true,
          agreed_to_receive_emails: true,
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
          destination: "/articles",
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
          session_id: "session-id",
          mode: "fair_set_password",
          reset_password_redirect_to: "/fairs",
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
          destination: "/articles",
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
