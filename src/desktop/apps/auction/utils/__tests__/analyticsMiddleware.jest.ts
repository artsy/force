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
      payload: { mediumId: "painting" },
      type: "UPDATE_MEDIUM_ID",
    }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)

    expect(window.analytics.track).toBeCalledWith(
      "Commercial filter params changed",
      {
        auction_slug: "auction-slug",
        changed: { medium: "painting" },
        current: [
          { artists: [] },
          { medium: ["painting"] },
          { sort: "position" },
          { price: "" },
        ],
        sale_id: "123",
        user_id: "321",
      }
    )
  })

  it("tracks changes in artists", () => {
    const action = {
      payload: { artistId: "andy-warhol" },
      type: "UPDATE_ARTIST_ID",
    }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)

    expect(window.analytics.track).toBeCalledWith(
      "Commercial filter params changed",
      {
        auction_slug: "auction-slug",
        changed: { artist: "andy-warhol" },
        current: [
          { artists: ["andy-warhol"] },
          { medium: [] },
          { sort: "position" },
          { price: "" },
        ],
        sale_id: "123",
        user_id: "321",
      }
    )
  })

  it("correctly tracks artists when Artists You Follow is clicked", () => {
    const action = {
      payload: { artistId: "artists-you-follow" },
      type: "UPDATE_ARTIST_ID",
    }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)

    expect(window.analytics.track).toBeCalledWith(
      "Commercial filter params changed",
      {
        auction_slug: "auction-slug",
        changed: { artist: "artists-you-follow" },
        current: [
          { artists: ["artists-you-follow"] },
          { medium: [] },
          { sort: "position" },
          { price: "" },
        ],
        sale_id: "123",
        user_id: "321",
      }
    )
  })

  it("tracks changes in price", () => {
    const action = {
      payload: { max: 50000, min: 100 },
      type: "UPDATE_ESTIMATE_RANGE",
    }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)

    expect(window.analytics.track).toBeCalledWith(
      "Commercial filter params changed",
      {
        auction_slug: "auction-slug",
        changed: { price: "10000-*" },
        current: [
          { artists: [] },
          { medium: [] },
          { sort: "position" },
          { price: "10000-*" },
        ],
        sale_id: "123",
        user_id: "321",
      }
    )
  })

  it("tracks changes in sort", () => {
    const action = { payload: { sort: "lot_number" }, type: "UPDATE_SORT" }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)

    expect(window.analytics.track).toBeCalledWith(
      "Commercial filter params changed",
      {
        auction_slug: "auction-slug",
        changed: { sort: "lot_number" },
        current: [
          { artists: [] },
          { medium: [] },
          { sort: "lot_number" },
          { price: "" },
        ],
        sale_id: "123",
        user_id: "321",
      }
    )
  })

  it("does not track other actions", () => {
    const action = { payload: { isListView: true }, type: "TOGGLE_LIST_VIEW" }
    const store = createStore(auctions, applyMiddleware(analyticsMiddleware))
    store.dispatch(action)
    expect(window.analytics.track).not.toBeCalled()
  })
})
