import { enableArtistPageCTA } from "../enableArtistPageCTA"

describe("enableArtistPageCTA", () => {
  it("sets ARTIST_PAGE_CTA_ENABLED if external referrer", () => {
    const req = {
      path: "/artist/test-artist",
      params: {
        artistID: "test-artist",
      },
      user: null,
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

    enableArtistPageCTA({ req, res })
    expect(res.locals.sd.ARTIST_PAGE_CTA_ENABLED).toEqual(true)
    expect(res.locals.sd.ARTIST_PAGE_CTA_ARTIST_ID).toEqual("test-artist")
  })

  it("sets ARTIST_PAGE_CTA_ENABLED=false if not external referrer", () => {
    const req = {
      path: "/artist/test-artist",
      params: {
        artistID: "test-artist",
      },
      user: {
        name: "foo",
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

    enableArtistPageCTA({ req, res })
    expect(res.locals.sd.ARTIST_PAGE_CTA_ENABLED).toEqual(false)
    expect(res.locals.sd.ARTIST_PAGE_CTA_ARTIST_ID).toEqual("test-artist")
  })
})
