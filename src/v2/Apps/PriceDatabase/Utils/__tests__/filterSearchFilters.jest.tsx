import { filterSearchFilters } from "../filterSearchFilters"

describe("filterSearchFilters", () => {
  it("filters correctly", () => {
    const filters = {
      organizations: ["Phillips"],
      sizes: ["SMALL"],
      categories: ["Paintings"],
    }

    const allowedFilters = ["organizations", "sizes", "somethingelse"]

    expect(filterSearchFilters(filters, allowedFilters)).toMatchInlineSnapshot(`
      Object {
        "organizations": Array [
          "Phillips",
        ],
        "sizes": Array [
          "SMALL",
        ],
      }
    `)
  })
})
