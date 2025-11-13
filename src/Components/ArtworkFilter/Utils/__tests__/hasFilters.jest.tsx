import { hasFilters } from "../hasFilters"

describe("hasFilters", () => {
  it("returns false if only default filters have been applied", () => {
    expect(
      hasFilters({
        height: "*-*",
        majorPeriods: [],
        page: 1,
        priceRange: "*-*",
        sort: "-decayed_merch",
        width: "*-*",
      })
    ).toEqual(false)
  })

  it("returns true if additional filters have been applied", () => {
    expect(
      hasFilters({
        acquireable: true,
        height: "*-*",
        majorPeriods: [],
        page: 1,
        priceRange: "*-*",
        sort: "-decayed_merch",
        width: "*-*",
      })
    ).toEqual(true)
  })
})
