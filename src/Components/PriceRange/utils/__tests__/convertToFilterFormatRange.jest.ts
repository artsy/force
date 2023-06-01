import { convertToFilterFormatRange } from "Components/PriceRange/Utils/convertToFilterFormatRange"

describe("convertToFilterFormatRange", () => {
  it("should return passed values", () => {
    expect(convertToFilterFormatRange([10, 20])).toEqual([10, 20])
    expect(convertToFilterFormatRange([1000, 2000])).toEqual([1000, 2000])
    expect(convertToFilterFormatRange([35000, 60000])).toEqual([35000, 60000])
  })

  it("should return default range value for min if min slider value is passed", () => {
    expect(convertToFilterFormatRange([0, 20])).toEqual(["*", 20])
  })

  it("should return default range value for max if max slider value is passed", () => {
    expect(convertToFilterFormatRange([10, 50000])).toEqual([10, "*"])
  })

  it("should return default range value if min and max slider values are passed", () => {
    expect(convertToFilterFormatRange([0, 50000])).toEqual(["*", "*"])
  })
})
