import { act, renderHook } from "@testing-library/react-hooks"
import {
  TYPEWRITER_ERASE_DELAY,
  TYPEWRITER_GAP_DELAY,
  TYPEWRITER_HOLD_DELAY,
  TYPEWRITER_TYPE_DELAY,
  useTypewriterPlaceholder,
} from "Components/Search/hooks/useTypewriterPlaceholder"

const PHRASES = ["Cats", "Dog"]
const FALLBACK = "Search Artsy"

const setup = (isEnabled = true) => {
  return renderHook(
    ({ enabled }: { enabled: boolean }) => {
      return useTypewriterPlaceholder({
        phrases: PHRASES,
        fallback: FALLBACK,
        isEnabled: enabled,
      })
    },
    { initialProps: { enabled: isEnabled } },
  )
}

const advance = (ms: number) => {
  act(() => {
    jest.advanceTimersByTime(ms)
  })
}

describe("useTypewriterPlaceholder", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("returns the fallback when disabled", () => {
    const { result } = setup(false)

    expect(result.current).toEqual(FALLBACK)

    advance(10000)

    expect(result.current).toEqual(FALLBACK)
  })

  it("types the first phrase character by character", () => {
    const { result } = setup()

    expect(result.current).toEqual("C")

    advance(TYPEWRITER_TYPE_DELAY)
    expect(result.current).toEqual("Ca")

    advance(TYPEWRITER_TYPE_DELAY)
    expect(result.current).toEqual("Cat")

    advance(TYPEWRITER_TYPE_DELAY)
    expect(result.current).toEqual("Cats")
  })

  it("holds the full phrase, then erases it", () => {
    const { result } = setup()

    advance(TYPEWRITER_TYPE_DELAY * 3)
    expect(result.current).toEqual("Cats")

    advance(TYPEWRITER_HOLD_DELAY - 1)
    expect(result.current).toEqual("Cats")

    advance(1)
    expect(result.current).toEqual("Cat")

    advance(TYPEWRITER_ERASE_DELAY * 3)
    expect(result.current).toEqual("")
  })

  it("cycles to the next phrase and wraps around", () => {
    const { result } = setup()

    // Enters and exits with the first character typed, so cycles chain
    // without timing drift
    const cycle = (phrase: string) => {
      advance(TYPEWRITER_TYPE_DELAY * (phrase.length - 1))
      expect(result.current).toEqual(phrase)

      advance(TYPEWRITER_HOLD_DELAY)
      expect(result.current).toEqual(phrase.slice(0, -1))

      advance(TYPEWRITER_ERASE_DELAY * (phrase.length - 1))
      expect(result.current).toEqual("")

      advance(TYPEWRITER_GAP_DELAY)
    }

    cycle("Cats")
    expect(result.current).toEqual("D")

    cycle("Dog")
    expect(result.current).toEqual("C")
  })

  it("resets to the fallback when disabled mid-animation", () => {
    const { result, rerender } = setup()

    advance(TYPEWRITER_TYPE_DELAY * 2)
    expect(result.current).toEqual("Cat")

    rerender({ enabled: false })
    expect(result.current).toEqual(FALLBACK)

    advance(10000)
    expect(result.current).toEqual(FALLBACK)
  })

  it("restarts from the beginning when re-enabled", () => {
    const { result, rerender } = setup()

    advance(TYPEWRITER_TYPE_DELAY * 3)
    expect(result.current).toEqual("Cats")

    rerender({ enabled: false })
    rerender({ enabled: true })

    expect(result.current).toEqual("C")
  })

  it("keeps the static frame around the animated text, but not the fallback", () => {
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => {
        return useTypewriterPlaceholder({
          phrases: PHRASES,
          fallback: FALLBACK,
          isEnabled: enabled,
          prefix: "Try “",
          suffix: "”",
        })
      },
      { initialProps: { enabled: true } },
    )

    expect(result.current).toEqual("Try “C”")

    advance(TYPEWRITER_TYPE_DELAY * 3)
    expect(result.current).toEqual("Try “Cats”")

    advance(TYPEWRITER_HOLD_DELAY)
    expect(result.current).toEqual("Try “Cat”")

    advance(TYPEWRITER_ERASE_DELAY * 3)
    expect(result.current).toEqual("Try “”")

    rerender({ enabled: false })
    expect(result.current).toEqual(FALLBACK)
  })

  it("returns the fallback when the user prefers reduced motion", () => {
    const originalMatchMedia = window.matchMedia
    window.matchMedia = jest.fn().mockReturnValue({ matches: true })

    const { result } = setup()

    expect(result.current).toEqual(FALLBACK)

    advance(10000)
    expect(result.current).toEqual(FALLBACK)

    window.matchMedia = originalMatchMedia
  })
})
