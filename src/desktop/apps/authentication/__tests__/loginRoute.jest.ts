/* eslint-disable jest/no-done-callback */

import { FullPageAuthStatic } from "v2/Apps/Authentication/Components/FullPageAuthStatic"
import { login } from "../routes"

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))
const stitch = require("@artsy/stitch").stitch as jest.Mock

describe("login", () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = {
      body: {},
      get: jest.fn(),
      header: () => "referrer",
      path: "/",
      query: {},
    }
    res = {
      cookie: jest.fn(),
      locals: {
        sd: {
          IS_MOBILE: false,
        },
      },
      send: jest.fn(),
    }
    next = jest.fn()
    stitch.mockReset()
  })

  it("calls next if #stitch returns an error", done => {
    stitch.mockImplementationOnce(() => {
      throw new Error("A new error")
    })

    login(req, res, next).then(() => {
      expect(next).toHaveBeenCalled()
      done()
    })
  })

  describe("Component", () => {
    it("Returns FullPageAuthStatic component", done => {
      login(req, res, next).then(() => {
        expect(stitch.mock.calls[0][0].blocks.body).toBe(FullPageAuthStatic)
        done()
      })
    })
  })

  describe("Data", () => {
    describe("Type", () => {
      it("Returns login type by default", done => {
        login(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.type).toBe("login")
          done()
        })
      })

      it("Returns the correct modal.type for /login path", done => {
        req.path = "/login"
        login(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.type).toBe("login")
          done()
        })
      })
    })

    describe("Meta", () => {
      it("returns the correct title for login", done => {
        login(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.meta.title).toBe("Login to Artsy")
          done()
        })
      })
    })

    it("Options returns all expected fields from query", done => {
      req.query = {
        action: "follow",
        contextModule: "artistHeader",
        copy: "Sign up to follow David Zwirner",
        intent: "followPartner",
        kind: "profile",
        mode: "signup",
        objectId: "david-zwirner",
        "redirect-to": "/david-zwirner",
      }

      login(req, res, next).then(() => {
        const {
          action,
          contextModule,
          copy,
          intent,
          kind,
          objectId,
          redirectTo,
        } = stitch.mock.calls[0][0].data.options
        expect(action).toBe("follow")
        expect(contextModule).toBe("artistHeader")
        expect(copy).toBe("Sign up to follow David Zwirner")
        expect(intent).toBe("followPartner")
        expect(kind).toBe("profile")
        expect(objectId).toBe("david-zwirner")
        expect(redirectTo).toBe("/david-zwirner")
        done()
      })
    })

    it("can handle old redirect_uri redirect params", done => {
      req.query = {
        redirect_uri: "/bar",
      }

      login(req, res, next).then(() => {
        const { redirectTo } = stitch.mock.calls[0][0].data.options
        expect(redirectTo).toBe("/bar")
        done()
      })
    })

    it("adds destination for static /login routes", done => {
      req.query = {}
      req.path = "/login"
      login(req, res, next).then(() => {
        const { redirectTo, destination } = stitch.mock.calls[0][0].data.options
        expect(destination).toBe("/")
        expect(redirectTo).toBe(undefined)
        done()
      })
    })

    it("respects redirectTo for static /login routes", done => {
      req.query = {
        redirectTo: "/consign",
      }
      req.path = "/login"
      login(req, res, next).then(() => {
        const { redirectTo } = stitch.mock.calls[0][0].data.options
        expect(redirectTo).toBe("/consign")
        done()
      })
    })

    it("can handle old redirect-to redirect params", done => {
      req.query = {
        "redirect-to": "/bar",
      }

      login(req, res, next).then(() => {
        const { redirectTo } = stitch.mock.calls[0][0].data.options
        expect(redirectTo).toBe("/bar")
        done()
      })
    })

    it("Sets afterSignUpAction cookie if corresponding query params are present", done => {
      req.query = {
        action: "follow",
        destination: "/foo",
        kind: "artist",
        objectId: "123",
        redirectTo: "/bar",
        signupReferer: "referrer",
      }

      login(req, res, next).then(() => {
        expect(res.cookie.mock.calls[0][1]).toBe(
          JSON.stringify({
            action: "follow",
            kind: "artist",
            objectId: "123",
          })
        )
        done()
      })
    })
  })
})
