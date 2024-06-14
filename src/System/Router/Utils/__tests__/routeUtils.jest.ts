import {
  findCurrentRoute,
  findRoutesByPath,
  getRoutes,
} from "System/Router/Utils/routeUtils"
import { Match, Router } from "found"
import { getAppRoutes } from "routes"

jest.mock("routes", () => ({ getAppRoutes: jest.fn() }))

describe("routeUtils", () => {
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

    expect(getRoutes()).toEqual(
      expect.objectContaining({
        routes,
        routePaths: ["foo"],
      })
    )
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

    expect(getRoutes()).toEqual(
      expect.objectContaining({
        routes,
        routePaths: ["", "foo", "foo/bar", "foo/bar/baz", "foo/bar/baz/bam"],
      })
    )
  })

  it("returns a flat list of routes", () => {
    const routes = [
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
    ]
    mockgetAppRoutes.mockImplementation(() => {
      return routes
    })

    expect(getRoutes()).toEqual(
      expect.objectContaining({
        flatRoutes: [
          {
            path: "foo",
            children: [
              {
                children: [{ children: [{ path: "bam" }], path: "baz" }],
                path: "bar",
              },
            ],
          },
          {
            path: "foo/bar",
            children: [{ children: [{ path: "bam" }], path: "baz" }],
          },
          {
            path: "foo/bar/baz",
            children: [{ path: "bam" }],
          },
          { path: "foo/bar/baz/bam" },
        ],
      })
    )
  })

  describe("findCurrentRoute", () => {
    const getMatch = (config: Partial<Match>) => ({
      routes: [],
      router: ({} as unknown) as Router,
      context: {},
      routeIndices: [0],
      location: ({} as unknown) as Location,
      params: {},
      ...config,
    })

    it("should return a base nested route", () => {
      const match = getMatch({
        routeIndices: [0, 0],
        routes: [
          {
            path: "/artist/:artistID",
            children: [
              {
                path: "/",
              },
            ],
          },
        ],
      })
      expect(findCurrentRoute(match)).toHaveProperty("path", "/")
    })

    it("should return a non-zero nested route", () => {
      const match = getMatch({
        routeIndices: [0, 2],
        routes: [
          {
            path: "/artist/:artistID",
            children: [
              {
                path: "/",
              },
              {
                path: "/about",
              },
              {
                path: "/cv",
              },
            ],
          },
        ],
      })
      expect(findCurrentRoute(match)).toHaveProperty("path", "/cv")
    })

    it("should return a deeply nested route", () => {
      const match = getMatch({
        routeIndices: [0, 3, 0],
        routes: [
          {
            path: "/artist/:artistID",
            children: [
              {
                path: "/",
              },
              {
                path: "/about",
              },
              {
                path: "/cv",
              },
              {
                baz: "/foo",
                children: [
                  {
                    path: "/bar",
                    children: [
                      {
                        path: "/dont-match",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      })

      expect(findCurrentRoute(match)).toHaveProperty("path", "/bar")
    })

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
  })
})
