import { index, ensureLoggedInUser } from "../routes"
const CurrentUser = require("desktop/models/current_user")

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))
const stichMock = require("@artsy/stitch").stitch as jest.Mock

describe("Personalize routes", () => {
  let req
  let res
  const next = jest.fn()

  beforeEach(() => {
    req = {
      body: {},
      params: { slug: "interests" },
      redirect: jest.fn(),
      user: new CurrentUser({
        name: "user",
      }),
      app: { get: jest.fn() },
      query: {
        redirectTo: "",
      },
    }
    res = {
      send: jest.fn(),
      locals: {
        sd: {},
      },
    }
  })

  describe("index route", () => {
    it("renders the personalize app", () => {
      index(req, res, next)
      expect(stichMock.mock.calls[0][0].data.title).toBe("Personalize | Artsy")
      expect(stichMock.mock.calls[0][0].locals.assetPackage).toBe("onboarding")
    })
  })

  describe("ensureLoggedInUser route", () => {
    const mockNext = jest.fn()
    const mockRedirect = jest.fn()

    const request = {}
    const response = {
      locals: { sd: { CURRENT_USER: undefined } },
      redirect: mockRedirect,
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it("redirects when there is no current user", () => {
      response.locals.sd.CURRENT_USER = undefined

      ensureLoggedInUser(request, response, mockNext)

      expect(mockRedirect).toBeCalledWith("/personalize")
      expect(mockNext).not.toHaveBeenCalled()
    })

    it("calls next when there is a user", () => {
      response.locals.sd.CURRENT_USER = {}

      ensureLoggedInUser(request, response, mockNext)

      expect(mockRedirect).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalled()
    })
  })
})
