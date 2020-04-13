import Backbone from "backbone"

import metaphysics from "lib/metaphysics.coffee"
import metaphysics2 from "lib/metaphysics2.coffee"
import CurrentUser from "desktop/models/current_user.coffee"
import * as routes from "../routes"

import { saleV1 } from "./fixtures/saleV1"
import { saleV2 } from "./fixtures/saleV2"

jest.mock("lib/metaphysics.coffee")
jest.mock("lib/metaphysics2.coffee")

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))

jest.mock("desktop/apps/auction/actions/artworkBrowser", () => ({
  fetchArtworksByFollowedArtists: () => ({
    type: "GET_ARTWORKS_SUCCESS",
  }),
  fetchArtworks: () => ({
    type: "GET_ARTWORKS_SUCCESS",
  }),
}))

import { stitch } from "@artsy/stitch"

describe("routes", () => {
  beforeEach(() => {
    Backbone.sync = jest.fn()
    stitch.mockResolvedValue("<html />")
  })

  describe("#index", () => {
    let req
    let res
    let next

    beforeEach(() => {
      req = {
        body: {},
        params: {
          id: "foobar",
        },
        user: new CurrentUser({
          name: "user",
        }),
      }
      res = {
        app: {
          get: jest.fn(() => "components/page"),
        },
        locals: {
          sd: {},
        },
        redirect: jest.fn(),
        render: jest.fn(),
        send: jest.fn(),
      }
      next = jest.fn()
    })

    xit("renders the index with the correct variables", async () => {
      const mockAuctionQueries = {
        sale: {
          id: "foo",
          is_auction: true,
          auction_state: "open",
          is_live_open: true,
        },
        me: {
          bidders: [
            {
              id: "me",
              qualified_for_bidding: true,
              sale: {
                id: "foo",
              },
            },
          ],
        },
      }

      metaphysics.mockResolvedValue(mockAuctionQueries)

      // FIXME: Need to write more robust output test
      await routes.index(req, res, next)
      expect(res.send).toBeCalledWith("<html />")
    })

    it("renders the index with a promoted sale", async () => {
      metaphysics.mockResolvedValue({ articles: [] })
      metaphysics2.mockResolvedValue({
        sale: saleV2,
        me: null,
      })

      await routes.index(req, res, next)

      expect(stitch).toBeCalled()
      expect(res.send).toBeCalledWith("<html />")

      const sale = stitch.mock.calls[0][0].data.app.auction.toJSON()

      expect(sale).toEqual({
        ...saleV1,
        require_identity_verification: true,
      })
    })

    xit("works even with the Metaphysics module throwing an error", async () => {
      metaphysics
        .mockReturnValueOnce({ sale: { is_auction: true } })
        .mockRejectedValue("oops!")

      // FIXME: Need to write more robust output test
      await routes.index(req, res, next)
      expect(res.send).toBeCalledWith("<html />")
    })
  })

  xdescribe("#redirectLive", async () => {
    let req
    let res
    let next

    beforeEach(() => {
      req = {
        body: {},
        params: {
          id: "foobar",
        },
        user: new CurrentUser({
          name: "user",
        }),
      }
      res = {
        redirect: jest.fn(),
      }
      next = jest.fn()
    })

    it("redirects on confirm if the auction is live and bidder is qualified", async () => {
      const mockAuctionQueries = {
        sale: {
          id: "foo",
          is_auction: true,
          auction_state: "open",
          is_live_open: true,
        },
        me: {
          bidders: [
            {
              id: "me",
              qualified_for_bidding: true,
              sale: {
                id: "foo",
              },
            },
          ],
        },
      }

      metaphysics.mockResolvedValue(mockAuctionQueries)

      await routes.redirectLive(req, res, next)
      expect(res.redirect).toBeCalledWith("undefined/foo/login")
    })

    it("does not redirect if bidder is not qualified", async () => {
      const mockAuctionQueries = {
        sale: {
          id: "foo",
          is_auction: true,
          auction_state: "open",
          is_live_open: true,
        },
        me: {
          bidders: [
            {
              id: "me",
              qualified_for_bidding: false,
              sale: {
                id: "foo",
              },
            },
          ],
        },
      }

      metaphysics.mockResolvedValue(mockAuctionQueries)

      await routes.redirectLive(req, res, next)
      expect(res.redirect).not.toBeCalled()
      expect(next).toBeCalled()
    })

    it("does not redirect if the auction is not live", async () => {
      const mockAuctionQueries = {
        sale: {
          id: "foo",
          is_auction: true,
          auction_state: "open",
          is_live_open: false,
        },
        me: {
          bidders: [
            {
              id: "me",
              qualified_for_bidding: false,
              sale: {
                id: "foo",
              },
            },
          ],
        },
      }

      metaphysics.mockResolvedValue(mockAuctionQueries)

      await routes.redirectLive(req, res, next)
      expect(res.redirect).not.toBeCalled()
      expect(next).toBeCalled()
    })
  })
})
