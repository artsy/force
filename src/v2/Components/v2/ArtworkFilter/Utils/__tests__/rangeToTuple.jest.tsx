import {
  ArtworkFilters,
  initialArtworkFilterState,
} from "../../ArtworkFilterContext"
import { rangeToTuple } from "../rangeToTuple"

describe("rangeToTuple", () => {
  const artworkFilterState: ArtworkFilters = {
    ...initialArtworkFilterState,
    priceRange: "100-200",
    height: "300-400",
    width: "500-600",
  }

  it("returns a tuple for range values", () => {
    expect(rangeToTuple(artworkFilterState, "priceRange")).toEqual([100, 200])
    expect(rangeToTuple(artworkFilterState, "height")).toEqual([300, 400])
    expect(rangeToTuple(artworkFilterState, "width")).toEqual([500, 600])
  })

  it("returns a min and max price", () => {
    expect(
      rangeToTuple({ ...artworkFilterState, priceRange: "*-*" }, "priceRange")
    ).toEqual([50, 50000])
  })

  it("returns a min and max height", () => {
    expect(
      rangeToTuple({ ...artworkFilterState, height: "*-*" }, "height")
    ).toEqual([1, 120])
  })

  it("returns a min and max width", () => {
    expect(
      rangeToTuple({ ...artworkFilterState, width: "*-*" }, "width")
    ).toEqual([1, 120])
  })
})
