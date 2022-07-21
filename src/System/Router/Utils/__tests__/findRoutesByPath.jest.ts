import { getAppRoutes } from "routes"
import { findRoutesByPath } from "../findRoutesByPath"

jest.mock("routes", () => ({ getAppRoutes: jest.fn() }))

describe("findRoutesByPath", () => {
  const mockgetAppRoutes = getAppRoutes as jest.Mock

  it("matches routes by path", () => {
    const routes = [
      {
        path: "artist/:slug",
      },
    ]

    mockgetAppRoutes.mockImplementation(() => {
      return routes
    })

    expect(findRoutesByPath({ path: "artist/andy-warhol" })).toEqual(routes)
  })
})
