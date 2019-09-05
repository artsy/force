import { bidderRegistration } from "./routes"
import { stitch } from "@artsy/stitch"

jest.mock("reaction/Artsy/Router/server", () => {
  return { buildServerApp: () => ({}) }
})

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))

describe("Reaction Auction app routes", () => {
  describe("bidderRegistration", () => {
    let req
    let res
    const mockSend = jest.fn()
    const mockRedirect = jest.fn()
    const mockNext = jest.fn()
    const mockStitch = stitch as jest.Mock
    const layout = "<marquee>Welcome to Artsy</marquee>"

    beforeEach(() => {
      jest.resetAllMocks()
      req = {
        query: {},
        header: jest.fn(),
        originalUrl: "testurl.artsy.net/auction-registration/deluxe-art-sale",
      }
      res = {
        locals: { sd: { CURRENT_USER: { access_token: "1" } } },
        redirect: mockRedirect,
        status: () => ({ send: mockSend }),
      }
      mockStitch.mockResolvedValue(layout)
    })

    describe("?accepted-conditions=true query param is present", () => {
      beforeEach(() => {
        req.query["accepted-conditions"] = "true"
      })

      it("defers handling using next() if the accepted-conditions=true query param is present", async () => {
        await bidderRegistration(req, res, mockNext)
        expect(mockNext).toHaveBeenCalledWith()
        expect(mockSend).not.toHaveBeenCalled()
      })
    })

    describe("?accepted-conditions=true query param is not present", () => {
      beforeEach(() => {
        req.query = {}
      })

      it("redirects if user is not present", async () => {
        delete res.locals.sd.CURRENT_USER
        await bidderRegistration(req, res, mockNext)
        expect(mockRedirect).toHaveBeenCalledWith(
          "/login?redirectTo=testurl.artsy.net%2Fauction-registration%2Fdeluxe-art-sale"
        )
        expect(mockSend).not.toHaveBeenCalled()
      })

      it("does not defer handling", async () => {
        await bidderRegistration(req, res, mockNext)
        expect(mockNext).not.toHaveBeenCalled()
        expect(mockSend).toHaveBeenCalledWith(layout)
      })
    })
  })
})
