import Backbone from "backbone"
import { stitch } from "@artsy/stitch"

jest.mock("lib/metaphysics", () => ({
  metaphysics: jest.fn(),
}))
jest.mock("lib/metaphysics2", () => ({ metaphysics2: jest.fn() }))

const metaphysics = require("lib/metaphysics").metaphysics as jest.Mock
const { metaphysics2 } = require("lib/metaphysics2")
const CurrentUser = require("desktop/models/current_user")

import * as routes from "../routes"

import { meV1 } from "./fixtures/meV1"
import { meV2 } from "./fixtures/meV2"
import { saleV1 } from "./fixtures/saleV1"
import { saleV2 } from "./fixtures/saleV2"

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))

jest.mock("desktop/apps/auction/actions/artworkBrowser", () => ({
  fetchArtworks: () => ({
    type: "GET_ARTWORKS_SUCCESS",
  }),
  fetchArtworksByFollowedArtists: () => ({
    type: "GET_ARTWORKS_SUCCESS",
  }),
}))

const mockStitch = stitch as jest.Mock

describe("routes", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    Backbone.sync = jest.fn()
    mockStitch.mockResolvedValue("<html />")
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

    it("renders the index with the correct variables", async () => {
      metaphysics.mockResolvedValue({ articles: [] })
      metaphysics2.mockResolvedValue({
        me: meV2,
        sale: saleV2,
      })

      await routes.index(req, res, next)

      expect(mockStitch).toBeCalled()
      expect(res.send).toBeCalledWith("<html />")

      const { me } = mockStitch.mock.calls[0][0].data.app

      expect(me).toEqual({
        ...meV1,
        identityVerified: true,
      })
    })

    it("renders the index with a promoted sale", async () => {
      metaphysics.mockResolvedValue({ articles: [] })
      metaphysics2.mockResolvedValue({
        me: null,
        sale: saleV2,
      })

      await routes.index(req, res, next)

      expect(stitch).toBeCalled()
      expect(res.send).toBeCalledWith("<html />")

      const sale = mockStitch.mock.calls[0][0].data.app.auction.toJSON()

      expect(sale).toEqual({
        ...saleV1,
        requireIdentityVerification: true,
      })
    })

    it("works even with the Metaphysics module throwing an error", async () => {
      metaphysics
        .mockReturnValueOnce({ sale: { is_auction: true } })
        .mockRejectedValue("oops!")

      // FIXME: Need to write more robust output test
      await routes.index(req, res, next)
      expect(res.send).toBeCalledWith("<html />")
    })
  })

  describe("#redirectLive", () => {
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
        sale: {
          auction_state: "open",
          id: "foo",
          is_auction: true,
          is_live_open: true,
        },
      }

      metaphysics.mockResolvedValue(mockAuctionQueries)

      await routes.redirectLive(req, res, next)
      expect(res.redirect).toBeCalledWith("undefined/foo/login")
    })

    it("does not redirect if bidder is not qualified", async () => {
      const mockAuctionQueries = {
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
        sale: {
          auction_state: "open",
          id: "foo",
          is_auction: true,
          is_live_open: true,
        },
      }

      metaphysics.mockResolvedValue(mockAuctionQueries)

      await routes.redirectLive(req, res, next)
      expect(res.redirect).not.toBeCalled()
      expect(next).toBeCalled()
    })

    it("does not redirect if the auction is not live", async () => {
      const mockAuctionQueries = {
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
        sale: {
          auction_state: "open",
          id: "foo",
          is_auction: true,
          is_live_open: false,
        },
      }

      metaphysics.mockResolvedValue(mockAuctionQueries)

      await routes.redirectLive(req, res, next)
      expect(res.redirect).not.toBeCalled()
      expect(next).toBeCalled()
    })
  })
})
