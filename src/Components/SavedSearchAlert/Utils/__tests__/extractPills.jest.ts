import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  SavedSearchDefaultCriteria,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import {
  extractPillsFromDefaultCriteria,
  excludeDefaultCriteria,
  extractPillFromAggregation,
} from "Components/SavedSearchAlert/Utils/extractPills"

describe("extractPillFromAggregation", () => {
  it("returns pills", () => {
    const result = extractPillFromAggregation(
      {
        paramName: "materialsTerms",
        paramValue: ["acrylic", "canvas"],
      },
      mockedAggregations
    )

    const pills = [
      { displayValue: "Acrylic", value: "acrylic", field: "materialsTerms" },
      { displayValue: "Canvas", value: "canvas", field: "materialsTerms" },
    ]

    expect(result).toEqual(pills)
  })

  it("returns empty array when couldn't get aggregation by param name", () => {
    const result = extractPillFromAggregation(
      {
        paramName: "materialsTerms",
        paramValue: ["acrylic", "canvas"],
      },
      []
    )

    expect(result).toEqual([])
  })

  it("returns pills extracted from hardcoded aggregation values for additionalGeneIDs", () => {
    const result = extractPillFromAggregation(
      {
        paramName: "additionalGeneIDs",
        paramValue: ["painting", "sculpture", "nft"],
      },
      []
    )

    expect(result).toEqual([
      {
        displayValue: "Painting",
        value: "painting",
        field: "additionalGeneIDs",
      },
      {
        displayValue: "Sculpture",
        value: "sculpture",
        field: "additionalGeneIDs",
      },
      { displayValue: "NFT", value: "nft", field: "additionalGeneIDs" },
    ])
  })
})

describe("extractPillsFromDefaultCriteria", () => {
  it("should return nothing", () => {
    const result = extractPillsFromDefaultCriteria({})

    expect(result).toEqual([])
  })

  it("should support single criteria", () => {
    const result = extractPillsFromDefaultCriteria({
      offerable: {
        displayValue: "Make Offer",
        value: true,
      },
    })

    expect(result).toEqual([
      {
        isDefault: true,
        displayValue: "Make Offer",
        value: "true",
        field: "offerable",
      },
    ])
  })

  it("should support multiple criteria", () => {
    const result = extractPillsFromDefaultCriteria({
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

    expect(result).toEqual([
      {
        isDefault: true,
        value: "unique",
        displayValue: "Unique",
        field: "attributionClass",
      },
      {
        isDefault: true,
        value: "limited edition",
        displayValue: "Limited Edition",
        field: "attributionClass",
      },
    ])
  })

  it("should support mixed criteria", () => {
    const result = extractPillsFromDefaultCriteria({
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

    expect(result).toEqual([
      {
        isDefault: true,
        displayValue: "Make Offer",
        value: "true",
        field: "offerable",
      },
      {
        isDefault: true,
        value: "unique",
        displayValue: "Unique",
        field: "attributionClass",
      },
      {
        isDefault: true,
        value: "limited edition",
        displayValue: "Limited Edition",
        field: "attributionClass",
      },
    ])
  })

  it("should support forSale", () => {
    const result = extractPillsFromDefaultCriteria({
      forSale: {
        displayValue: "For sale",
        value: true,
      },
    })

    expect(result).toEqual([
      {
        isDefault: true,
        displayValue: "For sale",
        value: "true",
        field: "forSale",
      },
    ])
  })
})

describe("excludeDefaultCriteria", () => {
  it("exclude single value", () => {
    const defaultCriteria: SavedSearchDefaultCriteria = {
      offerable: {
        displayValue: "Offerable",
        value: true,
      },
    }
    const result = excludeDefaultCriteria(criteria, defaultCriteria)

    expect(result).toEqual({
      artistIDs: ["artistOne", "artistTwo"],
      atAuction: true,
      sizes: ["SMALL"],
    })
  })

  it("exclude one value from criteria values", () => {
    const defaultCriteria: SavedSearchDefaultCriteria = {
      artistIDs: [
        {
          displayValue: "Artist One",
          value: "artistOne",
        },
      ],
    }
    const result = excludeDefaultCriteria(criteria, defaultCriteria)

    expect(result).toEqual({
      artistIDs: ["artistTwo"],
      offerable: true,
      atAuction: true,
      sizes: ["SMALL"],
    })
  })

  it("exclude all criteria values", () => {
    const defaultCriteria: SavedSearchDefaultCriteria = {
      artistIDs: [
        {
          displayValue: "Artist One",
          value: "artistOne",
        },
        {
          displayValue: "Artist Two",
          value: "artistTwo",
        },
      ],
    }
    const result = excludeDefaultCriteria(criteria, defaultCriteria)

    expect(result).toEqual({
      atAuction: true,
      offerable: true,
      sizes: ["SMALL"],
    })
  })

  it("exclude single and multiple values", () => {
    const defaultCriteria: SavedSearchDefaultCriteria = {
      artistIDs: [
        {
          displayValue: "Artist One",
          value: "artistOne",
        },
        {
          displayValue: "Artist Two",
          value: "artistTwo",
        },
      ],
      offerable: {
        displayValue: "Offerable",
        value: true,
      },
    }
    const result = excludeDefaultCriteria(criteria, defaultCriteria)

    expect(result).toEqual({
      atAuction: true,
      sizes: ["SMALL"],
    })
  })
})

const criteria: SearchCriteriaAttributes = {
  artistIDs: ["artistOne", "artistTwo"],
  atAuction: true,
  offerable: true,
  sizes: ["SMALL"],
}

const mockedAggregations: Aggregations = [
  {
    slice: "MATERIALS_TERMS",
    counts: [
      {
        count: 44,
        name: "Acrylic",
        value: "acrylic",
      },
      {
        count: 30,
        name: "Canvas",
        value: "canvas",
      },
      {
        count: 26,
        name: "Metal",
        value: "metal",
      },
    ],
  },
]
