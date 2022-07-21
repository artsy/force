import { convertLabelsToPills } from "../convertLabelsToPills"

describe("convertLabelsToPills", () => {
  it("should return correctly formatted pills", () => {
    const result = convertLabelsToPills([
      {
        field: "attributionClass",
        displayValue: "Unknown edition",
        value: "unknown edition",
      },
      {
        field: "additionalGeneIDs",
        displayValue: "Photography",
        value: "photography",
      },
    ])

    expect(result).toEqual([
      {
        isDefault: false,
        field: "attributionClass",
        value: "unknown edition",
        displayValue: "Unknown edition",
      },
      {
        isDefault: false,
        field: "additionalGeneIDs",
        value: "photography",
        displayValue: "Photography",
      },
    ])
  })

  it("should correctly formatted default pills", () => {
    const result = convertLabelsToPills([
      {
        field: "artistIDs",
        displayValue: "Banksy",
        value: "4dd1584de0091e000100207c", // pragma: allowlist secret
      },
      {
        field: "artistIDs",
        displayValue: "KAWS",
        value: "4e934002e340fa0001005336", // pragma: allowlist secret
      },
      {
        field: "sizes",
        displayValue: "Medium (40 – 100cm)",
        value: "MEDIUM",
      },
    ])

    expect(result).toEqual([
      {
        isDefault: true,
        field: "artistIDs",
        value: "4dd1584de0091e000100207c", // pragma: allowlist secret
        displayValue: "Banksy",
      },
      {
        isDefault: true,
        field: "artistIDs",
        value: "4e934002e340fa0001005336", // pragma: allowlist secret
        displayValue: "KAWS",
      },
      {
        isDefault: false,
        field: "sizes",
        value: "MEDIUM",
        displayValue: "Medium (40 – 100cm)",
      },
    ])
  })
})
