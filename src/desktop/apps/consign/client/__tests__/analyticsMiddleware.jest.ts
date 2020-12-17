import reducers from "../reducers"
import { applyMiddleware, createStore } from "redux"

import analyticsMiddleware from "../analytics_middleware"

jest.mock("sharify", () => ({
  data: {
    CURRENT_USER: {
      email: "some@email.com",
      id: "some-id",
    },
  },
}))

describe("analyticsMiddleware", () => {
  beforeEach(() => {
    window.analytics = { track: jest.fn() } as any
  })

  it("tracks an artist confirmed action", () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      payload: { artistId: "andy-warhol" },
      type: "UPDATE_ARTIST_ID",
    })
    store.dispatch({ type: "SUBMIT_ARTIST" })

    expect(window.analytics.track).toHaveBeenCalledTimes(1)
    expect(window.analytics.track).toBeCalledWith(
      "consignment_artist_confirmed",
      {
        artist_id: "andy-warhol",
      }
    )
  })

  it("tracks an error on submission creation", () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      payload: { errorType: "convection_create" },
      type: "SUBMISSION_ERROR",
    })

    expect(window.analytics.track).toHaveBeenCalledTimes(1)
    expect(window.analytics.track).toBeCalledWith(
      "consignment_failed_to_submit",
      {
        errors: "Error creating submission",
        type: "convection_create",
      }
    )
  })

  it("tracks an error on submission completion", () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      payload: { errorType: "convection_complete_submission" },
      type: "SUBMISSION_ERROR",
    })

    expect(window.analytics.track).toHaveBeenCalledTimes(1)
    expect(window.analytics.track).toBeCalledWith(
      "consignment_failed_to_submit",
      {
        errors: "Error completing submission",
        type: "convection_complete_submission",
      }
    )
  })

  it("tracks a submission created with no assets", () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      payload: { submissionId: 123 },
      type: "SUBMISSION_CREATED",
    })

    expect(window.analytics.track).toHaveBeenCalledTimes(1)
    expect(window.analytics.track).toBeCalledWith("consignment_submitted", {
      contextPath: undefined,
      subject: undefined,
      submissionId: 123,
      userEmail: "some@email.com",
      userId: "some-id",
    })
  })

  it("tracks a submission completed with no assets", () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      payload: { submission: { id: 123 } },
      type: "UPDATE_SUBMISSION",
    })
    store.dispatch({ type: "SUBMISSION_COMPLETED" })

    expect(window.analytics.track).toHaveBeenCalledTimes(1)
    expect(window.analytics.track).toBeCalledWith(
      "consignment_asset_uploaded",
      {
        assetIds: [],
        submissionId: 123,
      }
    )
  })
})
