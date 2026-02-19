import { truncateText } from "Utils/truncateText"

describe("truncateText", () => {
  it("returns the original string if it is within the length limit", () => {
    expect(truncateText("Hello", { length: 10 })).toBe("Hello")
  })

  it("returns the original string if it is exactly the length limit", () => {
    expect(truncateText("Hello", { length: 5 })).toBe("Hello")
  })

  it("truncates a long string and adds ellipsis", () => {
    const result = truncateText("This is a long string that should be truncated", {
      length: 20,
    })
    expect(result).toBe("This is a long st...")
    expect(result.length).toBeLessThanOrEqual(20)
  })

  it("truncates at the last separator when provided", () => {
    const result = truncateText(
      "Buy, bid, and inquire on artworks on Artsy. A wonderful collection of modern art.",
      { length: 60, separator: " " }
    )
    expect(result).toMatch(/\.\.\.$/)
    expect(result.length).toBeLessThanOrEqual(60)
    // Should break at a word boundary (space), not mid-word
    expect(result).toBe(
      "Buy, bid, and inquire on artworks on Artsy. A wonderful..."
    )
  })

  it("handles separator with length 160", () => {
    const input =
      "Explore and collect art from this iconic series and more. Discover the full breadth of works available including paintings, sculptures, and mixed media pieces."
    const result = truncateText(input, { length: 160, separator: " " })
    expect(result.length).toBeLessThanOrEqual(160)
  })

  it("handles an empty string", () => {
    expect(truncateText("", { length: 10 })).toBe("")
  })

  it("handles a string shorter than 3 characters with a small length limit", () => {
    expect(truncateText("Hello World", { length: 4 })).toBe("H...")
  })
})
