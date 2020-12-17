import { handleCollectionToArtistSeriesRedirect } from "../collectionMiddleware"

describe("handleCollectionToArtistSeriesRedirect", () => {
  it("does not redirect for a non-migrated artist series", () => {
    const req = {
      params: {
        collectionSlug: "not-artist-series",
      },
    }
    const res = {
      locals: { sd: {} },
      redirect: jest.fn(),
    }
    const next = jest.fn()

    handleCollectionToArtistSeriesRedirect(req, res, next)

    expect(res.redirect).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it("redirects for a migrated series", () => {
    const spy = jest.fn()
    const req = {
      params: {
        collectionSlug: "kaws-four-foot-companion",
      },
    }
    const res = {
      locals: {
        sd: {},
      },
      redirect: spy,
    }

    const next = jest.fn()
    handleCollectionToArtistSeriesRedirect(req, res, next)
    expect(spy).toHaveBeenCalledWith(
      301,
      "/artist-series/kaws-4-foot-companion"
    )
    expect(next).not.toHaveBeenCalled()
  })
})
