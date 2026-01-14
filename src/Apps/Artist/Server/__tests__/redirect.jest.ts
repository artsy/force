import { rewriteAuctionResultsParamsToNamespace } from "../redirect"

describe(rewriteAuctionResultsParamsToNamespace, () => {
  it("returns empty object when query is absent", () => {
    expect(rewriteAuctionResultsParamsToNamespace(null)).toEqual({})
    expect(rewriteAuctionResultsParamsToNamespace(undefined)).toEqual({})
    expect(rewriteAuctionResultsParamsToNamespace({})).toEqual({})
  })

  it("returns original query when already namespaced", () => {
    const query = {
      auction: { sort: "DATE_DESC", page: 2 },
      foo: "bar",
    }

    const result = rewriteAuctionResultsParamsToNamespace(query)

    expect(result).toEqual(query)
  })

  it("rewrites auction params to namespace", () => {
    const query = { sort: "DATE_DESC", page: 2 }

    const result = rewriteAuctionResultsParamsToNamespace(query)

    expect(result).toEqual({
      auction: { sort: "DATE_DESC", page: 2 },
    })
  })

  it("preserves non-auction params while moving auction params to namespace", () => {
    const query = {
      sort: "DATE_DESC",
      page: 2,
      tab: "foo",
      baz: "qux",
    }

    const result = rewriteAuctionResultsParamsToNamespace(query)

    expect(result).toEqual({
      tab: "foo",
      baz: "qux",
      auction: { sort: "DATE_DESC", page: 2 },
    })
  })
})
