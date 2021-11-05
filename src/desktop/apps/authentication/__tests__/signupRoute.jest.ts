/* eslint-disable jest/no-done-callback */
import { FullPageAuthStatic } from "v2/Apps/Authentication/Components/FullPageAuthStatic"
import { signup } from "../routes"

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))
const stitch = require("@artsy/stitch").stitch as jest.Mock

describe("signup", () => {
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

    signup(req, res, next).then(() => {
      expect(next).toHaveBeenCalled()
      done()
    })
  })

  describe("Component", () => {
    it("Returns FullPageAuthStatic component", done => {
      signup(req, res, next).then(() => {
        expect(stitch.mock.calls[0][0].blocks.body).toBe(FullPageAuthStatic)
        done()
      })
    })
  })

  describe("Data", () => {
    describe("Type", () => {
      it("Returns the correct modal.type for /signup path", done => {
        req.path = "/signup"
        signup(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.type).toBe("signup")
          done()
        })
      })
    })

    describe("Meta", () => {
      it("returns the correct title for signup", done => {
        req.path = "/signup"
        signup(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.meta.title).toBe(
            "Signup for Artsy"
          )
          done()
        })
      })
    })

    describe("intent", () => {
      it("returns correct title for save artwork intent", done => {
        req.path = "/signup"
        req.query = {
          intent: "save artwork",
        }
        signup(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.options.copy).toBe(
            "Sign up to save artworks"
          )
          done()
        })
      })

      it("returns correct title for follow partner intent", done => {
        req.path = "/signup"
        req.query = {
          intent: "follow partner",
        }
        signup(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.options.copy).toBe(
            "Sign up to follow partners"
          )
          done()
        })
      })

      it("returns correct title for follow artist intent", done => {
        req.path = "/signup"
        req.query = {
          intent: "follow artist",
        }
        signup(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.options.copy).toBe(
            "Sign up to follow artists"
          )
          done()
        })
      })

      it("returns correct title when other intent provided", done => {
        req.path = "/signup"
        req.query = {
          intent: "viewedEditorial",
        }
        signup(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.options.copy).toBe(
            "Signup for Artsy"
          )
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

      signup(req, res, next).then(() => {
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

      signup(req, res, next).then(() => {
        const { redirectTo } = stitch.mock.calls[0][0].data.options
        expect(redirectTo).toBe("/bar")
        done()
      })
    })

    it("adds destination for static /signup routes", done => {
      req.query = {}
      req.path = "/signup"
      signup(req, res, next).then(() => {
        const { redirectTo, destination } = stitch.mock.calls[0][0].data.options
        expect(destination).toBe("/")
        expect(redirectTo).toBe(undefined)
        done()
      })
    })

    it("respects redirectTo for static /signup routes", done => {
      req.query = {
        redirectTo: "/consign",
      }
      req.path = "/signup"
      signup(req, res, next).then(() => {
        const { redirectTo } = stitch.mock.calls[0][0].data.options
        expect(redirectTo).toBe("/consign")
        done()
      })
    })

    it("can handle old redirect-to redirect params", done => {
      req.query = {
        "redirect-to": "/bar",
      }

      signup(req, res, next).then(() => {
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

      signup(req, res, next).then(() => {
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
