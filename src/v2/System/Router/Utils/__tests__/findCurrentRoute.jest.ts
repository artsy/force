import { findCurrentRoute } from "../findCurrentRoute"
import { Location, Match, Router } from "found"

describe("findCurrentRoute", () => {
  const getMatch = (config: Partial<Match>): Match => ({
    routes: [],
    router: {} as Router,
    context: {},
    routeIndices: [0],
    location: {} as Location,
    params: {},
    route: {},
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
              path: "/works-for-sale",
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
              path: "/works-for-sale",
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
})
