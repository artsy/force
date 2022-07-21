import {
  ArtworkFilters,
  initialArtworkFilterState,
} from "../../ArtworkFilterContext"

import { urlFragmentFromState } from "../urlFragmentFromState"

describe("urlFragmentFromState", () => {
  it("returns a queryParam-safe representation of artworkFilterState", () => {
    const artworkFilterState: ArtworkFilters = {
      ...initialArtworkFilterState,
      priceRange: "100-200",
      height: "300-400",
      width: "500-600",
    }

    expect(urlFragmentFromState(artworkFilterState)).toEqual(
      "height=300-400&width=500-600&priceRange=100-200"
    )
  })
})
