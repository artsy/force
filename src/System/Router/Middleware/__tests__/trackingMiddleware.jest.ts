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
    window.__artsyInitialReferrer = undefined
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
      { integrations: { Marketo: false } },
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
            referrer: "http://testing.com/referrer?with=queryparams",
            url: `http://testing.com${pathToTest}`,
          },
          { integrations: { Marketo: false } },
        )

        expect(window.analytics!.__artsyClientSideRoutingReferrer).toEqual(
          "http://testing.com/referrer?with=queryparams",
        )
      })
    })

    it("uses __artsyInitialReferrer when no client-side routing referrer exists", () => {
      window.__artsyInitialReferrer = "https://google.com"

      trackingMiddleware()(store)(noop)({
        type: ActionTypes.UPDATE_LOCATION,
        payload: {
          pathname: "/collect",
        },
      })

      expect(global.analytics.page).toBeCalledWith(
        {
          path: "/collect",
          referrer: "https://google.com",
          url: "http://testing.com/collect",
        },
        { integrations: { Marketo: false } },
      )
    })

    it("clears __artsyInitialReferrer after consuming it", () => {
      window.__artsyInitialReferrer = "https://google.com"

      trackingMiddleware()(store)(noop)({
        type: ActionTypes.UPDATE_LOCATION,
        payload: {
          pathname: "/collect",
        },
      })

      expect(window.__artsyInitialReferrer).toBeUndefined()
    })

    it("prefers client-side routing referrer over __artsyInitialReferrer", () => {
      window.__artsyInitialReferrer = "https://google.com"

      trackingMiddleware()({
        getState: () => {
          return {
            found: {
              match: {
                location: {
                  pathname: "/previous-page",
                  search: "",
                },
              },
            },
          }
        },
      })(noop)({
        type: ActionTypes.UPDATE_LOCATION,
        payload: {
          pathname: "/collect",
        },
      })

      expect(global.analytics.page).toBeCalledWith(
        {
          path: "/collect",
          referrer: "http://testing.com/previous-page",
          url: "http://testing.com/collect",
        },
        { integrations: { Marketo: false } },
      )
    })
  })

  describe("referrer preservation across excluded paths", () => {
    it("preserves the referrer from before an excluded path", () => {
      const middleware = trackingMiddleware({
        excludePaths: ["/artist/:artistID/auction-results"],
      })

      const storeWithReferrer = (pathname: string, search = "") => ({
        getState: () => ({
          found: {
            match: { location: { pathname, search } },
          },
        }),
      })

      // Step 1: Navigate to excluded path from /auction-result/123
      middleware(storeWithReferrer("/auction-result/123"))(noop)({
        type: ActionTypes.UPDATE_LOCATION,
        payload: { pathname: "/artist/andy-warhol/auction-results" },
      })

      expect(global.analytics.page).not.toBeCalled()

      // Step 2: Redirect to the artist page — should use the original referrer
      middleware(storeWithReferrer("/artist/andy-warhol/auction-results"))(
        noop,
      )({
        type: ActionTypes.UPDATE_LOCATION,
        payload: { pathname: "/artist/andy-warhol" },
      })

      expect(global.analytics.page).toBeCalledWith(
        {
          path: "/artist/andy-warhol",
          referrer: "http://testing.com/auction-result/123",
          url: "http://testing.com/artist/andy-warhol",
        },
        { integrations: { Marketo: false } },
      )
    })

    it("clears the saved referrer after it is consumed", () => {
      const middleware = trackingMiddleware({
        excludePaths: ["/artist/:artistID/auction-results"],
      })

      const storeWithReferrer = (pathname: string) => ({
        getState: () => ({
          found: {
            match: { location: { pathname, search: "" } },
          },
        }),
      })

      // Navigate through excluded path
      middleware(storeWithReferrer("/auction-result/123"))(noop)({
        type: ActionTypes.UPDATE_LOCATION,
        payload: { pathname: "/artist/andy-warhol/auction-results" },
      })

      // Redirect consumes saved referrer
      middleware(storeWithReferrer("/artist/andy-warhol/auction-results"))(
        noop,
      )({
        type: ActionTypes.UPDATE_LOCATION,
        payload: { pathname: "/artist/andy-warhol" },
      })
      ;(global.analytics.page as jest.Mock).mockClear()

      // Subsequent navigation uses normal store referrer
      middleware(storeWithReferrer("/artist/andy-warhol"))(noop)({
        type: ActionTypes.UPDATE_LOCATION,
        payload: { pathname: "/some-other-page" },
      })

      expect(global.analytics.page).toBeCalledWith(
        {
          path: "/some-other-page",
          referrer: "http://testing.com/artist/andy-warhol",
          url: "http://testing.com/some-other-page",
        },
        { integrations: { Marketo: false } },
      )
    })

    it("does not update __artsyClientSideRoutingReferrer for excluded paths", () => {
      const middleware = trackingMiddleware({
        excludePaths: ["/artist/:artistID/about"],
      })

      const storeWithReferrer = (pathname: string) => ({
        getState: () => ({
          found: {
            match: { location: { pathname, search: "" } },
          },
        }),
      })

      // Set initial referrer
      middleware(storeWithReferrer("/some-page"))(noop)({
        type: ActionTypes.UPDATE_LOCATION,
        payload: { pathname: "/artist/picasso/about" },
      })

      // The excluded path should not have updated the global referrer
      expect(window.analytics!.__artsyClientSideRoutingReferrer).toBeUndefined()
    })
  })
})
