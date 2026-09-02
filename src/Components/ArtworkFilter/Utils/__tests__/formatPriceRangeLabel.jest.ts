import { formatPriceRangeLabel } from "Components/ArtworkFilter/Utils/formatPriceRangeLabel"

describe("formatPriceRangeLabel", () => {
  it("names an upper bound", () => {
    expect(formatPriceRangeLabel("*-5000")).toBe("Under $5,000")
  })

  it("names a lower bound", () => {
    expect(formatPriceRangeLabel("2000-*")).toBe("$2,000 and up")
  })

  it("joins two bounds with an en dash", () => {
    expect(formatPriceRangeLabel("1000-5000")).toBe("$1,000–$5,000")
  })

  it("drops the cents", () => {
    expect(formatPriceRangeLabel("1500.75-5000.25")).toBe("$1,501–$5,000")
  })

  it("has no label for an unbounded range", () => {
    // The filter's cleared state
    expect(formatPriceRangeLabel("*-*")).toBeNull()
  })

  it("has no label for a range missing a bound", () => {
    // Would have formatted as "Under $NaN"
    expect(formatPriceRangeLabel("5000")).toBeNull()
    expect(formatPriceRangeLabel("5000-")).toBeNull()
    expect(formatPriceRangeLabel("-5000")).toBeNull()
  })

  it("has no label when the filter is unset", () => {
    expect(formatPriceRangeLabel(undefined)).toBeNull()
    expect(formatPriceRangeLabel(null)).toBeNull()
    expect(formatPriceRangeLabel("")).toBeNull()
  })
})
