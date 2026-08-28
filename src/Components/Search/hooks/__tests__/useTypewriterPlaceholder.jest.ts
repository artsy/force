import { renderHook } from "@testing-library/react"
import { act } from "react"
import { useTypewriterPlaceholder } from "../useTypewriterPlaceholder"

const PHRASES = ["ab", "cd"]

describe("useTypewriterPlaceholder", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  const advance = (ms: number) => {
    act(() => {
      jest.advanceTimersByTime(ms)
    })
  }

  it("types the first phrase out one character at a time", () => {
    const { result } = renderHook(() => {
      return useTypewriterPlaceholder({ phrases: PHRASES, isEnabled: true })
    })

    expect(result.current).toEqual("a")

    advance(60)

    expect(result.current).toEqual("ab")
  })

  it("moves on to the next phrase", () => {
    const { result } = renderHook(() => {
      return useTypewriterPlaceholder({ phrases: PHRASES, isEnabled: true })
    })

    // Each step is its own advance so the effect re-runs and schedules the next
    advance(60) // finish typing
    expect(result.current).toEqual("ab")

    advance(1800) // hold, then start deleting
    advance(30) // delete a character
    expect(result.current).toEqual("a")

    advance(30) // delete the last one
    expect(result.current).toEqual("")

    advance(400) // beat of empty, then the next phrase
    expect(result.current).toEqual("c")
  })

  it("settles on the whole phrase rather than freezing mid-word", () => {
    const { result } = renderHook(() => {
      return useTypewriterPlaceholder({ phrases: PHRASES, isEnabled: false })
    })

    expect(result.current).toEqual("ab")
  })

  it("does not animate when there are no phrases", () => {
    const { result } = renderHook(() => {
      return useTypewriterPlaceholder({ phrases: [], isEnabled: true })
    })

    advance(5000)

    expect(result.current).toEqual("")
  })

  it("stops scheduling work once disabled", () => {
    const { result, rerender } = renderHook(
      ({ isEnabled }) => {
        return useTypewriterPlaceholder({ phrases: PHRASES, isEnabled })
      },
      { initialProps: { isEnabled: true } },
    )

    rerender({ isEnabled: false })
    advance(10000)

    expect(result.current).toEqual("ab")
    expect(jest.getTimerCount()).toEqual(0)
  })
})
