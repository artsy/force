import {
  getFilterParams,
  buildQueryStringWithFilterParams,
  AUCTION_RESULTS_FILTER_PARAMS,
} from "../filterParams"

describe("getFilterParams", () => {
  it("filters and sorts parameters correctly", () => {
    const searchParams = new URLSearchParams(
      "?sort=DATE_DESC&page=2&categories=painting&medium=photography&unknown=value",
    )

    const result = getFilterParams(searchParams, AUCTION_RESULTS_FILTER_PARAMS)

    expect(result).toEqual({
      categories: "painting",
      sort: "DATE_DESC",
    })
  })

  it("excludes empty values", () => {
    const searchParams = new URLSearchParams(
      "?sort=&keyword=picasso&categories=&page=1&unknown=",
    )

    const result = getFilterParams(searchParams, AUCTION_RESULTS_FILTER_PARAMS)

    expect(result).toEqual({
      keyword: "picasso",
    })
  })

  it("handles array parameters and normalizes them", () => {
    const searchParams = new URLSearchParams(
      "?attribution_class[0]=authentic&attribution_class[1]=attributed&categories=painting&page=2",
    )

    const result = getFilterParams(searchParams, [
      ...AUCTION_RESULTS_FILTER_PARAMS,
      "attribution_class",
    ])

    expect(result).toEqual({
      attribution_class: "attributed,authentic", // sorted alphabetically
      categories: "painting",
    })
  })

  it("handles array parameters in different order consistently", () => {
    const searchParams1 = new URLSearchParams(
      "?attribution_class[0]=authentic&attribution_class[1]=attributed",
    )
    const searchParams2 = new URLSearchParams(
      "?attribution_class[1]=attributed&attribution_class[0]=authentic",
    )

    const result1 = getFilterParams(searchParams1, ["attribution_class"])
    const result2 = getFilterParams(searchParams2, ["attribution_class"])

    expect(result1).toEqual(result2)
    expect(result1).toEqual({
      attribution_class: "attributed,authentic", // always sorted the same way
    })
  })

  it("handles snake_case parameters correctly", () => {
    const searchParams = new URLSearchParams(
      "?price_range=1000-5000&artist_ids=picasso&medium=painting",
    )

    const result = getFilterParams(searchParams, [
      "price_range",
      "artist_ids",
      "medium",
    ])

    expect(result).toEqual({
      price_range: "1000-5000",
      artist_ids: "picasso",
      medium: "painting",
    })
  })
})

describe("buildQueryStringWithFilterParams", () => {
  it("builds sorted query string", () => {
    const searchParams = new URLSearchParams(
      "?sort=DATE_DESC&page=2&categories=painting&keyword=picasso&unknown=ignore",
    )

    const result = buildQueryStringWithFilterParams(
      searchParams,
      AUCTION_RESULTS_FILTER_PARAMS,
    )

    expect(result).toBe("categories=painting&keyword=picasso&sort=DATE_DESC")
  })

  it("returns empty string when no valid params", () => {
    const searchParams = new URLSearchParams(
      "?page=2&unknown=value&medium=sculpture",
    )

    const result = buildQueryStringWithFilterParams(
      searchParams,
      AUCTION_RESULTS_FILTER_PARAMS,
    )

    expect(result).toBe("")
  })
})
