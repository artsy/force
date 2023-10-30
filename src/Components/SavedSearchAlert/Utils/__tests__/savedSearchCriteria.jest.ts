import { OwnerType } from "@artsy/cohesion"
import { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterContext"
import { SavedSearchEntity } from "Components/SavedSearchAlert/types"
import {
  parseDefaultCriteria,
  getSearchCriteriaFromFilters,
  isDefaultValue,
} from "Components/SavedSearchAlert/Utils/savedSearchCriteria"

const mockedSavedSearchEntity: SavedSearchEntity = {
  defaultCriteria: {
    artistIDs: [
      {
        displayValue: "artistOneName",
        value: "artistOneId",
      },
      {
        displayValue: "artistTwoName",
        value: "artistTwoId",
      },
    ],
  },
  owner: {
    type: OwnerType.artist,
    id: "owner-id",
    slug: "owner-slug",
    name: "Owner Name",
  },
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

  it("returns correct criteria when a single artist is passed to defaultCriteria", () => {
    const entity: SavedSearchEntity = {
      defaultCriteria: {
        artistIDs: [
          {
            value: "artistOneId",
            displayValue: "artistOneName",
          },
        ],
      },
      owner: {
        type: OwnerType.artist,
        id: "owner-id",
        slug: "owner-slug",
        name: "Owner Name",
      },
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

describe("parseDefaultCriteria", () => {
  it("should return nothing", () => {
    const result = parseDefaultCriteria({})

    expect(result).toEqual({})
  })

  it("should support single criteria", () => {
    const result = parseDefaultCriteria({
      offerable: {
        displayValue: "Make Offer",
        value: true,
      },
    })

    expect(result).toEqual({
      offerable: true,
    })
  })

  it("should support multiple criteria", () => {
    const result = parseDefaultCriteria({
      attributionClass: [
        {
          value: "unique",
          displayValue: "Unique",
        },
        {
          value: "limited edition",
          displayValue: "Limited Edition",
        },
      ],
    })

    expect(result).toEqual({
      attributionClass: ["unique", "limited edition"],
    })
  })

  it("should support mixed criteria", () => {
    const result = parseDefaultCriteria({
      offerable: {
        displayValue: "Make Offer",
        value: true,
      },
      attributionClass: [
        {
          value: "unique",
          displayValue: "Unique",
        },
        {
          value: "limited edition",
          displayValue: "Limited Edition",
        },
      ],
    })

    expect(result).toEqual({
      offerable: true,
      attributionClass: ["unique", "limited edition"],
    })
  })
})
