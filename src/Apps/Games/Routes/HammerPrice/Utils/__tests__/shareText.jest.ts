import type { DigitFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"
import {
  buildShareText,
  feedbackToEmojiRow,
} from "Apps/Games/Routes/HammerPrice/Utils/shareText"

describe("feedbackToEmojiRow", () => {
  it("places commas at the thousands-separator positions of an 8-digit row", () => {
    const feedback: DigitFeedback[] = [
      "exact",
      "close",
      "miss",
      "exact",
      "close",
      "miss",
      "exact",
      "close",
    ]

    // Grouped 2-3-3, matching “00,000,000”
    expect(feedbackToEmojiRow(feedback)).toBe("🟩🟨,⬜🟩🟨,⬜🟩🟨")
  })

  it("adds no commas to short rows", () => {
    expect(feedbackToEmojiRow(["exact", "close", "miss"])).toBe("🟩🟨⬜")
  })
})

describe("buildShareText", () => {
  const feedbacks: DigitFeedback[][] = [
    ["close", "miss", "exact"],
    ["exact", "exact", "exact"],
  ]

  it("leads with 'Hammer Price: Name, Title (Year)', then the grid", () => {
    const text = buildShareText({
      artistName: "Mark Rothko",
      title: "No. 15",
      dateText: "1964",
      feedbacks,
      url: "https://www.artsy.net/games/hammer-price/puzzles/example",
      includeLink: false,
    })

    expect(text).toBe(
      ["Hammer Price: Mark Rothko, No. 15 (1964)", "", "🟨⬜🟩", "🟩🟩🟩"].join(
        "\n",
      ),
    )
  })

  it("omits the parenthetical year when unavailable", () => {
    const text = buildShareText({
      artistName: "Mark Rothko",
      title: "No. 15",
      dateText: null,
      feedbacks,
      url: "https://www.artsy.net/games/hammer-price/puzzles/example",
      includeLink: false,
    })

    expect(text.split("\n")[0]).toBe("Hammer Price: Mark Rothko, No. 15")
  })

  it("omits the link unless requested", () => {
    const text = buildShareText({
      artistName: "Mark Rothko",
      title: "No. 15",
      dateText: "1964",
      feedbacks,
      url: "https://www.artsy.net/games/hammer-price/puzzles/example",
      includeLink: false,
    })

    expect(text).not.toContain("https://")
  })

  it("appends the link when requested", () => {
    const text = buildShareText({
      artistName: "Mark Rothko",
      title: "No. 15",
      dateText: "1964",
      feedbacks,
      url: "https://www.artsy.net/games/hammer-price/puzzles/example",
      includeLink: true,
    })

    expect(text).toBe(
      [
        "Hammer Price: Mark Rothko, No. 15 (1964)",
        "",
        "🟨⬜🟩",
        "🟩🟩🟩",
        "",
        "https://www.artsy.net/games/hammer-price/puzzles/example",
      ].join("\n"),
    )
  })

  it("never leaks guess digits in the emoji grid", () => {
    const text = buildShareText({
      artistName: "Robert Morris",
      title: "Untitled",
      dateText: "1996",
      feedbacks: [["exact", "close", "miss"]],
      url: "https://example.com/puzzles/503667",
      includeLink: false,
    })

    // The grid is everything after the header line
    const grid = text.split("\n").slice(2).join("\n")

    expect(grid).not.toMatch(/\d/)
  })
})
