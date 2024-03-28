import { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterContext"
import { countChangedFilters } from "Components/ArtworkFilter/Utils/countChangedFilters"

const EMPTY_FILTER: ArtworkFilters = {
  majorPeriods: [],
  page: 1,
  sizes: [],
  sort: "-decayed_merch",
  artistIDs: [],
  artistSeriesIDs: [],
  attributionClass: [],
  partnerIDs: [],
  additionalGeneIDs: [],
  colors: [],
  locationCities: [],
  artistNationalities: [],
  materialsTerms: [],
}

describe("countChangedFilters", () => {
  it("counts initial render", () => {
    expect(countChangedFilters(EMPTY_FILTER, EMPTY_FILTER)).toBe(0)
  })

  it("counts changed medium filter", () => {
    expect(
      countChangedFilters(EMPTY_FILTER, {
        ...EMPTY_FILTER,
        additionalGeneIDs: ["painting"],
      })
    ).toBe(1)

    expect(
      countChangedFilters(EMPTY_FILTER, {
        ...EMPTY_FILTER,
        additionalGeneIDs: ["painting", "sculpture"],
      })
    ).toBe(1)
  })

  it("counts multiple array filters", () => {
    expect(
      countChangedFilters(EMPTY_FILTER, {
        ...EMPTY_FILTER,
        additionalGeneIDs: ["painting"],
        materialsTerms: ["paper", "canvas"],
      })
    ).toBe(2)
  })

  it("counts removal of filters", () => {
    expect(
      countChangedFilters(
        {
          ...EMPTY_FILTER,
          additionalGeneIDs: ["painting"],
          materialsTerms: ["paper", "canvas"],
        },
        EMPTY_FILTER
      )
    ).toBe(2)
  })

  it("counts simple key filters", () => {
    expect(
      countChangedFilters(EMPTY_FILTER, {
        ...EMPTY_FILTER,
        priceRange: "25000-50000",
      })
    ).toBe(1)
  })

  it("counts combinations of all", () => {
    expect(
      countChangedFilters(
        {
          ...EMPTY_FILTER,
          materialsTerms: ["paper", "canvas"],
        },
        {
          ...EMPTY_FILTER,
          additionalGeneIDs: ["painting"],
          priceRange: "25000-50000",
        }
      )
    ).toBe(3) // 1 removal, 2 additions
  })

  it("counts boolean filters", () => {
    expect(
      countChangedFilters(EMPTY_FILTER, { ...EMPTY_FILTER, acquireable: true })
    ).toBe(1)

    expect(
      countChangedFilters(EMPTY_FILTER, { ...EMPTY_FILTER, acquireable: false })
    ).toBe(0)

    expect(
      countChangedFilters(EMPTY_FILTER, { ...EMPTY_FILTER, forSale: true })
    ).toBe(1)

    expect(
      countChangedFilters(EMPTY_FILTER, { ...EMPTY_FILTER, forSale: false })
    ).toBe(0)

    expect(
      countChangedFilters(
        { ...EMPTY_FILTER, acquireable: false },
        { ...EMPTY_FILTER, acquireable: true }
      )
    ).toBe(1)

    expect(
      countChangedFilters(
        { ...EMPTY_FILTER, forSale: false },
        { ...EMPTY_FILTER, forSale: true }
      )
    ).toBe(1)
  })
})
