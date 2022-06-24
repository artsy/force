import { extractPillsFromDefaultCriteria } from "../extractPills"

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
