import { prepareVariables, searchRoutes } from "Apps/Search/searchRoutes"

describe("searchRoutes", () => {
  describe("the artworks tab", () => {
    const prepareArtworksVariables = searchRoutes
      .find(route => route.path === "/search")
      ?.children?.find(child => child.path === "")?.prepareVariables

    const getVariables = () => {
      const variables = prepareArtworksVariables?.({}, {
        location: { query: { term: "andy" } },
        context: {},
      } as any)

      return variables as {
        input: Record<string, unknown>
        sidebarInput: Record<string, unknown>
      }
    }

    it("requests typo tolerance for the artwork grid", () => {
      expect(getVariables().input).toMatchObject({
        keyword: "andy",
        keywordTypoTolerance: true,
      })
    })

    it("requests typo tolerance for the sidebar aggregations", () => {
      expect(getVariables().sidebarInput).toMatchObject({
        keyword: "andy",
        keywordTypoTolerance: true,
      })
    })
  })

  describe("prepareVariables", () => {
    it("passes the term through as the keyword", () => {
      const variables = prepareVariables(
        {},
        { location: { query: { term: "andy" } } },
      )

      expect(variables.keyword).toBe("andy")
    })

    it("coerces a numeric term to a string", () => {
      // The router's query-string parser turns `?term=1954` into the number
      // 1954, which would be rejected by the `String!` query variable.
      const variables = prepareVariables(
        {},
        { location: { query: { term: 1954 } } },
      )

      expect(variables.keyword).toBe("1954")
    })

    it("falls back to an empty string when the term is missing", () => {
      const variables = prepareVariables({}, { location: { query: {} } })

      expect(variables.keyword).toBe("")
    })
  })
})
