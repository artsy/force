import { renderHook } from "@testing-library/react-hooks"
import {
  OPTION_ARTWORKS_FROM_TRENDING_ARTISTS,
  OPTION_CREATE_AN_ART_WISHLIST,
  useEngine,
} from "../config"

describe("config", () => {
  it("should move through workflow", () => {
    const {
      result: {
        current: { engine },
      },
    } = renderHook(() =>
      useEngine({
        onDone: jest.fn(),
        context: { current: { answer: OPTION_ARTWORKS_FROM_TRENDING_ARTISTS } },
      })
    )

    expect(engine.current()).toEqual("Welcome")
    expect(engine.next()).toEqual("WhatDoYouLoveMost")
    expect(engine.next()).toEqual("WhereWouldYouLikeToDiveIn")
    expect(engine.next()).toEqual("TrendingArtists")
    expect(engine.next()).toEqual("Done")
  })

  it("should make a decision", () => {
    const context = { current: { answer: "" } }
    const {
      result: {
        current: { engine },
      },
    } = renderHook(() =>
      useEngine({
        onDone: jest.fn(),
        context,
      })
    )

    expect(engine.current()).toEqual("Welcome")
    expect(engine.next()).toEqual("WhatDoYouLoveMost")
    expect(engine.next()).toEqual("WhereWouldYouLikeToDiveIn")
    context.current.answer = OPTION_CREATE_AN_ART_WISHLIST
    expect(engine.next()).toEqual("SearchArtworks")
    expect(engine.next()).toEqual("Done")
  })
})
