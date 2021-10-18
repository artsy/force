import { getAppRoutes } from "v2/routes"
import { getRouteConfig } from "../getRouteConfig"

jest.mock("v2/routes", () => ({ getAppRoutes: jest.fn() }))

describe("getRouteConfig", () => {
  const mockgetAppRoutes = getAppRoutes as jest.Mock

  it("filters * and / routes", () => {
    const routes = [
      {
        path: "foo",
        children: [
          {
            path: "",
          },
          {
            path: "/",
          },
          {
            path: "*",
          },
        ],
      },
    ]

    mockgetAppRoutes.mockImplementation(() => {
      return routes
    })

    expect(getRouteConfig()).toEqual({
      routes,
      routePaths: ["foo"],
    })
  })

  it("returns deeply nested routes", () => {
    const routes = [
      {
        path: "",
        children: [
          {
            path: "",
          },
          {
            path: "/",
          },
          {
            path: "*",
          },
          {
            path: "foo",
            children: [
              {
                path: "bar",
                children: [
                  {
                    path: "baz",
                    children: [
                      {
                        path: "bam",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]

    mockgetAppRoutes.mockImplementation(() => {
      return routes
    })

    expect(getRouteConfig()).toEqual({
      routes,
      routePaths: ["", "foo", "foo/bar", "foo/bar/baz", "foo/bar/baz/bam"],
    })
  })
})
