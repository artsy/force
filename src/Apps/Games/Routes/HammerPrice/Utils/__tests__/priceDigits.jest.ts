import {
  currencyPrefix,
  formatDigitsWithSeparators,
  hasSeparatorBefore,
  priceToDigits,
  realizedPriceToTargetDigits,
} from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"

describe("priceToDigits", () => {
  it("zero-pads to the configured width", () => {
    expect(priceToDigits({ price: 985000, digitCount: 7 })).toBe("0985000")
  })

  it("returns the exact digits when the price fills the width", () => {
    expect(priceToDigits({ price: 98385000, digitCount: 8 })).toBe("98385000")
  })

  it("throws when the price does not fit", () => {
    expect(() => priceToDigits({ price: 98385000, digitCount: 6 })).toThrow()
  })

  it("throws on non-integer prices", () => {
    expect(() => priceToDigits({ price: 1234.5, digitCount: 7 })).toThrow()
  })
})

describe("hasSeparatorBefore", () => {
  it("places separators every three digits from the right", () => {
    const separators = Array.from({ length: 8 }, (_, index) => {
      return hasSeparatorBefore({ index, digitCount: 8 })
    })

    // 98,385,000
    expect(separators).toEqual([
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
    ])
  })
})

describe("formatDigitsWithSeparators", () => {
  it("formats a complete entry", () => {
    expect(formatDigitsWithSeparators({ digits: "98385000" })).toBe(
      "98,385,000",
    )
  })

  it("keeps leading zeroes visible", () => {
    expect(formatDigitsWithSeparators({ digits: "0985000" })).toBe("0,985,000")
  })

  it("anchors separators to the fixed width for partial entries", () => {
    expect(formatDigitsWithSeparators({ digits: "12", digitCount: 7 })).toBe(
      "1,2",
    )
  })
})

describe("currencyPrefix", () => {
  it("maps known currencies", () => {
    expect(currencyPrefix("USD")).toBe("US$")
    expect(currencyPrefix("GBP")).toBe("£")
  })

  it("falls back to the code for unknown currencies", () => {
    expect(currencyPrefix("SEK")).toBe("SEK ")
  })
})

describe("realizedPriceToTargetDigits", () => {
  it("converts USD cents to zero-padded target digits", () => {
    expect(realizedPriceToTargetDigits(98_500_000)).toBe("00985000")
  })

  it("fills the standard width exactly", () => {
    expect(realizedPriceToTargetDigits(9_838_500_000)).toBe("98385000")
  })

  it("widens beyond the standard width for very large prices", () => {
    expect(realizedPriceToTargetDigits(12_345_678_900)).toBe("123456789")
  })

  it("rounds sub-dollar cents", () => {
    expect(realizedPriceToTargetDigits(98_500_050)).toBe("00985001")
  })

  it("is null for missing or non-positive prices", () => {
    expect(realizedPriceToTargetDigits(null)).toBeNull()
    expect(realizedPriceToTargetDigits(undefined)).toBeNull()
    expect(realizedPriceToTargetDigits(0)).toBeNull()
    expect(realizedPriceToTargetDigits(-100)).toBeNull()
    expect(realizedPriceToTargetDigits(Number.NaN)).toBeNull()
  })
})
