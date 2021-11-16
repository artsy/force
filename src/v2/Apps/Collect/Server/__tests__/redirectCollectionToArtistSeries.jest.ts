import { redirectCollectionToArtistSeries } from "../redirectCollectionToArtistSeries"

describe("redirectCollectionToArtistSeries", () => {
  it("does not redirect for a non-migrated artist series", () => {
    const req = {
      params: {
        collectionSlug: "not-artist-series",
      },
    }
    const res = {
      redirect: jest.fn(),
      locals: { sd: {} },
    }
    redirectCollectionToArtistSeries({ req, res })
    expect(res.redirect).not.toHaveBeenCalled()
  })

  it("redirects for a migrated series", () => {
    const spy = jest.fn()
    const req = {
      params: {
        collectionSlug: "kaws-four-foot-companion",
      },
    }
    const res = {
      redirect: spy,
      locals: {
        sd: {},
      },
    }

    redirectCollectionToArtistSeries({ req, res })
    expect(spy).toHaveBeenCalledWith(
      301,
      "/artist-series/kaws-4-foot-companion"
    )
  })
})
