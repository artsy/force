import { allowedFilters } from "../allowedFilters"

describe("allowedFilters", () => {
  it("returns only supported params", () => {
    expect(
      allowedFilters({
        height: "*-*",
        majorPeriods: [],
        page: 1,
        priceRange: "*-*",
        sort: "-decayed_merch",
        width: "*-*",
        blah: 1,
      })
    ).toEqual({
      height: "*-*",
      majorPeriods: [],
      page: 1,
      priceRange: "*-*",
      sort: "-decayed_merch",
      width: "*-*",
    })
  })
})
