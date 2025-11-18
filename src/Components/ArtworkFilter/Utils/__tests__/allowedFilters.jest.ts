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
      }),
    ).toEqual({
      height: "*-*",
      majorPeriods: [],
      page: 1,
      priceRange: "*-*",
      sort: "-decayed_merch",
      width: "*-*",
    })
  })

  it("coerces numeric inputs", () => {
    expect(
      allowedFilters({
        first: 100,
        last: "7.999",
        page: "9",
        size: "foobar",
      }),
    ).toEqual({
      first: 100,
      last: 7,
      page: 9,
      size: 1,
    })
  })

  it("coerces boolean inputs", () => {
    expect(
      allowedFilters({
        acquireable: "true",
        atAuction: "false",
        forSale: 1,
        includeArtworksByFollowedArtists: "",
        includeMediumFilterInAggregation: "garbage",
      }),
    ).toEqual({
      acquireable: true,
      atAuction: false,
      forSale: false,
      includeArtworksByFollowedArtists: false,
      includeMediumFilterInAggregation: false,
    })
  })

  it("allows auction-specific sort values", () => {
    expect(
      allowedFilters({
        sort: "bidder_positions_count",
      }),
    ).toEqual({
      sort: "bidder_positions_count",
    })

    expect(
      allowedFilters({
        sort: "-bidder_positions_count",
      }),
    ).toEqual({
      sort: "-bidder_positions_count",
    })

    expect(
      allowedFilters({
        sort: "sale_position",
      }),
    ).toEqual({
      sort: "sale_position",
    })

    expect(
      allowedFilters({
        sort: "-sale_position",
      }),
    ).toEqual({
      sort: "-sale_position",
    })

    expect(
      allowedFilters({
        sort: "prices",
      }),
    ).toEqual({
      sort: "prices",
    })

    expect(
      allowedFilters({
        sort: "-prices",
      }),
    ).toEqual({
      sort: "-prices",
    })
  })

  it("filters out invalid sort values", () => {
    expect(
      allowedFilters({
        sort: "invalid_sort_value",
      }),
    ).toEqual({})
  })
})
