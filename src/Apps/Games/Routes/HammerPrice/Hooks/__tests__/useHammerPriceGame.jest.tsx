import { act, renderHook } from "@testing-library/react-hooks"
import { useHammerPriceGame } from "Apps/Games/Routes/HammerPrice/Hooks/useHammerPriceGame"
import type { HammerPricePuzzle } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import type {
  GameProgressStore,
  HammerPriceGameProgress,
} from "Apps/Games/Routes/HammerPrice/Utils/gameProgressStore"

const PUZZLE: HammerPricePuzzle = {
  id: "hp-test",
  slug: "test-puzzle",
  auctionResultId: "123",
  date: "2026-07-14",
  priceRealizedUSD: 985000,
  priceRealized: 985000,
  currency: "USD",
  isActive: true,
  artistName: "Artist",
  title: "Title",
}

const createInMemoryStore = (
  initial: HammerPriceGameProgress[] = [],
): GameProgressStore => {
  const state = new Map(initial.map(progress => [progress.puzzleId, progress]))

  return {
    getProgress: puzzleId => state.get(puzzleId) ?? null,
    saveProgress: progress => {
      state.set(progress.puzzleId, progress)
    },
    listProgress: () => Array.from(state.values()),
    clearProgress: puzzleId => {
      state.delete(puzzleId)
    },
  }
}

describe("useHammerPriceGame", () => {
  it("starts a fresh game", () => {
    const store = createInMemoryStore()

    const { result } = renderHook(() =>
      useHammerPriceGame({ puzzle: PUZZLE, store }),
    )

    expect(result.current.status).toBe("notStarted")
    expect(result.current.guesses).toEqual([])
    expect(result.current.guessesRemaining).toBe(6)
    expect(result.current.targetDigits).toBe("00985000")
  })

  it("scores and records a submitted guess", () => {
    const store = createInMemoryStore()

    const { result } = renderHook(() =>
      useHammerPriceGame({ puzzle: PUZZLE, store }),
    )

    act(() => {
      result.current.submitGuess("10985000")
    })

    expect(result.current.status).toBe("inProgress")
    expect(result.current.guesses).toHaveLength(1)
    expect(result.current.guesses[0].feedback).toEqual([
      "close",
      "exact",
      "exact",
      "exact",
      "exact",
      "exact",
      "exact",
      "exact",
    ])
    expect(store.getProgress("hp-test")?.guesses).toEqual(["10985000"])
  })

  it("rejects incomplete or invalid guesses", () => {
    const store = createInMemoryStore()

    const { result } = renderHook(() =>
      useHammerPriceGame({ puzzle: PUZZLE, store }),
    )

    act(() => {
      expect(result.current.submitGuess("123")).toBeNull()
      expect(result.current.submitGuess("")).toBeNull()
      expect(result.current.submitGuess("12345ab")).toBeNull()
    })

    expect(result.current.guesses).toEqual([])
  })

  it("wins when every digit is exact and rejects further guesses", () => {
    const store = createInMemoryStore()

    const { result } = renderHook(() =>
      useHammerPriceGame({ puzzle: PUZZLE, store }),
    )

    act(() => {
      result.current.submitGuess("00985000")
    })

    expect(result.current.status).toBe("won")

    act(() => {
      expect(result.current.submitGuess("11111111")).toBeNull()
    })

    expect(result.current.guesses).toHaveLength(1)
  })

  it("loses after six incorrect guesses", () => {
    const store = createInMemoryStore()

    const { result } = renderHook(() =>
      useHammerPriceGame({ puzzle: PUZZLE, store }),
    )

    Array.from({ length: 6 }).forEach(() => {
      act(() => {
        result.current.submitGuess("11111111")
      })
    })

    expect(result.current.status).toBe("lost")
    expect(result.current.guessesRemaining).toBe(0)
  })

  it("restores persisted progress", () => {
    const store = createInMemoryStore([
      {
        puzzleId: "hp-test",
        guesses: ["11111111", "00985000"],
        updatedAt: "2026-07-14T00:00:00.000Z",
      },
    ])

    const { result } = renderHook(() =>
      useHammerPriceGame({ puzzle: PUZZLE, store }),
    )

    expect(result.current.isRestored).toBe(true)
    expect(result.current.status).toBe("won")
    expect(result.current.guesses).toHaveLength(2)
  })

  it("discards malformed persisted guesses", () => {
    const store = createInMemoryStore([
      {
        puzzleId: "hp-test",
        guesses: ["123", "abcdefg", "11111111"],
        updatedAt: "2026-07-14T00:00:00.000Z",
      },
    ])

    const { result } = renderHook(() =>
      useHammerPriceGame({ puzzle: PUZZLE, store }),
    )

    expect(result.current.guesses).toHaveLength(1)
    expect(result.current.guesses[0].digits).toBe("11111111")
  })
})
