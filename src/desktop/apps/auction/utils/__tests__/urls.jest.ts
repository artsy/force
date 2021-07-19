import * as urls from "desktop/apps/auction/utils/urls"

jest.mock("sharify", () => {
  return {
    data: {
      PREDICTION_URL: "http://www.liveauctions.com",
    },
  }
})

describe("desktop/apps/auctions/utils/urls.js", () => {
  describe("#getLiveAuctionUrl", () => {
    const PREDICTION_URL = "http://www.liveauctions.com"

    it('appends /login with a true "isLoggedIn" option in the second argument', () => {
      expect(urls.getLiveAuctionUrl("foo", { isLoggedIn: true })).toEqual(
        `${PREDICTION_URL}/foo/login`
      )
    })

    it("does not append login with a falsey user option", () => {
      expect(urls.getLiveAuctionUrl("foo", { isLoggedIn: false })).toEqual(
        `${PREDICTION_URL}/foo`
      )
    })

    it("does not append login with no options", () => {
      expect(urls.getLiveAuctionUrl("foo")).toEqual(`${PREDICTION_URL}/foo`)
    })
  })
})
