import {
  SavedSearchDefaultCriteria,
  SearchCriteriaAttributes,
} from "../../types"
import {
  extractPillsFromDefaultCriteria,
  excludeDefaultCriteria,
} from "../extractPills"

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
