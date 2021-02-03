import { forgotPassword } from "../routes"

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))
const stitch = require("@artsy/stitch").stitch as jest.Mock

describe("forgotPassword", () => {
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

  it("Returns the correct modal.type for /forgot path", done => {
    req.path = "/forgot"
    forgotPassword(req, res, next).then(() => {
      expect(stitch.mock.calls[0][0].data.type).toBe("forgot")
      done()
    })
  })

  it("returns the correct title for forgot", done => {
    req.path = "/forgot"
    forgotPassword(req, res, next).then(() => {
      expect(stitch.mock.calls[0][0].data.meta.title).toBe(
        "Reset your password"
      )
      done()
    })
  })

  it("returns correct title when other intent provided", done => {
    req.path = "/forgot"
    req.query = {
      set_password: "reset",
    }
    forgotPassword(req, res, next).then(() => {
      expect(stitch.mock.calls[0][0].data.options.copy).toBe(
        "Set your password"
      )
      done()
    })
  })
})
