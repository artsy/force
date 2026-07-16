import type { HammerPricePuzzle } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import {
  getBrowsablePuzzles,
  getDailyPuzzle,
  getPuzzleByAuctionResultId,
  getPuzzleNumber,
} from "Apps/Games/Routes/HammerPrice/Utils/puzzleSelection"

const puzzle = (attributes: Partial<HammerPricePuzzle>): HammerPricePuzzle => {
  return {
    auctionResultId: "1",
    date: "2026-07-01",
    isActive: true,
    ...attributes,
  }
}

const PUZZLES = [
  puzzle({ auctionResultId: "111", date: "2026-07-01" }),
  puzzle({ auctionResultId: "222", date: "2026-07-02" }),
  puzzle({ auctionResultId: "333", date: "2026-07-03", isActive: false }),
  puzzle({ auctionResultId: "444", date: "2026-07-04" }),
]

describe("getDailyPuzzle", () => {
  it("returns the puzzle matching today", () => {
    expect(
      getDailyPuzzle({ today: "2026-07-02", puzzles: PUZZLES })
        ?.auctionResultId,
    ).toBe("222")
  })

  it("falls back to the most recent past puzzle", () => {
    expect(
      getDailyPuzzle({ today: "2026-07-10", puzzles: PUZZLES })
        ?.auctionResultId,
    ).toBe("444")
  })

  it("ignores inactive puzzles", () => {
    expect(
      getDailyPuzzle({ today: "2026-07-03", puzzles: PUZZLES })
        ?.auctionResultId,
    ).toBe("222")
  })

  it("falls back to the earliest puzzle before any are published", () => {
    expect(
      getDailyPuzzle({ today: "2026-06-01", puzzles: PUZZLES })
        ?.auctionResultId,
    ).toBe("111")
  })

  it("returns null when there are no active puzzles", () => {
    expect(getDailyPuzzle({ today: "2026-07-02", puzzles: [] })).toBeNull()
  })
})

describe("getPuzzleByAuctionResultId", () => {
  it("finds active puzzles by auction result id", () => {
    expect(
      getPuzzleByAuctionResultId({ auctionResultId: "222", puzzles: PUZZLES })
        ?.date,
    ).toBe("2026-07-02")
  })

  it("does not find inactive puzzles", () => {
    expect(
      getPuzzleByAuctionResultId({ auctionResultId: "333", puzzles: PUZZLES }),
    ).toBeNull()
  })

  it("returns null for unknown ids", () => {
    expect(
      getPuzzleByAuctionResultId({ auctionResultId: "999", puzzles: PUZZLES }),
    ).toBeNull()
  })
})

describe("getBrowsablePuzzles", () => {
  it("returns published, active puzzles newest first", () => {
    const browsable = getBrowsablePuzzles({
      today: "2026-07-02",
      puzzles: PUZZLES,
    })

    expect(browsable.map(({ auctionResultId }) => auctionResultId)).toEqual([
      "222",
      "111",
    ])
  })
})

describe("getPuzzleNumber", () => {
  it("numbers puzzles chronologically among active puzzles", () => {
    expect(getPuzzleNumber({ auctionResultId: "111", puzzles: PUZZLES })).toBe(
      1,
    )
    expect(getPuzzleNumber({ auctionResultId: "444", puzzles: PUZZLES })).toBe(
      3,
    )
  })

  it("returns null for auction results that are not configured puzzles", () => {
    expect(
      getPuzzleNumber({ auctionResultId: "999", puzzles: PUZZLES }),
    ).toBeNull()
  })
})
