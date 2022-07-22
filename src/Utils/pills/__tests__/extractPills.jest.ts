import {
  extractAttributions,
  extractColors,
  extractCustomSize,
  extractFromAggregation,
  extractMajorPeriods,
  extractPriceRange,
  extractSizes,
  extractWaysToBuy,
} from "../extractPills"
import { Entity, OptionItem } from "../types"

describe("extractSizes", () => {
  it("should extract sizes in centimeters", () => {
    const result = extractSizes({
      field: "sizes",
      value: ["SMALL", "MEDIUM", "LARGE"],
      payload: {
        metric: "cm",
      },
    })

    expect(result).toEqual([
      {
        field: "sizes",
        value: "SMALL",
        displayValue: "Small (under 40cm)",
      },
      {
        field: "sizes",
        value: "MEDIUM",
        displayValue: "Medium (40 – 100cm)",
      },
      {
        field: "sizes",
        value: "LARGE",
        displayValue: "Large (over 100cm)",
      },
    ])
  })

  it("should extract sizes in inches", () => {
    const result = extractSizes({
      field: "sizes",
      value: ["SMALL", "MEDIUM", "LARGE"],
      payload: {
        metric: "in",
      },
    })

    expect(result).toEqual([
      {
        field: "sizes",
        value: "SMALL",
        displayValue: "Small (under 16in)",
      },
      {
        field: "sizes",
        value: "MEDIUM",
        displayValue: "Medium (16in – 40in)",
      },
      {
        field: "sizes",
        value: "LARGE",
        displayValue: "Large (over 40in)",
      },
    ])
  })

  it("should return null for unknown sizes", () => {
    const result = extractSizes({
      field: "sizes",
      value: ["SMALL", "UNKNOWN-ONE", "UNKNOWN-TWO"],
      payload: {
        metric: "cm",
      },
    })

    expect(result).toEqual([
      {
        field: "sizes",
        value: "SMALL",
        displayValue: "Small (under 40cm)",
      },
      null,
      null,
    ])
  })
})

describe("extractColors", () => {
  it("should extract colors", () => {
    const result = extractColors({
      field: "colors",
      value: ["red", "purple", "brown"],
    })

    expect(result).toEqual([
      {
        field: "colors",
        value: "red",
        displayValue: "Red",
      },
      {
        field: "colors",
        value: "purple",
        displayValue: "Purple",
      },
      {
        field: "colors",
        value: "brown",
        displayValue: "Brown",
      },
    ])
  })

  it("should return null for unknown colors", () => {
    const result = extractColors({
      field: "colors",
      value: ["red", "unknown-color-one", "unknown-color-two"],
    })

    expect(result).toEqual([
      {
        field: "colors",
        value: "red",
        displayValue: "Red",
      },
      null,
      null,
    ])
  })
})

describe("extractAttributions", () => {
  it("should extract attributions", () => {
    const result = extractAttributions({
      field: "attributionClass",
      value: ["unique", "limited edition", "open edition", "unknown edition"],
    })

    expect(result).toEqual([
      {
        field: "attributionClass",
        value: "unique",
        displayValue: "Unique",
      },
      {
        field: "attributionClass",
        value: "limited edition",
        displayValue: "Limited Edition",
      },
      {
        field: "attributionClass",
        value: "open edition",
        displayValue: "Open Edition",
      },
      {
        field: "attributionClass",
        value: "unknown edition",
        displayValue: "Unknown Edition",
      },
    ])
  })

  it("should return null for unknown colors", () => {
    const result = extractAttributions({
      field: "attributionClass",
      value: ["unique", "unknown-one", "unknown-two"],
    })

    expect(result).toEqual([
      {
        field: "attributionClass",
        value: "unique",
        displayValue: "Unique",
      },
      null,
      null,
    ])
  })
})

describe("extractWaysToBuy", () => {
  it("should extract `Buy Now`", () => {
    const result = extractWaysToBuy({
      field: "acquireable",
      value: true,
    })

    expect(result).toEqual({
      field: "acquireable",
      value: "acquireable",
      displayValue: "Buy Now",
    })
  })

  it("should extract `Make Offer`", () => {
    const result = extractWaysToBuy({
      field: "offerable",
      value: true,
    })

    expect(result).toEqual({
      field: "offerable",
      value: "offerable",
      displayValue: "Make Offer",
    })
  })

  it("should extract `Bid`", () => {
    const result = extractWaysToBuy({
      field: "atAuction",
      value: true,
    })

    expect(result).toEqual({
      field: "atAuction",
      value: "atAuction",
      displayValue: "Bid",
    })
  })

  it("should extract `Inquire`", () => {
    const result = extractWaysToBuy({
      field: "inquireableOnly",
      value: true,
    })

    expect(result).toEqual({
      field: "inquireableOnly",
      value: "inquireableOnly",
      displayValue: "Inquire",
    })
  })

  it("should return null for unknown", () => {
    const result = extractWaysToBuy({
      field: "unknown",
      value: "unknown",
    })

    expect(result).toBeNull()
  })
})

