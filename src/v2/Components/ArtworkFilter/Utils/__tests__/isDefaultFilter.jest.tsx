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
})
