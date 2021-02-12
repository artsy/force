import { index, ensureLoggedInUser } from "../routes"

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))
const stichMock = require("@artsy/stitch").stitch as jest.Mock

describe("Personalize routes", () => {
  const mockNext = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("index route", () => {
    const request = {
      app: { get: jest.fn() },
      query: { redirectTo: "" },
      params: { slug: "interests" },
    }
    const response = {
      send: jest.fn(),
      locals: { sd: {} },
    }

    it("renders the personalize app", () => {
      index(request, response, mockNext)

      expect(stichMock.mock.calls[0][0].data.title).toBe("Personalize | Artsy")
      expect(stichMock.mock.calls[0][0].locals.assetPackage).toBe("onboarding")
      expect(mockNext).not.toHaveBeenCalled()
    })
  })

  describe("ensureLoggedInUser route", () => {
    const mockRedirect = jest.fn()

    const request = {}
    const response = {
      locals: { sd: { CURRENT_USER: undefined } },
      redirect: mockRedirect,
    }

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
