import { redirectCollectionToArtistSeries } from "Apps/Collect/Server/redirectCollectionToArtistSeries"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"

describe("redirectCollectionToArtistSeries", () => {
  it("does not redirect for a non-migrated artist series", () => {
    const req = {
      params: {
        slug: "not-artist-series",
      },
    }
    const res = {
      redirect: jest.fn(),
      locals: { sd: {} },
    }
    const next = jest.fn()

    redirectCollectionToArtistSeries(
      req as unknown as ArtsyRequest,
      res as unknown as ArtsyResponse,
      next,
    )
    expect(res.redirect).not.toHaveBeenCalled()
  })

  it("redirects for a migrated series", () => {
    const spy = jest.fn()
    const req = {
      params: {
        slug: "kaws-four-foot-companion",
      },
    }
    const res = {
      redirect: spy,
      locals: {
        sd: {},
      },
    }
    const next = jest.fn()

    redirectCollectionToArtistSeries(
      req as unknown as ArtsyRequest,
      res as unknown as ArtsyResponse,
      next,
    )

    expect(spy).toHaveBeenCalledWith(
      301,
      "/artist-series/kaws-4-foot-companion",
    )
  })
})
