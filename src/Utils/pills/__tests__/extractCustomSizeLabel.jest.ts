import { extractCustomSizeLabel } from "../extractCustomSizeLabel"

describe("extractCustomSizeLabel", () => {
  it("returns correcly label when full range is specified", () => {
    const resultInInches = extractCustomSizeLabel({
      prefix: "w",
      value: "5-10",
      metric: "in",
    })
    const resultInCentimeters = extractCustomSizeLabel({
      prefix: "w",
      value: "5-10",
      metric: "cm",
    })

    expect(resultInInches).toBe("w: 5-10 in")
    expect(resultInCentimeters).toBe("w: 13-25 cm")
  })

  it("returns correcly label when only min value is specified", () => {
    const resultInInches = extractCustomSizeLabel({
      prefix: "w",
      value: "5-*",
      metric: "in",
    })
    const resultInCentimeters = extractCustomSizeLabel({
      prefix: "w",
      value: "5-*",
      metric: "cm",
    })

    expect(resultInInches).toBe("w: from 5 in")
    expect(resultInCentimeters).toBe("w: from 13 cm")
  })

  it("returns correcly label when only max value is specified", () => {
    const resultInInches = extractCustomSizeLabel({
      prefix: "w",
      value: "*-10",
      metric: "in",
    })
    const resultInCentimeters = extractCustomSizeLabel({
      prefix: "w",
      value: "*-10",
      metric: "cm",
    })

    expect(resultInInches).toBe("w: to 10 in")
    expect(resultInCentimeters).toBe("w: to 25 cm")
  })

  it("returns specified prefix", () => {
    const resultInInches = extractCustomSizeLabel({
      prefix: "h",
      value: "5-10",
      metric: "in",
    })
    const resultInCentimeters = extractCustomSizeLabel({
      prefix: "h",
      value: "5-10",
      metric: "cm",
    })

    expect(resultInInches).toBe("h: 5-10 in")
    expect(resultInCentimeters).toBe("h: 13-25 cm")
  })
})
