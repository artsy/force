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
