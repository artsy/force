import {
  convertAttributes,
  getAttributesCount,
  getPillsByAttributes,
} from "../usePreviewPills"

describe("getAttributesCount", () => {
  it("should correctly count primitive values", () => {
    const result = getAttributesCount({
      acquireable: true,
      priceRange: "1000-5000",
      width: "10-15",
      height: "20-25",
    })

    expect(result).toBe(4)
  })

  it("should correctly count array values", () => {
    const result = getAttributesCount({
      sizes: ["SMALL", "MEDIUM", "LARGE"],
      artistIDs: ["artist-1", "artist-2"],
    })

    expect(result).toBe(5)
  })

  it("should correctly count array and priritive values", () => {
    const result = getAttributesCount({
      sizes: ["SMALL", "MEDIUM", "LARGE"],
      artistIDs: ["artist-1", "artist-2"],
      acquireable: true,
      priceRange: "1000-5000",
      width: "10-15",
      height: "20-25",
    })

    expect(result).toBe(9)
  })
})

describe("convertAttributes", () => {
  it("should correctly count primitive values", () => {
    const result = convertAttributes({
      acquireable: true,
      priceRange: "1000-5000",
      width: "10-15",
      height: "20-25",
    })

    expect(result).toEqual([
      { field: "acquireable", value: true },
      { field: "priceRange", value: "1000-5000" },
      { field: "width", value: "10-15" },
      { field: "height", value: "20-25" },
    ])
  })

  it("should correctly count array values", () => {
    const result = convertAttributes({
      sizes: ["SMALL", "MEDIUM", "LARGE"],
      artistIDs: ["artist-1", "artist-2"],
    })

    expect(result).toEqual([
      { field: "sizes", value: "SMALL" },
      { field: "sizes", value: "MEDIUM" },
      { field: "sizes", value: "LARGE" },
      { field: "artistIDs", value: "artist-1" },
      { field: "artistIDs", value: "artist-2" },
    ])
  })
})

describe("getPillsByAttributes", () => {
  it("should return filtered pills", () => {
    const pills = [
      {
        isDefault: true,
        field: "artistIDs",
        value: "artist-1",
        displayValue: "Banksy",
      },
      {
        isDefault: false,
        field: "attributionClass",
        value: "unique",
        displayValue: "Unique",
      },
      {
        isDefault: false,
        field: "attributionClass",
        value: "limited edition",
        displayValue: "Limited edition",
      },
      {
        isDefault: false,
        field: "priceRange",
        value: "1000-5000",
        displayValue: "$1,000–$5,000",
      },
      {
        isDefault: false,
        field: "width",
        value: "10-15",
        displayValue: "w: 25–38 cm",
      },
      {
        isDefault: false,
        field: "height",
        value: "20-25",
        displayValue: "h: 51–64 cm",
      },
    ]
    const attributes = {
      attributionClass: ["unique"],
      width: "10-15",
      artistIDs: ["artist-1"],
    }
    const result = getPillsByAttributes(pills, attributes)

    expect(result).toEqual([
      {
        isDefault: true,
        field: "artistIDs",
        value: "artist-1",
        displayValue: "Banksy",
      },
      {
        isDefault: false,
        field: "attributionClass",
        value: "unique",
        displayValue: "Unique",
      },
      {
        isDefault: false,
        field: "width",
        value: "10-15",
        displayValue: "w: 25–38 cm",
      },
    ])
  })
})
