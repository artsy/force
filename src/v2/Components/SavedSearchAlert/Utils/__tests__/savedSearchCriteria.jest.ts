import { OwnerType } from "@artsy/cohesion"
import { ArtworkFilters } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { SavedSearchEntity } from "../../types"
import {
  getSearchCriteriaFromFilters,
  isDefaultValue,
} from "../savedSearchCriteria"

const mockedSavedSearchEntity: SavedSearchEntity = {
  type: OwnerType.artist,
  placeholder: "alertName",
  artists: [
    {
      id: "artistOneId",
      name: "artistOneName",
      slug: "artistOneSlug",
    },
    {
      id: "artistTwoId",
      name: "artistTwoName",
      slug: "artistTwoSlug",
    },
  ],
}

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
  it("returns correct criteria", () => {
    const result = getSearchCriteriaFromFilters(
      mockedSavedSearchEntity,
      mockedFilters
    )

    expect(result).toEqual(
      expect.objectContaining({
        artistIDs: ["artistOneId", "artistTwoId"],
        attributionClass: ["limited edition", "unique", "open edition"],
        colors: ["black"],
        inquireableOnly: true,
        priceRange: "1000-5000",
      })
    )
  })

  it("returns correct criteria when a single artist is passed to entity", () => {
    const entity: SavedSearchEntity = {
      type: OwnerType.artist,
      placeholder: "",
      artists: [
        {
          id: "artistOneId",
          name: "artistOneName",
          slug: "artistOneSlug",
        },
      ],
    }
    const result = getSearchCriteriaFromFilters(entity, mockedFilters)

    expect(result).toEqual(
      expect.objectContaining({
        artistIDs: ["artistOneId"],
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

  it("should return true if value is false", () => {
    expect(isDefaultValue("acquireable", false)).toBeTruthy()
  })

  it("should return true if value is empty string", () => {
    expect(isDefaultValue("acquireable", "")).toBeTruthy()
  })

  it("should return true if it is default value", () => {
    expect(isDefaultValue("width", "*-*")).toBeTruthy()
  })
})
