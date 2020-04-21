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

    expect(triggerStub.callCount).toBe(1)
    const analyticsArgs = triggerStub.firstCall.args
    expect(analyticsArgs[0]).toBe("consignment:artist:confirmed")
    expect(analyticsArgs[1]).toEqual({
      artistId: "andy-warhol",
    })
  })

  it("tracks an error on submission creation", () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: "SUBMISSION_ERROR",
      payload: { errorType: "convection_create" },
    })

    expect(triggerStub.callCount).toBe(1)
    const analyticsArgs = triggerStub.firstCall.args
    expect(analyticsArgs[0]).toBe("consignment:submission:error")
    expect(analyticsArgs[1]).toEqual({
      type: "convection_create",
      errors: "Error creating submission",
    })
  })

  it("tracks an error on submission completion", () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: "SUBMISSION_ERROR",
      payload: { errorType: "convection_complete_submission" },
    })

    expect(triggerStub.callCount).toBe(1)
    const analyticsArgs = triggerStub.firstCall.args
    expect(analyticsArgs[0]).toBe("consignment:submission:error")
    expect(analyticsArgs[1]).toEqual({
      type: "convection_complete_submission",
      errors: "Error completing submission",
    })
  })

  it("tracks a submission created with no assets", () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: "SUBMISSION_CREATED",
      payload: { submissionId: 123 },
    })

    expect(triggerStub.callCount).toBe(1)
    const analyticsArgs = triggerStub.firstCall.args
    expect(analyticsArgs[0]).toBe("consignment:submitted")
    expect(analyticsArgs[1]).toEqual(
      expect.objectContaining({
        submissionId: 123,
      })
    )
  })

  it("tracks a submission completed with no assets", () => {
    const store = createStore(reducers, applyMiddleware(analyticsMiddleware))
    store.dispatch({
      type: "UPDATE_SUBMISSION",
      payload: { submission: { id: 123 } },
    })
    store.dispatch({ type: "SUBMISSION_COMPLETED" })

    expect(triggerStub.callCount).toBe(1)
    const analyticsArgs = triggerStub.firstCall.args
    expect(analyticsArgs[0]).toBe("consignment:completed")
    expect(analyticsArgs[1]).toEqual({
      submissionId: 123,
      assetIds: [],
    })
  })
})
