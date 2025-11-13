import {
  countryCodePrefix,
  getShippableCountries,
  isShippableAddress,
} from "../addressUtils"

describe("addressUtils", () => {
  describe("getShippableCountries", () => {
    it("filters countries to only include shippable ones", () => {
      const availableShippingCountries = ["US", "CA", "GB"]
      const result = getShippableCountries(availableShippingCountries)

      expect(result.length).toBeGreaterThan(0)
      expect(
        result.every(country =>
          availableShippingCountries
            .map(c => c.toLowerCase())
            .includes(country.value)
        )
      ).toBe(true)
    })

    it("handles empty shipping countries list", () => {
      const result = getShippableCountries([])
      expect(result).toEqual([])
    })

    it("handles case-insensitive matching", () => {
      const availableShippingCountries = ["us", "CA", "gb"]
      const result = getShippableCountries(availableShippingCountries)

      expect(result.length).toBeGreaterThan(0)
      expect(result.some(country => country.value === "us")).toBe(true)
      expect(result.some(country => country.value === "ca")).toBe(true)
      expect(result.some(country => country.value === "gb")).toBe(true)
    })
  })

  describe("isShippableAddress", () => {
    const availableShippingCountries = ["US", "CA", "GB"]

    it("returns true for addresses in shippable countries", () => {
      const address = { country: "US" }
      expect(isShippableAddress(address, availableShippingCountries)).toBe(true)
    })

    it("returns false for addresses not in shippable countries", () => {
      const address = { country: "FR" }
      expect(isShippableAddress(address, availableShippingCountries)).toBe(
        false
      )
    })

    it("handles case-insensitive country matching", () => {
      const address = { country: "us" }
      expect(isShippableAddress(address, availableShippingCountries)).toBe(true)
    })

    it("returns false for address without country", () => {
      const address = { country: "" }
      expect(isShippableAddress(address, availableShippingCountries)).toBe(
        false
      )
    })

    it("returns false for null/undefined address", () => {
      expect(isShippableAddress(null as any, availableShippingCountries)).toBe(
        false
      )
      expect(
        isShippableAddress(undefined as any, availableShippingCountries)
      ).toBe(false)
    })
  })

  describe("countryCodePrefix", () => {
    it("returns correct prefix for valid country codes", () => {
      expect(countryCodePrefix("US")).toBe("+1")
      expect(countryCodePrefix("GB")).toBe("+44")
      expect(countryCodePrefix("CA")).toBe("+1")
    })

    it("handles case-insensitive country codes", () => {
      expect(countryCodePrefix("us")).toBe("+1")
      expect(countryCodePrefix("gb")).toBe("+44")
    })

    it("returns empty string for invalid country codes", () => {
      expect(countryCodePrefix("XX")).toBe("")
      expect(countryCodePrefix("")).toBe("")
    })
  })
})
