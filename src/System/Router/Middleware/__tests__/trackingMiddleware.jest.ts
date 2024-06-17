import { trackingMiddleware } from "System/Router/Middleware/trackingMiddleware"
import { ActionTypes } from "farce"

declare const global: any

jest.mock("sharify", () => ({
  data: {
    APP_URL: "http://testing.com",
    SPECIFIC_ARTIST_ARTWORKS: "experiment",
  },
}))

describe("trackingMiddleware", () => {
  const analytics = window.analytics
  const store = {
    getState: () => ({}),
  }
  const noop = x => x

  beforeEach(() => {
    window.analytics = {
      page: jest.fn(),
      track: jest.fn(),
    } as any
  })

  afterEach(() => {
    window.analytics = analytics
  })

  it("tracks pageviews", () => {
    trackingMiddleware()(store)(noop)({
      type: ActionTypes.UPDATE_LOCATION,
      payload: {
        pathname: "/foo",
      },
    })

    expect(global.analytics.page).toBeCalledWith(
      {
        path: "/foo",
        url: "http://testing.com/foo",
      },
      { integrations: { Marketo: false } }
    )
  })

  it("does not track pageviews for other events", () => {
    trackingMiddleware()(store)(noop)({
      type: ActionTypes.PUSH,
      payload: {
        pathname: "/bar",
      },
    })
    expect(global.analytics.page).not.toBeCalled()
  })

  describe("excluding paths", () => {
    it("excludes all possible paths for a given route", () => {
      trackingMiddleware({
        excludePaths: ["/artwork(.*)"],
      })(store)(noop)({
        type: ActionTypes.UPDATE_LOCATION,
        payload: {
          pathname: "/artwork/some-id",
        },
      })
      expect(global.analytics.page).not.toBeCalled()
    })

    it("excludes dynamic path segments", () => {
      trackingMiddleware({
        excludePaths: ["/artwork/:slug"],
      })(store)(noop)({
        type: ActionTypes.UPDATE_LOCATION,
        payload: {
          pathname: "/artwork/some-id",
        },
      })
      expect(global.analytics.page).not.toBeCalled()
    })

    it("excludes nested paths", () => {
      trackingMiddleware({
        excludePaths: ["/artwork/:slug/:segment*"],
      })(store)(noop)({
        type: ActionTypes.UPDATE_LOCATION,
        payload: {
          pathname: "/artwork/some-id/foo",
        },
      })
      expect(global.analytics.page).not.toBeCalled()
    })

    it("excludes paths including regexs", () => {
      trackingMiddleware({
        excludePaths: ["/auction/:saleID/bid(2)?/:artworkID"],
      })(store)(noop)({
        type: ActionTypes.UPDATE_LOCATION,
        payload: {
          pathname: "/auction/some-id/bid2/some-artwork",
        },
      })
      expect(global.analytics.page).not.toBeCalled()
    })
  })

  describe("referrers", () => {
    it("tracks collect, collection and collections", () => {
      const pathsToTest = ["/collect", "/collection/foo", "/collections"]

      pathsToTest.forEach(pathToTest => {
        trackingMiddleware()({
          getState: () => {
            return {
              found: {
                match: {
                  location: {
                    pathname: "/referrer",
                    search: "?with=queryparams",
                  },
                },
              },
            }
          },
        })(noop)({
          type: ActionTypes.UPDATE_LOCATION,
          payload: {
            pathname: pathToTest,
          },
        })

        expect(global.analytics.page).toBeCalledWith(
          {
            path: pathToTest,
            referrer: `http://testing.com/referrer?with=queryparams`,
            url: `http://testing.com${pathToTest}`,
          },
          { integrations: { Marketo: false } }
        )

        expect(window.analytics!.__artsyClientSideRoutingReferrer).toEqual(
          "http://testing.com/referrer?with=queryparams"
        )
      })
    })
  })
})
