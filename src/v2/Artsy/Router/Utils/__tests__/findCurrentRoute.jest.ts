import { findCurrentRoute } from "../findCurrentRoute"
import { Location, Match, Router } from "found"

describe("findCurrentRoute", () => {
  const getMatch = (config: Partial<Match>): Match => ({
    context: {},
    location: ({} as unknown) as Location,
    params: {},
    routeIndices: [0],
    router: ({} as unknown) as Router,
    routes: [],
    ...config,
  })

  it("should return a base nested route", () => {
    const match = getMatch({
      routeIndices: [0, 0],
      routes: [
        {
          children: [
            {
              path: "/",
            },
          ],
          path: "/artist/:artistID",
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
          path: "/artist/:artistID",
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
                  children: [
                    {
                      path: "/dont-match",
                    },
                  ],
                  path: "/bar",
                },
              ],
            },
          ],
          path: "/artist/:artistID",
        },
      ],
    })
    expect(findCurrentRoute(match)).toHaveProperty("path", "/bar")
  })
})
