import type { DigitFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"
import { buildShareText } from "Apps/Games/Routes/HammerPrice/Utils/shareText"

describe("buildShareText", () => {
  it("builds a spoiler-free emoji grid for a win", () => {
    const text = buildShareText({
      puzzleNumber: 8,
      feedbacks: [
        ["close", "miss", "exact"],
        ["exact", "exact", "exact"],
      ],
      won: true,
      url: "https://www.artsy.net/games/hammer-price/puzzles/example",
    })

    expect(text).toBe(
      [
        "Hammer Price #8 2/6",
        "",
        "🟨⬜🟩",
        "🟩🟩🟩",
        "",
        "https://www.artsy.net/games/hammer-price/puzzles/example",
      ].join("\n"),
    )
  })

  it("shows X for a loss", () => {
    const text = buildShareText({
      puzzleNumber: 1,
      feedbacks: Array.from({ length: 6 }, (): DigitFeedback[] => ["miss"]),
      won: false,
      url: "https://example.com",
    })

    expect(text).toContain("Hammer Price #1 X/6")
  })

  it("never contains digits from the guesses", () => {
    const text = buildShareText({
      puzzleNumber: 2,
      feedbacks: [["exact", "close", "miss"]],
      won: false,
      url: "https://example.com/puzzles/slug",
    })

    const withoutHeaderAndUrl = text.split("\n").slice(1, -1).join("\n")

    expect(withoutHeaderAndUrl).not.toMatch(/\d/)
  })
})
