import {
  handleSubmit,
  setCookies,
  getRedirect,
  apiAuthWithRedirectUrl,
} from "../helpers"
import Backbone from "backbone"
import $ from "jquery"
import { ModalType } from "@artsy/reaction/dist/Components/Authentication/Types"
import { ContextModule, AuthIntent } from "@artsy/cohesion"

jest.mock("cookies-js", () => ({
  set: jest.fn(),
}))
const Cookies = require("cookies-js").set as jest.Mock

jest.mock("sharify", () => {
  return {
    data: {
      API_URL: "https://api.example.com",
      APP_URL: "https://app.example.com",
      AP: {
        loginPagePath: "foo",
      },
    },
  }
})
const sd = require("sharify").data

jest.useFakeTimers()

describe("Authentication Helpers", () => {
  beforeEach(() => {
    // @ts-ignore
    window.addEventListener = jest.fn((_type, cb) => cb())
    window.location.assign = jest.fn()
    sd.IS_MOBILE = false
    sd.CURRENT_USER = null
  })

  afterEach(() => {
    // @ts-ignore
    window.addEventListener.mockClear()
  })

  describe("#setCookies", () => {
    beforeEach(() => {
      Cookies.mockClear()
    })

    it("Sets a cookie for afterSignUpAction ", () => {
      setCookies({
        afterSignUpAction: "an action",
      })
      const cookie = Cookies.mock.calls[0]

      expect(cookie[0]).toBe("afterSignUpAction")
      expect(cookie[1]).toMatch("an action")
    })

    it("Sets a cookie with expiration for destination", () => {
      setCookies({
        destination: "/foo",
      })
      const cookie = Cookies.mock.calls[0]

      expect(cookie[0]).toBe("destination")
      expect(cookie[1]).toMatch("/foo")
      expect(cookie[2].expires).toBe(86400)
    })
  })

  describe("#handleSubmit", () => {
    const formikBag = {
      setSubmitting: jest.fn(),
      setStatus: jest.fn(),
    }

    beforeEach(() => {
      Backbone.sync = jest.fn()
      window.analytics = {
        track: jest.fn(),
      } as any
      // @ts-ignore
      global.$ = global.jQuery = $
    })

    it("can login a user", () => {
      handleSubmit(
        ModalType.login,
        {
          contextModule: ContextModule.popUpModal,
          intent: AuthIntent.viewEditorial,
          destination: "/articles",
          triggerSeconds: 2,
        },
        {
          email: "foo@foo.com",
        },
        formikBag
      )

      Backbone.sync.mock.calls[0][2].success({
        user: {
          id: 123,
          accessToken: "foobar",
        },
      })

      expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(false)
    })

    it("can signup a user", () => {
      handleSubmit(
        ModalType.signup,
        {
          contextModule: ContextModule.popUpModal,
          intent: AuthIntent.viewEditorial,
          destination: "/articles",
          triggerSeconds: 2,
        },
        {
          name: "foo",
          email: "foo@foo.com",
          password: "password",
          accepted_terms_of_service: true,
        },
        formikBag
      )

      const user = Backbone.sync.mock.calls[0][1]

      Backbone.sync.mock.calls[0][2].success()
      Backbone.sync.mock.calls[1][2].success({
        user: {
          id: 123,
          accessToken: "foobar",
        },
      })
      expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(false)
      expect(user.get("name")).toBe("foo")
      expect(user.get("email")).toBe("foo@foo.com")
      expect(user.get("password")).toBe("password")
      expect(user.get("accepted_terms_of_service")).toBe(true)
      expect(user.get("agreed_to_receive_emails")).toBe(true)
    })

    it("can handle forgotten passwords", () => {
      handleSubmit(
        ModalType.forgot,
        {
          contextModule: ContextModule.popUpModal,
          intent: AuthIntent.viewEditorial,
          destination: "/articles",
          triggerSeconds: 2,
        },
        {
          email: "foo@foo.com",
        },
        formikBag
      )

      Backbone.sync.mock.calls[0][2].success()
      expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(false)
    })

    it("can handle errors", () => {
      handleSubmit(
        ModalType.login,
        {
          contextModule: ContextModule.popUpModal,
          intent: AuthIntent.viewEditorial,
          destination: "/articles",
          triggerSeconds: 2,
        },
        {
          email: "foo@foo.com",
        },
        formikBag
      )

      Backbone.sync.mock.calls[0][2].error({
        responseJSON: {
          message: "Bad Request",
        },
      })
      expect(formikBag.setStatus.mock.calls[0][0].message).toMatch(
        "Bad Request"
      )
      expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(false)
    })

    it("makes an analytics call on success for login", () => {
      handleSubmit(
        ModalType.login,
        {
          contextModule: ContextModule.popUpModal,
          intent: AuthIntent.viewEditorial,
          destination: "/articles",
          triggerSeconds: 2,
        },
        {
          email: "foo@foo.com",
        },
        formikBag
      )

      Backbone.sync.mock.calls[0][2].success({
        user: {
          id: 123,
          accessToken: "foobar",
        },
      })
      // @ts-ignore
      expect(window.analytics.track).toBeCalledWith("Successfully logged in", {
        action: "Successfully logged in",
        auth_redirect: "/articles",
        context_module: "popUpModal",
        intent: "viewEditorial",
        service: "email",
        trigger: "timed",
        trigger_seconds: 2,
        type: "login",
        user_id: 123,
      })
    })

    it("makes an analytics call on success for signup", () => {
      handleSubmit(
        ModalType.signup,
        {
          contextModule: ContextModule.popUpModal,
          intent: AuthIntent.viewEditorial,
          destination: "/articles",
          triggerSeconds: 2,
        },
        {
          email: "foo@foo.com",
        },
        formikBag
      )

      Backbone.sync.mock.calls[0][2].success()
      Backbone.sync.mock.calls[1][2].success({
        user: {
          id: 123,
          accessToken: "foobar",
        },
      })
      // @ts-ignore
      expect(window.analytics.track).toBeCalledWith("Created account", {
        action: "Created account",
        auth_redirect: "/articles",
        context_module: "popUpModal",
        intent: "viewEditorial",
        service: "email",
        trigger: "timed",
        trigger_seconds: 2,
        type: "signup",
        user_id: 123,
      })
    })
  })

  describe("#apiAuthWithRedirectUrl", () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    describe("when there isn't a current user", () => {
      it("returns the app url, not an api url", () => {
        const response: any = {}
        const redirectPath = new URL("/any-path", "https://app.example.com")

        return apiAuthWithRedirectUrl(response, redirectPath).then(actual => {
          expect(actual.toString()).toMatch("https://app.example.com/any-path")
        })
      })
    })

    describe("when there is a current user", () => {
      describe("when we can get a trust token from the api", () => {
        beforeEach(() => {
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

        it("returns an API URL", () => {
          const response: any = { user: { accessToken: "some-access-token" } }
          const redirectPath = new URL("/any-path", "https://app.example.com")

          return apiAuthWithRedirectUrl(response, redirectPath).then(actual => {
            expect(actual.toString()).toMatch("https://api.example.com")
          })
        })

        it("returns with an application URL as the redirect uri", () => {
          const response: any = { user: { accessToken: "some-access-token" } }
          const redirectPath = new URL(
            "/any-path?withQueryParams=true",
            "https://app.example.com"
          )
          const expectedRedirectUri = encodeURIComponent(
            "https://app.example.com/any-path?withQueryParams=true"
          )

          return apiAuthWithRedirectUrl(response, redirectPath).then(actual => {
            expect(actual.toString()).toMatch(
              `redirect_uri=${expectedRedirectUri}`
            )
          })
        })

        it("returns with the trust token from the api", () => {
          const response: any = { user: { accessToken: "some-access-token" } }
          const redirectPath = new URL("/any-path", "https://app.example.com")

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
          const redirectPath = new URL("/any-path", "https://app.example.com")

          return apiAuthWithRedirectUrl(response, redirectPath).then(actual => {
            expect(actual.toString()).toMatch(
              "https://app.example.com/any-path"
            )
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
          const redirectPath = new URL("/any-path", "https://app.example.com")

          return apiAuthWithRedirectUrl(response, redirectPath).then(actual => {
            expect(actual.toString()).toMatch(
              "https://app.example.com/any-path"
            )
          })
        })
      })
    })
  })

  describe("#getRedirect", () => {
    it("Returns home if type is login and path is login", () => {
      window.history.pushState({}, "", "/login")
      const redirectTo = getRedirect("login")
      expect(redirectTo.toString()).toBe("https://app.example.com/")
    })

    it("Returns home if type is forgot", () => {
      window.history.pushState({}, "", "/forgot")
      const redirectTo = getRedirect("forgot")
      expect(redirectTo.toString()).toBe("https://app.example.com/")
    })

    it("Returns /personalize if type is signup", () => {
      const redirectTo = getRedirect("signup")
      expect(redirectTo.toString()).toBe("https://app.example.com/personalize")
    })

    it("Returns window.location by default", () => {
      window.history.pushState({}, "", "/magazine")
      const redirectTo = getRedirect("login")

      expect(redirectTo.toString()).toBe("https://artsy.net/magazine")
    })
  })
})
