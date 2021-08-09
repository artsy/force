import {
  ArtworkFilters,
  initialArtworkFilterState,
} from "../../ArtworkFilterContext"
import { isDefaultFilter } from "../isDefaultFilter"

describe("isDefaultFilter", () => {
  it("returns true if filter is present in defaults", () => {
    Object.entries(initialArtworkFilterState).forEach(
      ([key, value]: [keyof ArtworkFilters, any]) => {
        expect(isDefaultFilter(key, value)).toEqual(true)
      }
    )
  })

  it("returns false if filter is not a default", () => {
    expect(isDefaultFilter("foo" as any, "bar")).toBe(false)
    expect(isDefaultFilter("baz" as any, "bam")).toBe(false)
  })

  it("returns true if custom default filter is passed, otherwise false", () => {
    expect(isDefaultFilter("sort", "anything")).toBe(false)
    expect(isDefaultFilter("sort", "anything", { sort: "anything" })).toBe(true)
    expect(isDefaultFilter("page", 5)).toBe(false)
    expect(isDefaultFilter("page", 5, { page: 5 })).toBe(true)
  })

  it("ignores passing custom default filter for array filters", () => {
    expect(
      isDefaultFilter("artistIDs", ["id-1", "id-2"], {
        artistIDs: ["id-1", "id-2"],
      })
    ).toBe(false)

    expect(
      isDefaultFilter("artistIDs", [], {
        artistIDs: ["id-1", "id-2"],
      })
    ).toBe(true)
  })
})