describe("extractMajorPeriods", () => {
  it("should extract major periods", () => {
    const result = extractMajorPeriods({
      field: "majorPeriods",
      value: ["2010", "2000", "18th Century & Earlier"],
    })

    expect(result).toEqual([
      {
        field: "majorPeriods",
        value: "2010",
        displayValue: "2010s",
      },
      {
        field: "majorPeriods",
        value: "2000",
        displayValue: "2000s",
      },
      {
        field: "majorPeriods",
        value: "18th Century & Earlier",
        displayValue: "18th Century & Earlier",
      },
    ])
  })
})

describe("extractPriceRange", () => {
  it("should extract price when only the min value is specified", () => {
    const result = extractPriceRange({
      field: "priceRange",
      value: "1000-*",
    })

    expect(result).toEqual({
      field: "priceRange",
      value: "1000-*",
      displayValue: "$1,000+",
    })
  })

  it("should extract price when only the max value is specified", () => {
    const result = extractPriceRange({
      field: "priceRange",
      value: "*-1000",
    })

    expect(result).toEqual({
      field: "priceRange",
      value: "*-1000",
      displayValue: "$0-$1,000",
    })
  })

  it("should extract price", () => {
    const result = extractPriceRange({
      field: "priceRange",
      value: "500-1000",
    })

    expect(result).toEqual({
      field: "priceRange",
      value: "500-1000",
      displayValue: "$500-$1,000",
    })
  })
})

describe("extractCustomSize", () => {
  describe("width", () => {
    it("should extract in centimeters", () => {
      const result = extractCustomSize({
        field: "width",
        value: "5-10",
        payload: {
          metric: "cm",
        },
      })

      expect(result).toEqual({
        field: "width",
        value: "5-10",
        displayValue: "w: 13-25 cm",
      })
    })

    it("should extract in inches", () => {
      const result = extractCustomSize({
        field: "width",
        value: "5-10",
        payload: {
          metric: "in",
        },
      })

      expect(result).toEqual({
        field: "width",
        value: "5-10",
        displayValue: "w: 5-10 in",
      })
    })

    it("should return null for default value", () => {
      const result = extractCustomSize({
        field: "width",
        value: "*-*",
        payload: {
          metric: "cm",
        },
      })

      expect(result).toBeNull()
    })
  })

  describe("height", () => {
    it("should extract in centimeters", () => {
      const result = extractCustomSize({
        field: "height",
        value: "5-10",
        payload: {
          metric: "cm",
        },
      })

      expect(result).toEqual({
        field: "height",
        value: "5-10",
        displayValue: "h: 13-25 cm",
      })
    })

    it("should extract in inches", () => {
      const result = extractCustomSize({
        field: "height",
        value: "5-10",
        payload: {
          metric: "in",
        },
      })

      expect(result).toEqual({
        field: "height",
        value: "5-10",
        displayValue: "h: 5-10 in",
      })
    })

    it("should return null for default value", () => {
      const result = extractCustomSize({
        field: "height",
        value: "*-*",
        payload: {
          metric: "cm",
        },
      })

      expect(result).toBeNull()
    })
  })
})

describe("extractFromAggregation", () => {
  it("should extract from aggregation", () => {
    const entity: Entity = {
      field: "materialsTerms",
      value: ["acrylic", "canvas"],
      payload: {
        aggregation: mockedAggregation,
      },
    }
    const result = extractFromAggregation(entity)

    expect(result).toEqual([
      {
        value: "acrylic",
        displayValue: "Acrylic",
        field: "materialsTerms",
      },
      {
        value: "canvas",
        displayValue: "Canvas",
        field: "materialsTerms",
      },
    ])
  })

  it("should return null for values that cannot be extracted from aggregation", () => {
    const entity: Entity = {
      field: "materialsTerms",
      value: ["acrylic", "canvas", "unknown"],
      payload: {
        aggregation: mockedAggregation,
      },
    }
    const result = extractFromAggregation(entity)

    expect(result).toEqual([
      {
        value: "acrylic",
        displayValue: "Acrylic",
        field: "materialsTerms",
      },
      {
        value: "canvas",
        displayValue: "Canvas",
        field: "materialsTerms",
      },
      null,
    ])
  })

  it("should extract value from options if it was not possible to extract from aggregation", () => {
    const options: OptionItem[] = [
      {
        value: "nft",
        displayName: "NFT",
      },
    ]
    const entity: Entity = {
      field: "materialsTerms",
      value: ["acrylic", "canvas", "nft"],
      payload: {
        aggregation: mockedAggregation,
        options,
      },
    }
    const result = extractFromAggregation(entity)

    expect(result).toEqual([
      {
        value: "acrylic",
        displayValue: "Acrylic",
        field: "materialsTerms",
      },
      {
        value: "canvas",
        displayValue: "Canvas",
        field: "materialsTerms",
      },
      {
        value: "nft",
        displayValue: "NFT",
        field: "materialsTerms",
      },
    ])
  })
})

// TODO: Use aggregations TS type
const mockedAggregation = {
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
}
