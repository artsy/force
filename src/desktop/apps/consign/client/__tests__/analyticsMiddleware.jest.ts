import reducers from "../reducers"
import { applyMiddleware, createStore } from "redux"
import sinon from "sinon"

import analyticsMiddleware from "../analytics_middleware"
const analyticsHooks = require("desktop/lib/analytics_hooks.coffee")

jest.mock("desktop/lib/analytics_hooks.coffee")
jest.mock("sharify", () => ({
  data: {
    CURRENT_USER: {
      id: "some-id",
      email: "some@email.com",
    },
  },
}))

describe("analyticsMiddleware", () => {
  let triggerStub

  beforeEach(() => {
    window.analytics = { track: jest.fn() } as any
    triggerStub = sinon.spy()
    const mockAnalytics = analyticsHooks
    mockAnalytics.trigger.mockImplementation(triggerStub)
  })

  it("tracks an artist confirmed action", () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: "UPDATE_ARTIST_ID",
      payload: { artistId: "andy-warhol" },
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
      type: "SUBMISSION_ERROR",
      payload: { errorType: "convection_create" },
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
      type: "SUBMISSION_ERROR",
      payload: { errorType: "convection_complete_submission" },
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
      type: "SUBMISSION_CREATED",
      payload: { submissionId: 123 },
    })

    expect(window.analytics.track).toHaveBeenCalledTimes(1)
    expect(window.analytics.track).toBeCalledWith("consignment_submitted", {
      contextPath: undefined,
      submissionId: 123,
      subject: undefined,
      userId: "some-id",
      userEmail: "some@email.com",
    })
  })

  it("tracks a submission completed with no assets", () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: "UPDATE_SUBMISSION",
      payload: { submission: { id: 123 } },
    })
    store.dispatch({ type: "SUBMISSION_COMPLETED" })

    expect(window.analytics.track).toHaveBeenCalledTimes(1)
    expect(window.analytics.track).toBeCalledWith(
      "consignment_asset_uploaded",
      {
        submissionId: 123,
        assetIds: [],
      }
    )
  })
})
