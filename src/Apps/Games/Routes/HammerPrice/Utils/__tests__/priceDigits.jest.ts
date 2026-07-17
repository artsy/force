import {
  currencyPrefix,
  formatDigitsWithSeparators,
  formatPrice,
  hasSeparatorBefore,
  priceToDigits,
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

describe("formatPrice", () => {
  it("formats an integer price for display", () => {
    expect(formatPrice({ price: 98385000, currency: "USD" })).toBe(
      "US$98,385,000",
    )
    expect(formatPrice({ price: 212500, currency: "GBP" })).toBe("£212,500")
  })
})
