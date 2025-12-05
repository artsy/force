import type { ArtsyRequest } from "Server/middleware/artsyExpress"
import {
  redirectAuctionResultsParamsToNamespace,
  rewriteAuctionResultsParamsToNamespace,
} from "../redirect"

describe(redirectAuctionResultsParamsToNamespace, () => {
  it("ignores a bare request /artist/foo/auction-results", () => {
    const req: Partial<ArtsyRequest> = {
      params: { artistID: "foo" },
      path: "/artist/foo/auction-results",
      query: {},
    }

    const res = {
      redirect: jest.fn(),
    }

    redirectAuctionResultsParamsToNamespace({ req, res })

    expect(res.redirect).not.toHaveBeenCalled()
  })

  it("redirects a non-namespaced request /artist/foo/auction-result?sort=DATE_DESC", () => {
    const req: Partial<ArtsyRequest> = {
      params: { artistID: "foo" },
      path: "/artist/foo/auction-results",
      query: { sort: "DATE_DESC" },
    }

    const res = {
      redirect: jest.fn(),
    }

    redirectAuctionResultsParamsToNamespace({ req, res })

    expect(res.redirect).toHaveBeenCalledTimes(1)
    expect(res.redirect).toHaveBeenCalledWith(
      301,
      "/artist/foo/auction-results?auction%5Bsort%5D=DATE_DESC",
    )
  })

  it("ignores a namespaced request /artist/foo/auction-result?auction[sort]=DATE_DESC", () => {
    const req: Partial<ArtsyRequest> = {
      params: { artistID: "foo" },
      path: "/artist/foo/auction-results",
      query: { auction: { sort: "DATE_DESC" } },
    }

    const res = {
      redirect: jest.fn(),
    }

    redirectAuctionResultsParamsToNamespace({ req, res })

    expect(res.redirect).not.toHaveBeenCalled()
  })
})

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
