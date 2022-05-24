import { renderHook } from "@testing-library/react-hooks"
import {
  OPTION_ARTWORKS_FROM_TRENDING_ARTISTS,
  OPTION_CREATE_AN_ART_WISHLIST,
  useConfig,
} from "../config"

describe("config", () => {
  it("should move through workflow", () => {
    const {
      result: {
        current: { workflowEngine },
      },
    } = renderHook(() =>
      useConfig({
        onDone: jest.fn(),
        basis: { current: { answer: OPTION_ARTWORKS_FROM_TRENDING_ARTISTS } },
      })
    )

    expect(workflowEngine.current()).toEqual("Welcome")
    expect(workflowEngine.next()).toEqual("WhatDoYouLoveMost")
    expect(workflowEngine.next()).toEqual("WhereWouldYouLikeToDiveIn")
    expect(workflowEngine.next()).toEqual("TrendingArtists")
    expect(workflowEngine.next()).toEqual("Done")
  })

  it("should make a decision", () => {
    const basis = { current: { answer: "" } }
    const {
      result: {
        current: { workflowEngine },
      },
    } = renderHook(() =>
      useConfig({
        onDone: jest.fn(),
        basis,
      })
    )

    expect(workflowEngine.current()).toEqual("Welcome")
    expect(workflowEngine.next()).toEqual("WhatDoYouLoveMost")
    expect(workflowEngine.next()).toEqual("WhereWouldYouLikeToDiveIn")
    basis.current.answer = OPTION_CREATE_AN_ART_WISHLIST
    expect(workflowEngine.next()).toEqual("SearchArtworks")
    expect(workflowEngine.next()).toEqual("Done")
  })
})
