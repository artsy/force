import { bidderRegistration } from "./routes"

describe("Reaction Auction app routes", () => {
  describe("bidderRegistration", () => {
    it("defers handling using next() if the accepted-conditions=true query param is present", () => {
      const req = { query: { "accepted-conditions": "true" } }
      const res = {}
      const next = jest.fn()
      bidderRegistration(req, res, next)
      expect(next).toHaveBeenCalledWith()
    })
  })
})
