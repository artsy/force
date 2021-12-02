import { initialArtworkFilterState } from "../../ArtworkFilterContext"
import { getSelectedFiltersCounts } from "../getSelectedFIltersCounts"

describe("getSelectedFiltersCounts helper", () => {
  const multiSelectFilters = {
    additionalGeneIDs: ["prints", "design", "installation", "drawing"],
    attributionClass: ["unique", "unknown-edition"],
    artistNationalities: ["british", "japanese"],
  }

  const multiSelectFiltersExpectedResult = {
    attributionClass: 2,
    additionalGeneIDs: 4,
    artistNationalities: 2,
  }

  const singleOptionFilters = {
    sort: "year",
    priceRange: "10000-50000",
  }

  const singleOptionFiltersExpectedResult = {
    sort: 1,
    priceRange: 1,
  }

  const waysToBuyFilters = {
    offerable: true,
    atAuction: true,
  }

  const waysToBuyFiltersExpectedResult = {
    waysToBuy: 2,
  }

  const artistsFilters = {
    artistIDs: [
      "alex-katz",
      "anne-siems",
      "cat-sirot",
      "ceravolo",
      "andy-warhol",
    ],
    includeArtworksByFollowedArtists: true,
  }

  const artistsFiltersExpectedResult = {
    artistIDs: 6,
  }

  it("returns empty object if it is initial filters", () => {
    const result = getSelectedFiltersCounts(initialArtworkFilterState)
    expect(result).toEqual({})
  })

  it("counts multiselect filters correctly", () => {
    const result = getSelectedFiltersCounts(multiSelectFilters)
    expect(result).toEqual(multiSelectFiltersExpectedResult)
  })

  it("counts single option filters correctly", () => {
    const result = getSelectedFiltersCounts(singleOptionFilters)
    expect(result).toEqual(singleOptionFiltersExpectedResult)
  })

  it("counts ways to buy options correctly", () => {
    const result = getSelectedFiltersCounts(waysToBuyFilters)
    expect(result).toEqual(waysToBuyFiltersExpectedResult)
  })

  it("counts artists options correctly", () => {
    const result = getSelectedFiltersCounts(artistsFilters)
    expect(result).toEqual(artistsFiltersExpectedResult)
  })

  it("counts all filters correctly", () => {
    const result = getSelectedFiltersCounts({
      ...multiSelectFilters,
      ...singleOptionFilters,
      ...waysToBuyFilters,
      ...artistsFilters,
    })
    expect(result).toEqual({
      ...multiSelectFiltersExpectedResult,
      ...singleOptionFiltersExpectedResult,
      ...waysToBuyFiltersExpectedResult,
      ...artistsFiltersExpectedResult,
    })
  })
})
