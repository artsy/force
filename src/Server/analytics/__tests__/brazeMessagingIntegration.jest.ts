import { isMatchingRoute } from "Server/analytics/brazeMessagingIntegration"

describe("isMatchingRoute", () => {
  const validRoutes = [
    "/",
    "/art-fairs",
    "/article/best-art-in-the-world",
    "/articles",
    "/artist/andy-warhol",
    "/artists",
    "/auctions",
    "/collect",
    "/collection/curators-picks-emerging",
    "/fair/outside-tent-thingy",
    "/galleries",
    "/gene/works-on-paper",
    "/partner/abc-gallery",
    "/show/only-blue-paintings",
    "/shows",
    "/viewing-room/for-your-eyes-only",
    "/viewing-rooms",
  ]

  it("returns true for valid routes", () => {
    const validResults = validRoutes.map(route => isMatchingRoute(route))
    expect(validResults.length).toEqual(validResults.length)
  })

  const invalidRoutes = [
    "/artist/andy-warhol",
    "/auction/fancy-prints-2022",
    "/categories",
    "/collections",
    "/login",
    "/sell",
  ]

  it("returns false for invalid routes", () => {
    const invalidResults = invalidRoutes.map(route => !isMatchingRoute(route))
    expect(invalidResults.length).toEqual(invalidResults.length)
  })
})
