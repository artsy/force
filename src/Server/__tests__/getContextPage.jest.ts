import { getContextPageFromClient } from "Server/getContextPage"

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://artsy.net",
  },
}))

describe("getContextPageFromClient", () => {
  it("returns correct props", () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    delete window.location
    // @ts-ignore
    window.location = new URL("https://artsy.net/artist/test-artist")
    const page = getContextPageFromClient()

    expect(page).toEqual({
      canonicalUrl: "https://artsy.net/artist/test-artist",
      pageParts: ["", "artist", "test-artist"],
      pageSlug: "test-artist",
      pageType: "artist",
      path: "/artist/test-artist",
    })
  })

  it("handles camelcasing", () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    delete window.location
    // @ts-ignore
    window.location = new URL(
      "https://artsy.net/artist-series/test-artist-series"
    )
    const page = getContextPageFromClient()

    expect(page).toEqual({
      canonicalUrl: "https://artsy.net/artist-series/test-artist-series",
      pageParts: ["", "artist-series", "test-artist-series"],
      pageSlug: "test-artist-series",
      pageType: "artistSeries",
      path: "/artist-series/test-artist-series",
    })
  })
})
