import { artistRoutes } from "Apps/Artist/artistRoutes"

jest.mock("Server/context", () => ({
  updateContext: jest.fn(),
}))

const [appRoute, subAppRoute] = artistRoutes

const findRender = (route, path) => {
  return route.children.find(child => child.path === path).render
}

const createMatch = (artistID: string) => {
  return { params: { artistID }, location: { search: "" } }
}

const match = createMatch("example-artist")
const missingMatch = createMatch("nonexistent-artist")

describe("artistRoutes", () => {
  describe.each([
    [
      "about",
      findRender(appRoute, "about"),
      "/artist/example-artist#JUMP--artistAboutTop",
    ],
    [
      "auction-results",
      findRender(appRoute, "auction-results"),
      "/artist/example-artist#JUMP--marketSignalsTop",
    ],
    [":tab?", findRender(subAppRoute, ":tab?"), "/artist/example-artist"],
  ])("%s", (_path, render, location) => {
    it("renders a 404 when the artist does not exist", () => {
      const result = render({ match: missingMatch, error: { status: 404 } })

      expect(result.props.children[1].props.code).toBe(404)
    })

    it("waits for the query before redirecting", () => {
      expect(render({ match })).toBeUndefined()
    })

    it("redirects when the artist exists", () => {
      expect(() => render({ match, props: {} })).toThrow(
        expect.objectContaining({ location, status: 301 }),
      )
    })
  })
})
