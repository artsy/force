import { ArtworkFilters } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import {
  getSearchCriteriaFromFilters,
  isDefaultValue,
} from "../savedSearchCriteria"

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
  it("returns object only containing artist ids and criteria that has been changed", () => {
    const result = getSearchCriteriaFromFilters(mockedArtistId, mockedFilters)

    expect(result).toEqual(
      expect.objectContaining({
        artistIDs: ["artist-id"],
        attributionClass: ["limited edition", "unique", "open edition"],
        colors: ["black"],
        inquireableOnly: true,
        priceRange: "1000-5000",
      })
    )
  })
})

describe("isDefaultValue", () => {
  it("should return true if value is empty array", () => {
    expect(isDefaultValue("colors", [])).toBeTruthy()
  })

  it("should return true if value is null", () => {
    expect(isDefaultValue("acquireable", null)).toBeTruthy()
  })

  it("should return true if it is default value", () => {
    expect(isDefaultValue("width", "*-*")).toBeTruthy()
  })
})
