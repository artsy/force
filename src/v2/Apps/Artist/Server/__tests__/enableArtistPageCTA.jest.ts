import { enableArtistPageCTA } from "../enableArtistPageCTA"

describe("enableArtistPageCTA", () => {
  it("skips middleware if not correct pageType", () => {
    const req = {
      path: "/do-not-match",
      query: {
        "accepted-conditions": "true",
      },
      get: jest.fn(),
    }

    const res = {
      redirect: jest.fn(),
      locals: {
        sd: {
          APP_URL: "http://test.artsy.net",
          IS_MOBILE: false,
        },
      },
    }

    const next = jest.fn()
    enableArtistPageCTA({ req, res, next })
    expect(next).toHaveBeenCalled()
  })

  it("sets ARTIST_PAGE_CTA_ENABLED if external referrer", () => {
    const req = {
      path: "/artist/test-artist",
      user: {
        toJSON: () => null,
      },
      get: jest.fn(),
    }

    const res: {
      locals: any
    } = {
      locals: {
        sd: {
          APP_URL: "http://test.artsy.net",
          IS_MOBILE: false,
        },
      },
    }

    const next = jest.fn()
    enableArtistPageCTA({ req, res, next })
    expect(res.locals.sd.ARTIST_PAGE_CTA_ENABLED).toEqual(true)
    expect(res.locals.sd.ARTIST_PAGE_CTA_ARTIST_ID).toEqual("test-artist")
    expect(next).toHaveBeenCalled()
  })

  it("sets ARTIST_PAGE_CTA_ENABLED=false if not external referrer", () => {
    const req = {
      path: "/artist/test-artist",
      user: {
        toJSON: () => ({
          name: "foo",
        }),
      },
      get: jest.fn(),
    }

    const res: {
      locals: any
    } = {
      locals: {
        sd: {
          APP_URL: "http://test.artsy.net",
          IS_MOBILE: false,
        },
      },
    }

    const next = jest.fn()
    enableArtistPageCTA({ req, res, next })
    expect(res.locals.sd.ARTIST_PAGE_CTA_ENABLED).toEqual(false)
    expect(res.locals.sd.ARTIST_PAGE_CTA_ARTIST_ID).toEqual("test-artist")
    expect(next).toHaveBeenCalled()
  })
})
