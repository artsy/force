import { convertLabelsToPills } from "../convertLabelsToPills"

describe("convertLabelsToPills", () => {
  it("should return correctly formatted pills", () => {
    const result = convertLabelsToPills([
      {
        field: "attributionClass",
        label: "Unknown edition",
        value: "unknown edition",
      },
      {
        field: "additionalGeneIDs",
        label: "Photography",
        value: "photography",
      },
    ])

    expect(result).toEqual([
      {
        filterName: "attributionClass",
        name: "unknown edition",
        displayName: "Unknown edition",
      },
      {
        filterName: "additionalGeneIDs",
        name: "photography",
        displayName: "Photography",
      },
    ])
  })

  it("should correctly formatted default pills", () => {
    const result = convertLabelsToPills([
      {
        field: "artistIDs",
        label: "Banksy",
        value: "4dd1584de0091e000100207c", // pragma: allowlist secret
      },
      {
        field: "artistIDs",
        label: "KAWS",
        value: "4e934002e340fa0001005336", // pragma: allowlist secret
      },
      {
        field: "sizes",
        label: "Medium (40 – 100cm)",
        value: "MEDIUM",
      },
    ])

    expect(result).toEqual([
      {
        isDefault: true,
        name: "4dd1584de0091e000100207c", // pragma: allowlist secret
        displayName: "Banksy",
      },
      {
        isDefault: true,
        name: "4e934002e340fa0001005336", // pragma: allowlist secret
        displayName: "KAWS",
      },
      {
        filterName: "sizes",
        name: "MEDIUM",
        displayName: "Medium (40 – 100cm)",
      },
    ])
  })
})
