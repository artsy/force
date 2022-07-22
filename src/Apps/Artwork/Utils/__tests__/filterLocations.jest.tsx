import { filterLocations } from "../filterLocations"

describe("filterLocations", () => {
  it("returns null if no array of locations is given", () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const filtered = filterLocations(null)
    expect(filtered).toBeNull()
  })

  it("returns null if empty array of locations is given", () => {
    const filtered = filterLocations([])
    expect(filtered).toBeNull()
  })

  it("filters out duplicates and blanks", () => {
    const filtered = filterLocations([
      { city: "NYC" },
      { city: "Boston" },
      { city: "NYC" },
      { city: "" },
    ])
    expect(filtered).toEqual(["NYC", "Boston"])
  })
})
