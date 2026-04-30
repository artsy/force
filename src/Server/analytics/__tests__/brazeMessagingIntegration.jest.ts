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

  it.each(validRoutes)("returns true for %s", route => {
    expect(isMatchingRoute(route)).toBe(true)
  })

  const invalidRoutes = [
    "/auction/fancy-prints-2022",
    "/categories",
    "/collections",
    "/login",
    "/sell",
  ]

  it.each(invalidRoutes)("returns false for %s", route => {
    expect(isMatchingRoute(route)).toBe(false)
  })
})
