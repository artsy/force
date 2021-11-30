import { appendCurrencySymbol } from "v2/Apps/Order/Utils/currencyUtils"

describe("#appendCurrencySymbol", () => {
  it("correctly appends US currency symbol", () => {
    expect(appendCurrencySymbol("11111", "USD")).toBe("US$11111")
    expect(appendCurrencySymbol("-", "USD")).toBe("-")
    expect(appendCurrencySymbol("gobledygook", "USD")).toBe("gobledygook")
    expect(appendCurrencySymbol(22222, "USD")).toBe("US$22222")
    expect(appendCurrencySymbol("Under $1000", "USD")).toBe("Under US$1000")
    expect(appendCurrencySymbol("", "USD")).toBe("")
    expect(appendCurrencySymbol(null, "USD")).toBe(null)
    expect(appendCurrencySymbol(undefined, "USD")).toBe(undefined)
    expect(appendCurrencySymbol(44444, "GBP")).toBe(44444)
    expect(appendCurrencySymbol("€150", "EUR")).toBe("€150")
    expect(appendCurrencySymbol("£150", "GBP")).toBe("£150")
    expect(appendCurrencySymbol(0, "USD")).toBe("US$0")
    expect(appendCurrencySymbol("0", "USD")).toBe("US$0")
    expect(appendCurrencySymbol(0, "EUR")).toBe(0)
    expect(appendCurrencySymbol("0", "EUR")).toBe("0")
    expect(appendCurrencySymbol("$60,000 - 78,000", "USD")).toBe(
      "US$60,000 - 78,000"
    )
  })
})
