import {
  isWinningFeedback,
  scoreGuess,
} from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"

describe("scoreGuess", () => {
  it("marks matching digits as exact", () => {
    expect(scoreGuess({ guess: "123", target: "123" })).toEqual([
      "exact",
      "exact",
      "exact",
    ])
  })

  it("marks digits within two as close", () => {
    expect(scoreGuess({ guess: "135", target: "313" })).toEqual([
      "close",
      "close",
      "close",
    ])
  })

  it("marks digits more than two away as miss", () => {
    expect(scoreGuess({ guess: "090", target: "909" })).toEqual([
      "miss",
      "miss",
      "miss",
    ])
  })

  it("scores each position independently without wrap-around", () => {
    // 9 and 0 are nine apart, not one
    expect(scoreGuess({ guess: "9", target: "0" })).toEqual(["miss"])
  })

  it("scores leading zeroes like any other digit", () => {
    expect(scoreGuess({ guess: "0985000", target: "0985000" })).toEqual([
      "exact",
      "exact",
      "exact",
      "exact",
      "exact",
      "exact",
      "exact",
    ])
  })

  it("scores a realistic mixed guess", () => {
    expect(scoreGuess({ guess: "1500000", target: "2175000" })).toEqual([
      "close", // 1 vs 2
      "miss", // 5 vs 1
      "miss", // 0 vs 7
      "miss", // 0 vs 5
      "exact", // 0 vs 0
      "exact", // 0 vs 0
      "exact", // 0 vs 0
    ])
  })

  it("throws when lengths differ", () => {
    expect(() => scoreGuess({ guess: "12", target: "123" })).toThrow()
  })

  it("throws on non-digit input", () => {
    expect(() => scoreGuess({ guess: "12a", target: "123" })).toThrow()
  })
})

describe("isWinningFeedback", () => {
  it("is true only when every digit is exact", () => {
    expect(isWinningFeedback(["exact", "exact"])).toBe(true)
    expect(isWinningFeedback(["exact", "close"])).toBe(false)
    expect(isWinningFeedback([])).toBe(false)
  })
})
