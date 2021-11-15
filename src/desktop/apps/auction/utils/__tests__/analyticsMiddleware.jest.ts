import auctions from "desktop/apps/auction/reducers"
import { applyMiddleware, createStore } from "redux"
import { analyticsMiddleware } from "../analyticsMiddleware"

jest.mock("sharify", () => ({
  data: {
    AUCTION: {
      _id: "123",
      id: "auction-slug",
    },
    CURRENT_USER: { id: "321" },
  },
}))

describe("analytics middleware", () => {
  beforeEach(() => {
    window.analytics = {
      track: jest.fn(),
    } as any
  })

  it("tracks changes in mediums", () => {
    const action = {
      type: "UPDATE_MEDIUM_ID",
      payload: { mediumId: "painting" },
    }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(window.analytics.track).toBeCalledWith(
      "Commercial filter params changed",
      {
        auction_slug: "auction-slug",
        sale_id: "123",
        user_id: "321",
        current: JSON.stringify([
          { artists: [] },
          { medium: ["painting"] },
          { sort: "position" },
          { price: "" },
        ]),
        changed: JSON.stringify({ medium: "painting" }),
      }
    )
  })

  it("tracks changes in artists", () => {
    const action = {
      type: "UPDATE_ARTIST_ID",
      payload: { artistId: "andy-warhol" },
    }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(window.analytics.track).toBeCalledWith(
      "Commercial filter params changed",
      {
        auction_slug: "auction-slug",
        sale_id: "123",
        user_id: "321",
        current: JSON.stringify([
          { artists: ["andy-warhol"] },
          { medium: [] },
          { sort: "position" },
          { price: "" },
        ]),
        changed: JSON.stringify({ artist: "andy-warhol" }),
      }
    )
  })

  it("correctly tracks artists when Artists You Follow is clicked", () => {
    const action = {
      type: "UPDATE_ARTIST_ID",
      payload: { artistId: "artists-you-follow" },
    }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(window.analytics.track).toBeCalledWith(
      "Commercial filter params changed",
      {
        auction_slug: "auction-slug",
        sale_id: "123",
        user_id: "321",
        current: JSON.stringify([
          { artists: ["artists-you-follow"] },
          { medium: [] },
          { sort: "position" },
          { price: "" },
        ]),
        changed: JSON.stringify({ artist: "artists-you-follow" }),
      }
    )
  })

  it("tracks changes in price", () => {
    const action = {
      type: "UPDATE_ESTIMATE_RANGE",
      payload: { min: 100, max: 50000 },
    }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(window.analytics.track).toBeCalledWith(
      "Commercial filter params changed",
      {
        auction_slug: "auction-slug",
        sale_id: "123",
        user_id: "321",
        current: JSON.stringify([
          { artists: [] },
          { medium: [] },
          { sort: "position" },
          { price: "10000-*" },
        ]),
        changed: JSON.stringify({ price: "10000-*" }),
      }
    )
  })

  it("tracks changes in sort", () => {
    const action = { type: "UPDATE_SORT", payload: { sort: "lot_number" } }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(window.analytics.track).toBeCalledWith(
      "Commercial filter params changed",
      {
        auction_slug: "auction-slug",
        sale_id: "123",
        user_id: "321",
        current: JSON.stringify([
          { artists: [] },
          { medium: [] },
          { sort: "lot_number" },
          { price: "" },
        ]),
        changed: JSON.stringify({ sort: "lot_number" }),
      }
    )
  })

  it("does not track other actions", () => {
    const action = { type: "TOGGLE_LIST_VIEW", payload: { isListView: true } }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(window.analytics.track).not.toBeCalled()
  })
})
