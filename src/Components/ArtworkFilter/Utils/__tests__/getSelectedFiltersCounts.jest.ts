import {
  initialArtworkFilterState,
  getSelectedFiltersCounts,
  MultiSelectArtworkFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"

describe("getSelectedFiltersCounts helper", () => {
  const multiSelectFilters: MultiSelectArtworkFilters = {
    additionalGeneIDs: ["prints", "design", "installation", "drawing"],
    attributionClass: ["unique", "unknown-edition"],
    artistNationalities: ["british", "japanese"],
    artistSeriesIDs: ["kaws-toys", "kaws-companions"],
  }

  const multiSelectFiltersExpectedResult = {
    attributionClass: 2,
    additionalGeneIDs: 4,
    artistNationalities: 2,
    artistSeriesIDs: 2,
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
    const result = getSelectedFiltersCounts(
      initialArtworkFilterState,
      initialArtworkFilterState
    )
    expect(result).toEqual({})
  })

  it("counts multiselect filters correctly", () => {
    const result = getSelectedFiltersCounts(
      multiSelectFilters,
      initialArtworkFilterState
    )
    expect(result).toEqual(multiSelectFiltersExpectedResult)
  })

  it("counts single option filters correctly", () => {
    const result = getSelectedFiltersCounts(
      singleOptionFilters,
      initialArtworkFilterState
    )
    expect(result).toEqual(singleOptionFiltersExpectedResult)
  })

  it("counts ways to buy options correctly", () => {
    const result = getSelectedFiltersCounts(
      waysToBuyFilters,
      initialArtworkFilterState
    )
    expect(result).toEqual(waysToBuyFiltersExpectedResult)
  })

  it("counts artists options correctly", () => {
    const result = getSelectedFiltersCounts(
      artistsFilters,
      initialArtworkFilterState
    )
    expect(result).toEqual(artistsFiltersExpectedResult)
  })

  it("counts all filters correctly", () => {
    const filters = {
      ...multiSelectFilters,
      ...singleOptionFilters,
      ...waysToBuyFilters,
      ...artistsFilters,
    }
    const result = getSelectedFiltersCounts(filters, initialArtworkFilterState)
    expect(result).toEqual({
      ...multiSelectFiltersExpectedResult,
      ...singleOptionFiltersExpectedResult,
      ...waysToBuyFiltersExpectedResult,
      ...artistsFiltersExpectedResult,
    })
  })

  describe("sort option", () => {
    it("should be correctly counted when default sort value is passed", () => {
      const filters = {
        sort: "-decayed_merch",
      }
      const result = getSelectedFiltersCounts(
        filters,
        initialArtworkFilterState
      )

      expect(result).toEqual({})
    })

    it("should be correctly counted when custom sort value is passed", () => {
      const filters = {
        sort: "year",
      }
      const result = getSelectedFiltersCounts(
        filters,
        initialArtworkFilterState
      )

      expect(result).toEqual({
        sort: 1,
      })
    })

    it("should be correctly counted when custom default sort value is passed", () => {
      const filters = {
        sort: "year",
      }
      const result = getSelectedFiltersCounts(
        filters,
        initialArtworkFilterState
      )

      expect(result).toEqual({
        sort: 1,
      })
    })

    it("should be correctly counted when filters and custom default sort value are passed", () => {
      const defaultFilters = {
        sort: "year",
      }
      const result = getSelectedFiltersCounts(
        singleOptionFilters,
        defaultFilters
      )

      expect(result).toEqual({
        priceRange: 1,
      })
    })
  })
})
