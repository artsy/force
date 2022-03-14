import { getAttributionClassIdByLabel } from "../CreateArtworkAlertSection"

describe("getAttributionClassIdByLabel", () => {
  it("should return `unique`", () => {
    const result = getAttributionClassIdByLabel("Unique")
    expect(result).toEqual(["unique"])
  })

  it("should return `limited edition`", () => {
    const result = getAttributionClassIdByLabel("Limited Edition")
    expect(result).toEqual(["limited edition"])
  })

  it("should return `open edition`", () => {
    const result = getAttributionClassIdByLabel("Open Edition")
    expect(result).toEqual(["open edition"])
  })

  it("should return `unknown edition`", () => {
    const result = getAttributionClassIdByLabel("Unknown Edition")
    expect(result).toEqual(["unknown edition"])
  })

  describe("Different cases", () => {
    it("should return correct value when all letters are lowercase", () => {
      const result = getAttributionClassIdByLabel("unknown edition")
      expect(result).toEqual(["unknown edition"])
    })

    it("should return correct value when all letters are uppercase", () => {
      const result = getAttributionClassIdByLabel("UNKNOWN EDITION")
      expect(result).toEqual(["unknown edition"])
    })

    it("should return correct value when all letters are different case", () => {
      expect(getAttributionClassIdByLabel("Unknown Edition")).toEqual([
        "unknown edition",
      ])

      expect(getAttributionClassIdByLabel("UnKnOwN EdItIoN")).toEqual([
        "unknown edition",
      ])
    })
  })
})
