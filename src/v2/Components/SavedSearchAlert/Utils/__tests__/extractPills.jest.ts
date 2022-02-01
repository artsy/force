import { extractSizeLabelForOldFormat, extractSizeLabel } from "../extractPills"

describe("extractSizeLabel", () => {
  it("returns only small size filter value", () => {
    expect(extractSizeLabel(["SMALL"])).toEqual([
      {
        filterName: "sizes",
        name: "SMALL",
        displayName: "Small (under 40cm)",
      },
    ])
  })

  it("returns only medium size filter value", () => {
    expect(extractSizeLabel(["MEDIUM"])).toEqual([
      {
        filterName: "sizes",
        name: "MEDIUM",
        displayName: "Medium (40 – 100cm)",
      },
    ])
  })

  it("returns only large size filter value", () => {
    expect(extractSizeLabel(["LARGE"])).toEqual([
      {
        filterName: "sizes",
        name: "LARGE",
        displayName: "Large (over 100cm)",
      },
    ])
  })

  it("returns small and large size filter values", () => {
    expect(extractSizeLabel(["SMALL", "LARGE"])).toEqual([
      {
        filterName: "sizes",
        name: "SMALL",
        displayName: "Small (under 40cm)",
      },
      {
        filterName: "sizes",
        name: "LARGE",
        displayName: "Large (over 100cm)",
      },
    ])
  })
})

describe("extractSizeLabelForOldFormat", () => {
  it("returns null value for an unknown value of the old size filter", () => {
    expect(extractSizeLabelForOldFormat("5.0-16.0")).toBeNull()
  })

  it("returns SMALL value for old size filter value", () => {
    expect(extractSizeLabelForOldFormat("*-16.0")).toEqual([
      {
        filterName: "sizes",
        name: "SMALL",
        displayName: "Small (under 40cm)",
      },
    ])
  })

  it("returns MEDIUM value for old size filter value", () => {
    expect(extractSizeLabelForOldFormat("16.0-40.0")).toEqual([
      {
        filterName: "sizes",
        name: "MEDIUM",
        displayName: "Medium (40 – 100cm)",
      },
    ])
  })

  it("returns LARGE value for old size filter value", () => {
    expect(extractSizeLabelForOldFormat("40.0-*")).toEqual([
      {
        filterName: "sizes",
        name: "LARGE",
        displayName: "Large (over 100cm)",
      },
    ])
  })
})
