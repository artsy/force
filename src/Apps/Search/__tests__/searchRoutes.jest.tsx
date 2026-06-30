import { prepareVariables } from "Apps/Search/searchRoutes"

describe("searchRoutes", () => {
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
