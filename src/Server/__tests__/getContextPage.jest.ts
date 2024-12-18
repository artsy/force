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
    // Delete the existing `location` property to redefine it

    // @ts-ignore
    // biome-ignore lint/performance/noDelete: <explanation>
    delete window.location

    const testUrl = "https://artsy.net/artist-series/test-artist-series"

    // Redefine `window.location` as a mockable object
    Object.defineProperty(window, "location", {
      configurable: true,
      value: new URL(testUrl),
    })

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
