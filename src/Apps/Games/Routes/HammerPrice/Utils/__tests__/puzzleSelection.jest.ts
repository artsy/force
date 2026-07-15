import type { HammerPricePuzzle } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import {
  getBrowsablePuzzles,
  getDailyPuzzle,
  getPuzzleBySlug,
  getPuzzleNumber,
} from "Apps/Games/Routes/HammerPrice/Utils/puzzleSelection"

const puzzle = (attributes: Partial<HammerPricePuzzle>): HammerPricePuzzle => {
  return {
    id: "hp-test",
    slug: "test",
    auctionResultId: "1",
    date: "2026-07-01",
    priceRealizedUSD: 100000,
    priceRealized: 100000,
    currency: "USD",
    isActive: true,
    artistName: "Artist",
    title: "Title",
    ...attributes,
  }
}

const PUZZLES = [
  puzzle({ id: "hp-1", slug: "one", date: "2026-07-01" }),
  puzzle({ id: "hp-2", slug: "two", date: "2026-07-02" }),
  puzzle({ id: "hp-3", slug: "three", date: "2026-07-03", isActive: false }),
  puzzle({ id: "hp-4", slug: "four", date: "2026-07-04" }),
]

describe("getDailyPuzzle", () => {
  it("returns the puzzle matching today", () => {
    expect(getDailyPuzzle({ today: "2026-07-02", puzzles: PUZZLES })?.id).toBe(
      "hp-2",
    )
  })

  it("falls back to the most recent past puzzle", () => {
    expect(getDailyPuzzle({ today: "2026-07-10", puzzles: PUZZLES })?.id).toBe(
      "hp-4",
    )
  })

  it("ignores inactive puzzles", () => {
    expect(getDailyPuzzle({ today: "2026-07-03", puzzles: PUZZLES })?.id).toBe(
      "hp-2",
    )
  })

  it("falls back to the earliest puzzle before any are published", () => {
    expect(getDailyPuzzle({ today: "2026-06-01", puzzles: PUZZLES })?.id).toBe(
      "hp-1",
    )
  })

  it("returns null when there are no active puzzles", () => {
    expect(getDailyPuzzle({ today: "2026-07-02", puzzles: [] })).toBeNull()
  })
})

describe("getPuzzleBySlug", () => {
  it("finds active puzzles by slug", () => {
    expect(getPuzzleBySlug({ slug: "two", puzzles: PUZZLES })?.id).toBe("hp-2")
  })

  it("does not find inactive puzzles", () => {
    expect(getPuzzleBySlug({ slug: "three", puzzles: PUZZLES })).toBeNull()
  })

  it("returns null for unknown slugs", () => {
    expect(getPuzzleBySlug({ slug: "nope", puzzles: PUZZLES })).toBeNull()
  })
})

describe("getBrowsablePuzzles", () => {
  it("returns published, active puzzles newest first", () => {
    const browsable = getBrowsablePuzzles({
      today: "2026-07-02",
      puzzles: PUZZLES,
    })

    expect(browsable.map(({ id }) => id)).toEqual(["hp-2", "hp-1"])
  })
})

describe("getPuzzleNumber", () => {
  it("numbers puzzles chronologically among active puzzles", () => {
    expect(getPuzzleNumber({ puzzle: PUZZLES[0], puzzles: PUZZLES })).toBe(1)
    expect(getPuzzleNumber({ puzzle: PUZZLES[3], puzzles: PUZZLES })).toBe(3)
  })
})
