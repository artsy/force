import { index, ensureLoggedInUser, ensureValidStep } from "../routes"

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

  describe("ensureValidStep route", () => {
    const mockRedirect = jest.fn()

    const request = { params: { slug: "" } }
    const response = {
      redirect: mockRedirect,
    }

    it("redirects when there is no current user", () => {
      request.params.slug = "invalid"

      ensureValidStep(request, response, mockNext)

      expect(mockRedirect).toBeCalledWith("/personalize/interests")
      expect(mockNext).not.toHaveBeenCalled()
    })

    it("calls next when there is a user", () => {
      request.params.slug = "artists"

      ensureValidStep(request, response, mockNext)

      expect(mockRedirect).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalled()
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

      expect(mockRedirect).toBeCalledWith(
        "/login?redirect-to=/personalize/interests"
      )
      expect(mockNext).not.toHaveBeenCalled()
    })

    it("calls next when there is a user", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      response.locals.sd.CURRENT_USER = {}

      ensureLoggedInUser(request, response, mockNext)

      expect(mockRedirect).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalled()
    })
  })
})
