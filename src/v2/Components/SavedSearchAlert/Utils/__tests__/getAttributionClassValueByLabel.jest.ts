import { getAttributionClassValueByLabel } from "../getAttributionClassValueByLabel"

describe("getAttributionClassValueByLabel", () => {
  it("should return `unique`", () => {
    const result = getAttributionClassValueByLabel("Unique")
    expect(result).toEqual(["unique"])
  })

  it("should return `limited edition`", () => {
    const result = getAttributionClassValueByLabel("Limited Edition")
    expect(result).toEqual(["limited edition"])
  })

  it("should return `open edition`", () => {
    const result = getAttributionClassValueByLabel("Open Edition")
    expect(result).toEqual(["open edition"])
  })

  it("should return `unknown edition`", () => {
    const result = getAttributionClassValueByLabel("Unknown Edition")
    expect(result).toEqual(["unknown edition"])
  })

  describe("Different cases", () => {
    it("should return correct value when all letters are lowercase", () => {
      const result = getAttributionClassValueByLabel("unknown edition")
      expect(result).toEqual(["unknown edition"])
    })

    it("should return correct value when all letters are uppercase", () => {
      const result = getAttributionClassValueByLabel("UNKNOWN EDITION")
      expect(result).toEqual(["unknown edition"])
    })

    it("should return correct value when all letters are different case", () => {
      expect(getAttributionClassValueByLabel("Unknown Edition")).toEqual([
        "unknown edition",
      ])

      expect(getAttributionClassValueByLabel("UnKnOwN EdItIoN")).toEqual([
        "unknown edition",
      ])
    })
  })
})
