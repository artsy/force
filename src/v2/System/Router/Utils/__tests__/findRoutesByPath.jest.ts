import { getAppRoutes } from "v2/routes"
import { findRoutesByPath } from "../findRoutesByPath"

jest.mock("v2/routes", () => ({ getAppRoutes: jest.fn() }))

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
