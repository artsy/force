import { ArtworkFilters } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { getSearchCriteriaFromFilters } from ".."

const mockedArtistId = "artist-id"

const mockedFilters: ArtworkFilters = {
  additionalGeneIDs: [],
  attributionClass: ["limited edition", "unique", "open edition"],
  colors: ["black"],
  height: "*-*",
  inquireableOnly: true,
  locationCities: [],
  majorPeriods: [],
  materialsTerms: [],
  partnerIDs: [],
  priceRange: "1000-5000",
  width: "*-*",
}

describe("getSearchCriteriaFromFilters", () => {
  it("returns object only containing artist id and criteria that has been changed", () => {
    const result = getSearchCriteriaFromFilters(mockedArtistId, mockedFilters)

    expect(result).toEqual(
      expect.objectContaining({
        artistID: "artist-id",
        attributionClass: ["limited edition", "unique", "open edition"],
        colors: ["black"],
        inquireableOnly: true,
        priceRange: "1000-5000",
      })
    )
  })
})
