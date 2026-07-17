import {
  getDefaultPuzzleId,
  getPuzzleIds,
  getPuzzleNumber,
} from "Apps/Games/Routes/HammerPrice/Utils/puzzleSelection"

const PUZZLES = ["111", "222", "333"]

describe("getPuzzleIds", () => {
  it("returns the puzzle ids in order", () => {
    expect(getPuzzleIds(PUZZLES)).toEqual(["111", "222", "333"])
  })
})

describe("getDefaultPuzzleId", () => {
  it("returns the first puzzle id", () => {
    expect(getDefaultPuzzleId(PUZZLES)).toBe("111")
  })

  it("returns null when there are no puzzles", () => {
    expect(getDefaultPuzzleId([])).toBeNull()
  })
})

describe("getPuzzleNumber", () => {
  it("numbers puzzles by their position in the list", () => {
    expect(getPuzzleNumber({ auctionResultId: "111", puzzles: PUZZLES })).toBe(
      1,
    )
    expect(getPuzzleNumber({ auctionResultId: "333", puzzles: PUZZLES })).toBe(
      3,
    )
  })

  it("returns null for auction results that are not configured puzzles", () => {
    expect(
      getPuzzleNumber({ auctionResultId: "999", puzzles: PUZZLES }),
    ).toBeNull()
  })
})
